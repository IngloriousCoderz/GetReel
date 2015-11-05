Meteor.startup(function() {
  Meteor.publish('locations', function() {
    return Locations.find();
  });
});
