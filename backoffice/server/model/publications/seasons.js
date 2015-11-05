Meteor.startup(function() {
  Meteor.publish('seasons', function() {
    return Seasons.find();
  });
});

