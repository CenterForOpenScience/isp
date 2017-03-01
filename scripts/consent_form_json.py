""" Convert a directory of downloaded consent form translations ( .csv format) into a single JSON file.

To run the script:

-      `python consent_form_json.py`



    """

import os
import csv
import json

# If modifying these scopes, delete your previously saved credentials
# at isp/scripts/credentials/credentials.json
SCOPES = 'https://www.googleapis.com/auth/drive'
CLIENT_SECRET_FILE = 'credentials/client_secret.json'
APPLICATION_NAME = 'International Situations Project'

# Downloaded csv files with each site's consent form
files_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'consent_forms')


def main():
    # convert csv files to a single json file
    content = {}
    for filename in os.listdir(files_path):
        if filename.endswith('.csv'):
            site_id = os.path.splitext(filename)[0]
            filepath = os.path.join('consent_forms', filename)
            if not os.path.isfile(filepath):
                continue

            content[site_id] = format_consent_form(filepath)
        else:
            continue
    with open('consent.json', 'w') as f:
        json.dump(content, f, indent=4, sort_keys=True, ensure_ascii=False)


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

if __name__ == '__main__':
    main()
