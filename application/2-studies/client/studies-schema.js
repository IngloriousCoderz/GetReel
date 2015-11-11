StudiesSchema = new SimpleSchema({
  degree: {
    type: String,
  },
  year: {
    type: String,
  },
  subjectsOfStudy: {
    type: String,
    optional: true,
  },
  otherStudy: {
      type: String,
      optional: true,
    },

  motherTongue: {
    type: String,
  },
  otherLanguages: {
    type: String,
    optional: true,
  },
  english: {
    type: String,
    autoform: {
      options: {
        No: 'No',
        Basic: 'Basic',
        Independent: 'Independent',
        Proficient: 'Proficient',
      },
    },
  },
  french: {
    type: String,
    autoform: {
      options: {
        No: 'No',
        Basic: 'Basic',
        Independent: 'Independent',
        Proficient: 'Proficient',
      },
    },
  },
  spanish: {
    type: String,
    autoform: {
      options: {
        No: 'No',
        Basic: 'Basic',
        Independent: 'Independent',
        Proficient: 'Proficient',
      },
    },
  },

  computerSkills: {
    type: String,
  },
});

Meteor.startup(function() {
  StudiesSchema.i18n('schemas.studies');
});
