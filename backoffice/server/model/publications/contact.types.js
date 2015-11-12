Meteor.publish('contactTypes', function() {
  return ContactTypes.find();
});
