WorkSchema = new SimpleSchema({
  tourismWork: {
    type: Boolean,
  },
  otherWork: {
    type: Boolean,
  },
  company: {
    type: String,
  },
  period: {
    type: String,
  },
  typeOfWork: {
    type: String,
  },
  reasonTerminationEmployment: {
    type: String,
  },
});

Meteor.startup(function() {
  WorkSchema.i18n('schemas.work');
});
