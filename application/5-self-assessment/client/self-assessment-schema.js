SelfAssessmentSchema = new SimpleSchema({
  salesSkills: {
    type: String,
  },
  publicRelations: {
    type: String,
  },
  dynamism: {
    type: String,
  },
  workOrganization: {
    type: String,
  },
  inventive: {
    type: String,
  },
  adaption: {
    type: String,
  },
  ambition: {
    type: String,
  },
  will: {
    type: String,
  },
  selfControl: {
    type: String,
  },

  professionalExpectations: {
    type: String,
  },
  economicExpectations: {
    type: String,
  },
  qualitiesDefects: {
    type: String,
  },
  secretDream: {
    type: String,
  },

});

Meteor.startup(function() {
  SelfAssessmentSchema.i18n('schemas.self-assessment');
});
