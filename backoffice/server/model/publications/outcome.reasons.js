Meteor.publish('activityOutcomes', function() {
  return ActivityOutcomes.find();
});
