Meteor.publish('statuses', function() {
  return Statuses.find();
});
