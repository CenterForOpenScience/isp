""" Download all csv files with consent form content from google drive and combine into a single json file.
    Requires a client_secret.json file with developer application credentials from google drive.
    Modifies: https://developers.google.com/drive/v3/web/quickstart/python """

from __future__ import print_function
import httplib2
import os
import csv
import json

from apiclient import discovery
import oauth2client
from oauth2client import client
from oauth2client import tools

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

# If modifying these scopes, delete your previously saved credentials
# at isp/scripts/credentials/credentials.json
SCOPES = 'https://www.googleapis.com/auth/drive'
CLIENT_SECRET_FILE = 'credentials/client_secret.json'
APPLICATION_NAME = 'International Situations Project'

# Downloaded csv files with each site's consent form
files_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'consent_forms')
FILES = os.listdir(files_path)
FOLDER_ID = "0Bxbak_ZCyxJ5Wl85ZFNERjlWMU0"


def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    credential_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'credentials')
    credential_path = os.path.join(credential_dir, 'credentials.json')
    store = oauth2client.file.Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else:  # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials


def main():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('drive', 'v3', http=http)

    # get and download files
    data = service.files().list(q="'" + FOLDER_ID + "'" + " in parents").execute()
    download_files(data['files'], service)

    # convert csv files to a single json file
    content = dict()
    for filename in FILES:
        site_id = filename.split('.')[0]
        content[site_id] = format_consent_form('consent_forms/' + filename)
    f = open('consent.json', 'w')
    f.write(json.dumps(content, indent=4, sort_keys=True))


def download_files(files, service):
    for f in files:
        file_id = f['id']
        request = service.files().export_media(fileId=file_id, mimeType='text/csv').execute()
        fn = '%s.csv' % os.path.splitext('consent_forms/' + files[0]['name'].replace(' ', '_'))[0]
        if request:
            with open(fn, 'wb') as csvfile:
                csvfile.write(request)


def format_consent_form(filename):
    site_info = {
      'paragraphs': {}
    }
    with open(filename, 'rb') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            key = row[0]
            value = row[1].strip(" ")
            if 'paragraph' not in key:
                site_info[key] = value
            elif not value == "ADD OR REMOVE ROWS AS NEEDED":
                site_info['paragraphs'][key] = row[1].strip(" ")
    return site_info


if __name__ == '__main__':
    main()

