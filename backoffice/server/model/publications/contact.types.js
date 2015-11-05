Meteor.startup(function() {
  Meteor.publish('contactTypes', function() {
    return ContactTypes.find();
  });
});
