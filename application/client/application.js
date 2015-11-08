Template.application.helpers({
  steps: function() {
    return [
      {
        id: 'general-info',
        title: function() {
          return TAPi18n.__('General Info');
        },
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
      },
      {
        id: 'other-info',
        title: 'Other Info',
        schema: OtherInfoSchema,
        template: 'otherInfoStep',
        form: 'other-info-form',
      },
      {
        id: 'self-assessment',
        title: 'Self-assessment',
        schema: SelfAssessmentSchema,
        template: 'self-assessmentStep',
        form: 'self-assessment-form',
      },
      {
        id: 'final-step',
        title: 'Final Step',
        onSubmit: function(data, wizard) {
          data.createdAt = new Date();
          data.reusme = Session.get('resume');
          data.videofile = Session.get('videofile');
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
    return TAPi18n.__('confirm-button');
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
