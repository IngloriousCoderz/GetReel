SelfAssessmentSchema = new SimpleSchema({
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
