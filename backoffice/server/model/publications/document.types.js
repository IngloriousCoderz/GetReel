Meteor.startup(function() {
  Meteor.publish('documentTypes', function() {
    return DocumentTypes.find();
  });
});
