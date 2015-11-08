Meteor.publish('documentTypes', function() {
  return DocumentTypes.find();
});
