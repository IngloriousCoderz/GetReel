ApplicationSchema = new SimpleSchema({
  step: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },

  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  ssn: {
    type: String,
    label: 'Social Security Number',
  },
  dateOfBirth: {
    type: Date,
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
    label: 'Residency permit',
  },
  permitKind: {
    type: String,
    optional: true,
    custom: function() {
      if (this.field('permit').value) {
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
    label: 'Current address same as permanent',
  },

  currentCity: {
    type: String,
    label: 'City',
  },
  currentProvince: {
    type: String,
    label: 'Province',
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
    label: 'Zip',
  },
  currentAddress: {
    type: String,
    label: 'Address',
  },
  currentCivic: {
    type: String,
    label: 'Civic',
  },
  currentRegion: {
    type: String,
    label: 'Region',
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
    label: 'Country',
  },
  phone: {
    type: String,
    label: 'Telephone (home)',
  },
  mobile: {
    type: String,
    label: 'Mobile phone',
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: 'E-mail',
  },
  maritalStatus: {
    type: String,
  },
  children: {
    type: Number,
  },

  passport: {
    type: Boolean,
  },
  passportNumber: {
    type: String,
    optional: true,
    custom: function() {
      if (this.field('passport').value) {
        return 'required';
      };
    },
  },
  passportValidFrom: {
    type: Date,
    optional: true,
    label: 'from',
    custom: function() {
      if (this.field('passport').value) {
        return 'required';
      };
    },
  },
  passportValidTo: {
    type: Date,
    optional: true,
    label: 'to',
    custom: function() {
      if (this.field('passport').value) {
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
    // URL
  },
  showreel: {
    type: String,
    //URL
  },
});
