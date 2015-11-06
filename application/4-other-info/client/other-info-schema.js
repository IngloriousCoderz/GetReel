OtherInfoSchema = new SimpleSchema({
  currentEmployment: {
    type: String,
  },
  availabilityFrom: {
    type: Date,
    autoform: {
      type: 'bootstrap-datepicker',
    },
  },
  availabilityDepartureAbroad: {
    type: Boolean,
  },
  hobbies: {
    type: String,
  },
  tattoos: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
  whereTattoo: {
    type: String,
    optional: true,
    custom: function() {
      if (this.field('tattoos').value && !this.isSet && (!this.operator || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  skiDownhill: {
    type: String,
    autoform: {
      options: {
        No: 'No',
        Basic: 'Sufficient',
        Independent: 'Good',
        Proficient: 'Excellent'
      },
    },
  },
  snowboard: {
    type: String,
    autoform: {
      options: {
        No: 'No',
        Basic: 'Sufficient',
        Independent: 'Good',
        Proficient: 'Excellent'
      },
    },
  },
  SLRcameras: {
    type: Boolean,
  },

  howDidRecruitment: {
    type: String,
    autoform: {
      options: {
        No: 'Bacheche scolastiche',
        Basic: 'Facebook',
        Independent: 'Fiere',
        Proficient: 'Passaparola'
      },
    },
  },
  miscellaneous: {
    type: String,
  },

});

Meteor.startup(function() {
  OtherInfoSchema.i18n('schemas.other-info');
});
