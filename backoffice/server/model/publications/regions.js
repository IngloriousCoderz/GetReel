Meteor.publish('regions', function() {
  return Regions.find();
});
