Meteor.startup(function() {
  Meteor.publish('statuses', function() {
    return Statuses.find();
  });
});
