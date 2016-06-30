import Ember from 'ember';

var range = function(start, stop) {
    var options = [];
    for (var i=start; i <= stop; i++) {
        options.push(i);
    }
    return options;
};

const formObject = {
    schema: {
        type: 'object',
        properties: {
            age: {
                type: 'number',
                title: 'Age',
                enum: range(16, 100)
            },
            gender: {
                type: 'string',
                title: 'Gender',
                enum: ['Male', 'Female', 'Other', 'I\'d rather not state']
            },
            ethnicity: {
                type: 'string',
                title: 'What is your ethnicity?'
            },
            firstLanguage: {
                type: 'string',
                title: 'What was your first language?'
            },
            socioeconomicStatus: {
                type: 'number',
                title: 'On a scale from 1 to 10 with 10 being people that are the most well off in society, and 1 ' +
                         'being the people who are the least well off, where would you describe your family\'s position?',
                enum: range(1, 10)
            },
            birthLocation: {
                type: 'string',
                title: 'Birth Country and City'
            },
            residence: {
                type: 'string',
                title: 'Hometown residence',
                enum: ['remote rural', 'rural', 'suburban', 'urban']
            },
            isReligious: {
                type: 'string',
                title: 'Do you follow a religion?',
                sort: false,
                enum: ['yes', 'no']
            },
            religion: {
                type: 'string',
                title: 'If so, which one do you follow?'
            },
            howReligious: {
                type: 'number',
                title: 'On a scale from 1 to 10, how religious are you?',
                enum: range(1, 10)
            }
        }
    },
    options: {
        form: {
            buttons: {
                submit: {
                    title: 'Continue',
                    styles: 'btn btn-primary'
                }
            }
        },
        fields: {
            age: {
                noneLabel: 'Please select',
                validator: 'required-field',
                fieldClass: 'overview-form-control'
            },
            gender: {
                noneLabel: 'Please select',
                "sort": function() {
                    return false;
                },
                validator: 'required-field',
                fieldClass: 'overview-form-control'
            },
            ethnicity: {
              validator: 'required-field',
              fieldClass: 'overview-form-control'
            },
            firstLanguage: {
              validator: 'required-field',
              fieldClass: 'overview-form-control'
            },
            socioeconomicStatus: {
                type: 'radio',
                vertical: false,
                removeDefaultNone: true,
                validator: 'required-field'
            },
            birthLocation: {
                validator: 'required-field',
                fieldClass: 'overview-form-control'
            },
            residence: {
                noneLabel: 'Please select',
                optionLabels: ['Remote Rural', 'Rural', 'Suburban', 'Urban'],
                validator: 'required-field',
                fieldClass: 'overview-form-control'
            },
            isReligious: {
                removeDefaultNone: true,
                vertical: false,
                optionLabels: ['Yes', 'No'],
                "sort": function() {
                    return false;
                },
                validator: 'required-field'
            },
            religion: {
              fieldClass: 'overview-form-control'
            },
            howReligious: {
                type: 'radio',
                vertical: false,
                removeDefaultNone: true,
                validator: 'required-field'
            }
        },
        focus: false
    }
};

const formActions = Ember.computed(function() {
    var root = this;
    return {
        submit: function () {
            this.refreshValidationState(true);
            if (this.isValid()) {
              var formData = this.getValue();
              root.sendAction('update', formData, 'overview');
              root.sendAction('nextSection');
            }
        }
    };
});


export default Ember.Component.extend({
  formSchema: formObject,
  formActions: formActions
});
