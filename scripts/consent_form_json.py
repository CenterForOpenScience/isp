""" Download all files with consent form content from google drive into csv format and combine into a single json file.

    """

import os
import csv
import json

from oauth2client import file, client, tools

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

def get_credentials():
    """Gets valid user credentials from storage.

    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.

    Returns:
        Credentials, the obtained credential.
    """
    credential_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'credentials')
    credential_path = os.path.join(credential_dir, 'credentials.json')
    store = file.Storage(credential_path)
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


def run(folderid,service):
    #get and download files
    data = service.files().list(q="'" + folderid + "'" + " in parents").execute()
    download_files(data['files'], service)

    # convert csv files to a single json file
    content = {}
    for filename in os.listdir(files_path):
        if filename.endswith('.csv'):
            site_id = os.path.splitext(filename)[0]
            filepath = 'consent_forms/' + filename
            if not os.path.isfile(filepath):
                continue

            content[site_id] = format_consent_form(filepath)
        else:
            continue
    with open('consent.json', 'w') as f:
        json.dump(content, f, indent=4, sort_keys=True, ensure_ascii=False)


def download_files(files, service):
    for f in files:
        file_id = f['id']
        request = service.files().export_media(fileId=file_id, mimeType='text/csv').execute()
        fn = '%s.csv' % ('consent_forms/' + f['name'].replace(' ', '_'))
        if request:
            with open(fn, 'wb') as csvfile:
                csvfile.write(request)


def format_consent_form(filename):
    site_info = {
        'paragraphs': []
    }
    with open(filename, 'r') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            key = row[0]
            value = row[1].strip(" ")
            if 'paragraph' not in key:
                site_info[key] = value
            elif not value == "ADD OR REMOVE ROWS AS NEEDED":
                site_info['paragraphs'].append(row[1].strip(" "))
    return site_info

