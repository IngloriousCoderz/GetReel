Meteor.publish('seasons', function() {
  return Seasons.find();
});
