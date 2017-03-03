# Adding/updating translations
To update the translations for a given locale, use
[`scripts/add_translation.py`] (https://github.com/CenterForOpenScience/isp/blob/develop/scripts/add_translation.py)

1. Run the command `python add_translation.py`, this is the main script to be used. `add_translation.py` uses both [`scripts/format_translations.py`](https://github.com/CenterForOpenScience/isp/blob/develop/scripts/format_translations.py) and [`scripts/consent_form_json.py`](https://github.com/CenterForOpenScience/isp/blob/develop/scripts/consent_form_json.py).

2. `add_translation.py` will access the main google drive folder that has all the translations and list the names of directories that correspond to each language. The folder id is stored at `TRANSLATION_FOLDER_ID`.

3. Enter the desired language ID from the list shown.

2. `add_translation.py` will first download the CSV file needed for the translation from the google drive folder. Currently, each language has its own google drive folder. The ISP project main folder can be located [`here`](https://drive.google.com/drive/u/0/folders/0BxGwKGgJtw4WYVpJVllsMk84Wms). All language translation folders are stored under `/Samples/Translations/`.

    - The language translation should be in a 2-column format, where column 1 is the JSON key name, and column 2 is the translated text. This file will be located under scripts directory.
        ```
        Key,German Translation
        flag.chooseLanguage,Bitte wählen Sie eine Sprache
        ```
  
3. Once file is downloaded, `add_translation.py` will execute [`scripts/format_translations.py`] to generate `<language>.json`.

4. Review the error messages (if exist) from running the `add_translation`.

5. `add_translation.py` will download the consent form translation which can be one or more csv files. The file(s) will be located under [`scripts/consent_forms`] directory. Finally, `add_translation.py` will execute [`scripts/consent_form_json.py`]  that combine the contents of the files automatically into `consent.json`.


5. If a locale does not yet exist, run `ember generate locale <code>`, using either a two or four language country
code (like `en` or `en-US`) that corresponds to items from the [language picker](https://github.com/abought/isp/blob/a5159baae38756990e5f59c6be1b0bc9e64e25be/app/components/language-picker/countries.js#L636)

6. If the language is already in the List of locales that ember-i18n knows about by default: https://github.com/jamesarosen/ember-i18n/tree/master/addon/config, then don't make changes to the config.js file. You can  also safely delete this file. Use it if you need to override behavior for a locale or define behavior for a locale that Ember-I18n doesn't know about. An example of config.js file should like this:
    ```
    export default {
      rtl: false,
      pluralForm: function(count) {
        if (count === 1) { return 'one'; }
        return 'other';
      }
    };
    ```
7. Manually add the content of `<language>.json` to `locales/<language-country-code>/translation.js`. Remember that `translation.js` should start with `export default` followed by the new content then a `;`.

8. Manually add the content of `consent.json` to the existing [`app/components/isp-consent-form/consentText.js`](app/components/isp-consent-form/consentText.js). Remember to add a comment (e.g. `//finnish`) before the content, to differentiate it from other languages.

9. Verify that the locale displays appropriately, including any RTL settings required.
