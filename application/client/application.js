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
      },
      {
        id: 'work',
        title: 'Work',
        schema: WorkSchema,
        template: 'workStep',
        form: 'work-form',
        // onSubmit: function(data, wizard) {
        //   console.log('subit ok');
      },
      {
        id: 'other-info',
        title: 'Other Info',
        schema: OtherInfoSchema,
        template: 'otherInfoStep',
        form: 'other-info-form',
        // onSubmit: function(data, wizard) {
        //   console.log('subit ok');
      },
      {
        id: 'final-step',
        title: 'Final Step',
        onSubmit: function(data, wizard) {
          data.createdAt = new Date();
          data.resume = Session.get('resume');
          data.videofile = Session.get('videofile');
          //alla fine del salvataggio ripulire il localStorage
          localStorage.clear();
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
