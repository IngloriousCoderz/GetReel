Meteor.startup(function() {
  Meteor.publish('activityOutcomes', function() {
    return ActivityOutcomes.find();
  });
});
