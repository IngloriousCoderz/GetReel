Meteor.publish('availableJobs', function() {
  return Jobs.find();
});
