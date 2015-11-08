PrivacySchema = new SimpleSchema({
});

Meteor.startup(function() {
  PrivacySchema.i18n('schemas.privacy');
});
