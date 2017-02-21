
""" Download all files with consent form content from google drive into csv format and combine into a single json file.

    Requires access to google drive folder containing consent form spreadsheets (or credentials from a developer who
    has access).

    Steps:
    1. Obtain client_secret.json file:
       a. Go to https://console.developers.google.com/
       b. Create a project for ISP
       c. Under the credentials tab, click Create Credentials --> OAuth client ID, select "Other"
          as application type and click "Create"
       d. Find the newly created credentials under "OAuth 2.0 client IDs" and download as json
       e. Rename json file to "client_secret.json"
    2. In the scripts directory, create a 'credentials' folder and add the client_secret.json file
    3. Run the script.
    4. Move the content of the generated files as described in the Readme.md file.


    The first time you run this script, you may get a message saying that you need to authorize specific APIs for use
    with this project. The message will provide instructions needed to complete this process; wait several minutes
    and then try running again.

    Modifies: https://developers.google.com/drive/v3/web/quickstart/python """

import httplib2
import os
import consent_form_json
import format_translations
import sys

from apiclient import discovery
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


def main():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('drive', 'v3', http=http)

    while True:
        response = raw_input('Enter folder ID\n')
        # get and download files
        data = service.files().list(q="'" + response + "'" + " in parents").execute()
        download_files(data['files'], service)
        response = raw_input('Add new folder? (y/n)\n')
        if response == 'y':
            continue
        elif response == 'n':
            print 'Exit..'
            sys.exit()




def download_files(files, service):
    for f in files:
        file_id= f['id']
        file_type= f['mimeType']
        file_name= f['name']
        if file_type.endswith('.spreadsheet'):
            request = service.files().export_media(fileId=file_id, mimeType='text/csv').execute()
            fn = '%s.csv' % (f['name'].replace(' ', '_'))
            if request:
                with open(fn, 'wb') as csvfile:
                    csvfile.write(request)

            format_translations.run(file_name);

        if file_type.endswith('.folder'):
            consent_form_json.run(file_id, service);


if __name__ == '__main__':
    main()
