
GeneralInfoSchema = new SimpleSchema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  ssn: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    optional: true,
  },
  nationality: {
    type: String,
    autoform: {
      options: {
        USA: 'USA',
        UK: 'UK',
        Italy: 'Italy',
      },
    },
  },
  permit: {
    type: Boolean,
    optional: true,
  },
  permitKind: {
    type: String,
    optional: true,
    custom: function() {
      if (this.field('permit').value && !this.isSet && (!this.operator || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  city: {
    type: String,
  },
  province: {
    type: String,
    autoform: {
      options: {
        Winchestershire: 'Winchestershire',
        Coltshire: 'Coltshire',
        Berettashire: 'Berettashire',
      },
    },
  },
  zip: {
    type: String,
  },
  address: {
    type: String,
  },
  civic: {
    type: String,
  },
  region: {
    type: String,
    autoform: {
      options: {
        NORTH: 'NORTH',
        WEST: 'WEST',
        SOUTH: 'SOUTH',
      },
    },
  },
  country: {
    type: String,
  },
  sameAddress: {
    type: Boolean,
    optional: true,
  },
  currentCity: {
    type: String,
    optional: true,
    custom: function() {
      if (!(this.field('sameAddress').value) && !this.isSet && ((typeof (this.value) == 'undefined') || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  currentProvince: {
    type: String,
    optional: true,
    autoform: {
      options: {
        Winchestershire: 'Winchestershire',
        Coltshire: 'Coltshire',
        Berettashire: 'Berettashire',
      },
    },
    custom: function() {
      if (!(this.field('sameAddress').value) && !this.isSet && ((typeof (this.value) == 'undefined') || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  currentZip: {
    type: String,
    optional: true,
    custom: function() {
      if (!(this.field('sameAddress').value) && !this.isSet && ((typeof (this.value) == 'undefined') || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  currentAddress: {
    type: String,
    optional: true,
    custom: function() {
      if (!(this.field('sameAddress').value) && !this.isSet && ((typeof (this.value) == 'undefined') || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  currentCivic: {
    type: String,
    optional: true,
    custom: function() {
      if (!(this.field('sameAddress').value) && !this.isSet && ((typeof (this.value) == 'undefined') || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  currentRegion: {
    type: String,
    optional: true,
    autoform: {
      options: {
        NORTH: 'NORTH',
        WEST: 'WEST',
        SOUTH: 'SOUTH',
      },
    },
    custom: function() {
      if (!(this.field('sameAddress').value) && !this.isSet && ((typeof (this.value) == 'undefined') || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  currentCountry: {
    type: String,
    optional: true,
    custom: function() {
      if (!(this.field('sameAddress').value) && !this.isSet && ((typeof (this.value) == 'undefined') || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  phone: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  maritalStatus: {
    type: String,
    autoform: {
      options: {
        Single: 'Single',
        Married: 'Married',
        Divorced: 'Divorced',
      },
    },
  },
  children: {
    type: Number,
    min: 0,
  },
  passport: {
    type: Boolean,
    optional: true,
  },
  passportNumber: {
    type: String,
    optional: true,
    custom: function() {
      if (this.field('passport').value && !this.isSet && (!this.operator || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  passportValidFrom: {
    type: Date,
    optional: true,
    custom: function() {
      if (this.field('passport').value && !this.isSet && (!this.operator || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  passportValidTo: {
    type: Date,
    optional: true,
    custom: function() {
      if (this.field('passport').value && !this.isSet && (!this.operator || (this.value === null || this.value === ''))) {
        return 'required';
      };
    },
  },
  drivingLicense: {
    type: Boolean,
  },
  carOwner: {
    type: Boolean,
  },
  /*
  resume: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },
  showreel: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },*/
});

Meteor.startup(function() {
  GeneralInfoSchema.i18n('schemas.general-info');
});
