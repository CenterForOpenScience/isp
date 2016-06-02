import Ember from 'ember';

const formObject = Ember.Object.create({
    schema: {
        type: 'object',
        properties: {
            activity: {
                type: 'string',
                title: 'What were you doing yesterday at 10am/7pm?',
                maxLength: 75
            },
            location: {
                type: 'string',
                title: 'Where were you?',
                maxLength: 75
            },
            peoplePresent: {
                type: 'string',
                title: 'Who else was present? (If you were alone, please write "alone").',
                maxLength: 75
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
            activity: {
                type: 'textarea',
                constrainMaxLength: true,
                showMaxLengthIndicator: true,
                validator: 'required-field'
            },
            location: {
                type: 'textarea',
                constrainMaxLength: true,
                showMaxLengthIndicator: true,
                validator: 'required-field'
            },
            peoplePresent: {
                type: 'textarea',
                constrainMaxLength: true,
                showMaxLengthIndicator: true,
                validator: 'required-field'
            }
        },
        focus: false
    }
});

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
