PrivacySchema = new SimpleSchema({
  privacyPolicy: {
      type: Boolean,
      optional: false,
      defaultValue: true,
    },
});

Meteor.startup(function() {
  PrivacySchema.i18n('schemas.privacy');
});
