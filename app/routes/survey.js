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
        "title": "International Situations Project",
        "description":"Welcome! We are interested in the situations people experience and what they do in them." +
                      "You will describe a situation you experienced recently and what you did in that situation." +
                      "You will also be asked some questions about your attitudes and values. Based on these " +
                      "responses, when you have completed the study, you will receive individualized " +
                      "information about your personality that we hope you will find interesting.",
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
                "noneLabel": "Please select"
            },
            "gender": {
                "noneLabel": "Please select",
                "sort": function() {
                    return false;
                }
            },
            "socioeconomicStatus": {
                "type": "radio",
                "vertical": false,
                "removeDefaultNone": true
            },
            "residence": {
                "noneLabel": "Please select",
                "optionLabels": ['Remote Rural', 'Rural', 'Suburban', 'Urban']
            },
            "isReligious": {
                "removeDefaultNone": true,
                "vertical": false,
                "optionLabels": ['Yes', 'No'],
                "sort": function() {
                    return false;
                }
            },
            "howReligious": {
                "type": "radio",
                "vertical": false,
                "removeDefaultNone": true
            }
        }
    }
};

const formActions = {
  submit: function() {
    var data = this.getValue();
    //TODO: POST data
  }
};

export default Ember.Route.extend({
  model() {
      return {formObject, formActions};
  }
});
