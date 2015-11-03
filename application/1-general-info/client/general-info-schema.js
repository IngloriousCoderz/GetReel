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
    autoform: {
      type: 'bootstrap-datepicker',
    },
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
    defaultValue: true,
    autoform: {
      type: 'boolean-checkbox',
    },
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
    defaultValue: true,
  },

  currentCity: {
    type: String,
  },
  currentProvince: {
    type: String,
    autoform: {
      options: {
        Winchestershire: 'Winchestershire',
        Coltshire: 'Coltshire',
        Berettashire: 'Berettashire',
      },
    },
  },
  currentZip: {
    type: String,
  },
  currentAddress: {
    type: String,
  },
  currentCivic: {
    type: String,
  },
  currentRegion: {
    type: String,
    autoform: {
      options: {
        NORTH: 'NORTH',
        WEST: 'WEST',
        SOUTH: 'SOUTH',
      },
    },
  },
  currentCountry: {
    type: String,
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
  },
  children: {
    type: Number,
    min: 0,
  },

  passport: {
    type: Boolean,
    optional: true,
    defaultValue: true,
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

  resume: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },
  showreel: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
  },
});

Meteor.startup(function() {
  GeneralInfoSchema.i18n('schemas.general-info');
});
