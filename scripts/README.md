# Usage

## Adding/ updating consent form text
To update consent form text, see [`scripts/consent_form_json.py`](https://github.com/CenterForOpenScience/isp/blob/develop/scripts/consent_form_json.py)

You may need to update the `FOLDER_ID` in the script to the particular Google Drive folder ID with consent 
forms for your desired language.

The script will generate a file `consent.json`; add the contents to the existing 
[app/components/isp-consent-form/consentText.js](app/components/isp-consent-form/consentText.js).


## Adding/updating translations
To update the translations for a given locale, see [`scripts/format_translations.py`](https://github.com/CenterForOpenScience/isp/blob/develop/scripts/format_translations.py)


1. Download the CSV file for the translation. It should be in a 2-column format, where column 1 is the JSON key name, and column 2 is the translated text

```
Key,German Translation
flag.chooseLanguage,Bitte wählen Sie eine Sprache
```

2. Run the format_translations script

3. If a locale does not yet exist, run `ember generate locale <code>`, using either a two or four language country 
code (like `en` or `en-US`) that corresponds to items from the [language picker](https://github.com/abought/isp/blob/a5159baae38756990e5f59c6be1b0bc9e64e25be/app/components/language-picker/countries.js#L636)

4. Review the error messages from the format_translations script in the console, appropriate. 
Paste the generated JSON into the appropriate `translations.js` file.
 
 5. Verify that the locale displays appropriately, including any RTL settings required.
