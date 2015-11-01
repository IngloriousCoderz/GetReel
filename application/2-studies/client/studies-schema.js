StudiesSchema = new SimpleSchema({
  degree: {
    type: String,
    label: 'Course of Study/Degree'
  },
  year: {
    type: Number,
  },
  subjectsOfStudy: {
    type: String,
  },
  otherStudy: {
      type: String,
    },

  motherTongue: {
    type: String,
  },
  otherLanguages: {
    type: String,
  },
  english: {
    type: String,
    autoform: {
      options: {
        No: 'No',
        Basic: 'Basic',
        Independent: 'Independent',
        Proficient: 'Proficient'
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
        Proficient: 'Proficient'
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
        Proficient: 'Proficient'
      },
    },
  },

  computerSkills: {
    type: String,
  },
});
