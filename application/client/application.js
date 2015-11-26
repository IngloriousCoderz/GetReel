Wizard.useRouter('iron:router');

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
    return [{
      id: 'general-info',
      title: function() {
        return TAPi18n.__('General Info');
      },
      schema: GeneralInfoSchema,
      template: 'generalInfoStep',
    }, {
      id: 'studies',
      title: function() {
        return TAPi18n.__('Studies');
      },
      schema: StudiesSchema,
      template: 'studiesStep',
    }, {
      id: 'work',
      title: function() {
        return TAPi18n.__('Work');
      },
      schema: WorkSchema,
      template: 'workStep',
    }, {
      id: 'other-info',
      title: function() {
        return TAPi18n.__('Other Info');
      },
      schema: OtherInfoSchema,
      template: 'otherInfoStep',
    }, {
      id: 'self-assessment',
      title: function() {
        return TAPi18n.__('Self Assessment');
      },
      schema: SelfAssessmentSchema,
      template: 'selfAssessmentStep',
    }, {
      id: 'privacy',
      title: function() {
        return TAPi18n.__('Privacy');
      },
      schema: PrivacySchema,
      template: 'privacyStep',
      onSubmit: function(data, wizard) {
        data.resume = Session.get('resume');
        data.videofile = Session.get('videofile');
        data = _.extend(wizard.mergedData(), data);
        Meteor.call('submitApplication', data, function(error, result) {
          if (error) {
            console.log('error', error);
            return;
          }

          Router.current().redirect('application.success');
        });
      },
    }];
  },
});

Template.applicationSteps.helpers({
  stepClass: function(id) {
    var activeStep = this.wizard.activeStep();
    var step = this.wizard.getStep(id);
    if (activeStep && activeStep.id === id) {
      return 'active';
    }

    if (step.data()) {
      return 'completed';
    }

    return 'disabled';
  },
});
