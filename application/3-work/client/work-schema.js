WorkSchema = new SimpleSchema({
  tourismWork: {
    type: Boolean,
  },
  otherWork: {
    type: Boolean,
  },
  company: {
    type: String,
    optional: true,
  },
  period: {
    type: String,
    optional: true,
  },
  typeOfWork: {
    type: String,
    optional: true,
  },
  reasonTerminationEmployment: {
    type: String,
    optional: true,
  },
});

Meteor.startup(function() {
  WorkSchema.i18n('schemas.work');
});
