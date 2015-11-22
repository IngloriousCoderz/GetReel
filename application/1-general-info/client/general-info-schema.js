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
    /*autoform: {
      options: {
        USA: 'USA',
        UK: 'UK',
        Italy: 'Italy',
      },
    },*/
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
  findAddress: {
    type: String,
    optional: true,
  },
  civic: {
    type: String,
  },
  address: {
    type: String,
  },
  zip: {
    type: String,
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  region: {
    type: Number,
    autoform: {
      options: function() {
        return Regions.find().map(function(item) {
          return {label: item.name, value: item.id};
        });
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
  findCurrent: {
    type: String,
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
    type: Number,
    optional: true,
    autoform: {
      options: function() {
        return Regions.find().map(function(item) {
          return {label: item.name, value: item.id};
        });
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
