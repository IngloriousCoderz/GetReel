
Template.application.helpers({
  buttonClasses: 'btn btn-default',

  backButton: function() {
    return TAPi18n.__('wizard-back-button');
  },

  nextButton: function() {
    return TAPi18n.__('wizard-next-button');
  },

  confirmButton: function() {
    return TAPi18n.__('wizard-submit-button');
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
      },
      {
        id: 'studies',
        title: function() {
          return TAPi18n.__('Studies');
        },
        schema: StudiesSchema,
        template: 'studiesStep',
      },
      {
        id: 'work',
        title: function() {
          return TAPi18n.__('Work');
        },
        schema: WorkSchema,
        template: 'workStep',
      },
      {
        id: 'other-info',
        title: function() {
          return TAPi18n.__('Other Info');
        },
        schema: OtherInfoSchema,
        template: 'otherInfoStep',
      },
      {
        id: 'self-assessment',
        title: function() {
          return TAPi18n.__('Self Assessment');
        },
        schema: SelfAssessmentSchema,
        template: 'selfAssessmentStep',
      },
      {
        id: 'privacy',
        title: function() {
          return TAPi18n.__('Privacy');
        },
        schema: PrivacySchema,
        template: 'privacyStep',
        onSubmit: function(data, wizard) {
          data.createdAt = new Date();
          data.resume = Session.get('resume');
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

Wizard.useRouter('iron:router');

Router.route('/application/:step?', {
  name: 'application',
  onBeforeAction: function() {
    if (!this.params.step) {
      this.redirect('application', {
        step: 'general-info',
      });
    } else {
      this.next();
    }
  },
});
