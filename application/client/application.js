Meteor.subscribe('availableJobs');

Template.application.helpers({
  steps: function() {
    return [
      {
        id: 'general-info',
        title: 'General Info',
        template: 'generalInfoStep',
        form: 'general-info-form',
      }, {
        id: 'studies',
        title: 'Studies',
        template: 'studiesStep',
        form: 'studies-form',
        onSubmit: function(data, wizard) {
          console.log(data);
        },
      },
    ];
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
