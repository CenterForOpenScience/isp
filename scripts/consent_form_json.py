import csv
import json
import collections
import os.path

# Content for each site's consent form
files = os.listdir('/Users/Saman/Devel/isp/scripts/consent_forms/')


def main():
    data = dict()
    for filename in files:
        site_id = filename.split('.')[0]
        data[site_id] = format_consent_form('consent_forms/' + filename)
    f = open('consent.json', 'w')
    f.write(json.dumps(data, indent=4, sort_keys=True))


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
