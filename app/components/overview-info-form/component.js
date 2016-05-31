import Ember from 'ember';

var range = function(start, stop) {
    var options = [];
    for (var i=start; i <= stop; i++) {
        options.push(i);
    }
    return options;
};

const formObject = {
    "schema": {
        "type": "object",
        "properties": {
            "age": {
                "type": "number",
                "title": "Age",
                "enum": range(16, 100)
            },
            "gender": {
                "type": "string",
                "title": "Gender",
                "enum": ['Male', 'Female', 'Other', 'I\'d rather not state']
            },
            "ethnicity": {
                "type": "string",
                "title": "What is your ethnicity?"
            },
            "firstLanguage": {
                "type": "string",
                "title": "What was your first language?"
            },
            "socioeconomicStatus": {
                "type": "number",
                "title": "On a scale from 1 to 10 with 10 being people that are the most well off in society, and 1 " +
                         "being the people who are the least well off, where would you describe your family's position?",
                "enum": range(1, 10)
            },
            "birthLocation": {
                "type": "string",
                "title": "Birth Country and City"
            },
            "residence": {
                "type": "string",
                "title": "Hometown residence",
                "enum": ['remote rural', 'rural', 'suburban', 'urban']
            },
            "isReligious": {
                "type": "string",
                "title": "Do you follow a religion?",
                "sort": false,
                "enum": ['yes', 'no']
            },
            "religion": {
                "type": "string",
                "title": "If so, which one do you follow?"
            },
            "howReligious": {
                "type": "number",
                "title": "On a scale from 1 to 10, how religious are you?",
                "enum": range(1, 10)
            }
        }
    },
    "options": {
        "form": {
            "buttons": {
                "submit": {
                    "title": "Continue",
                    "styles": "btn btn-primary"
                }
            }
        },
        "fields": {
            "age": {
                "noneLabel": "Please select",
                "validator": "required-field"
            },
            "gender": {
                "noneLabel": "Please select",
                "sort": function() {
                    return false;
                },
                "validator": "required-field"
            },
            "ethnicity": {
              "validator": "required-field"
            },
            "firstLanguage": {
              "validator": "required-field"
            },
            "socioeconomicStatus": {
                "type": "radio",
                "vertical": false,
                "removeDefaultNone": true,
                "validator": "required-field"
            },
            "birthLocation": {
                "validator": "required-field"
            },
            "residence": {
                "noneLabel": "Please select",
                "optionLabels": ['Remote Rural', 'Rural', 'Suburban', 'Urban'],
                "validator": "required-field"
            },
            "isReligious": {
                "removeDefaultNone": true,
                "vertical": false,
                "optionLabels": ['Yes', 'No'],
                "sort": function() {
                    return false;
                },
                "validator": "required-field"
            },
            "howReligious": {
                "type": "radio",
                "vertical": false,
                "removeDefaultNone": true,
                "validator": "required-field"
            }
        },
        "focus": false
    }
};

const formActions = {
  submit: function() {
    this.refreshValidationState(true);
    //TODO: POST data
  }
};


export default Ember.Component.extend({
  formSchema: formObject,
  formActions: formActions
});
