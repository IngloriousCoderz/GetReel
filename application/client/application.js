Meteor.subscribe('availableJobs');

Template.application.helpers({
  steps: function() {
    return [
      {
        id: 'general-info',
        title: 'General Info',
        schema: GeneralInfoSchema,
        template: 'generalInfoStep',
        form: 'general-info-form',
      },
      {
        id: 'studies',
        title: 'Studies',
        schema: StudiesSchema,
        template: 'studiesStep',
        form: 'studies-form',
        onSubmit: function(data, wizard) {
          console.log('Consolato da Template.application.helpers ' + data);
        },
      },
    ];
  },

  nextButtonLabel: function() {
    return TAPi18n.__('next-button');
  },

  backButtonLabel: function() {
    return TAPi18n.__('back-button');
  },

  confirmButtonLabel: function() {
    TAPi18n.__('confirm-button');
  },

  availableJobs: function() {
    return Jobs.find();
  },
});

Template.applicationSteps.helpers({
  stepClass: function(id) {
    var activeStep = this.wizard.activeStep();
    var step  = this.wizard.getStep(id);
    if (activeStep && activeStep.id === id) {
      return 'active';
    }

    if (step.data()) {
      return 'completed';
    }

    return 'disabled';
  },
});
