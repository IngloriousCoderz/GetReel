Template.application.helpers({
  buttonClasses: 'btn btn-default',
  backButton: function() {
    return TAPi18n.__('back-button');
  },
  nextButton: function() {
    return TAPi18n.__('next-button');
  },
  confirmButton: function() {
    return TAPi18n.__('confirm-button');
  },
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
        title: function() {
          return TAPi18n.__('Studies');
        },
        schema: StudiesSchema,
        template: 'studiesStep',
        form: 'studies-form',
      },
      {
        id: 'work',
        title: function() {
          return TAPi18n.__('Work');
        },
        schema: WorkSchema,
        template: 'workStep',
        form: 'work-form',
      },
      {
        id: 'other-info',
        title: function() {
          return TAPi18n.__('Other Info');
        },
        schema: OtherInfoSchema,
        template: 'otherInfoStep',
        form: 'other-info-form',
      },
      {
        id: 'self-assessment',
        title: function() {
          return TAPi18n.__('Self Assessment');
        },
        schema: SelfAssessmentSchema,
        template: 'selfAssessmentStep',
        form: 'self-assessment-form',
      },
      {
        id: 'privacy',
        title: function() {
          return TAPi18n.__('Privacy');
        },
        schema: PrivacySchema,
        template: 'privacyStep',
        form: 'privacy-form',
        onSubmit: function(data, wizard) {
          data.createdAt = new Date();
          data.reusme = Session.get('resume');
          data.videofile = Session.get('videofile');
        },
      },
    ];
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
