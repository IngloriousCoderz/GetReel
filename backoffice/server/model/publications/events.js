Meteor.startup(function() {
  Meteor.publish('events', function() {
    return Events.find();
  });
});
