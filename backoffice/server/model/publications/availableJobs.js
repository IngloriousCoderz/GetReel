Meteor.startup(function() {
  Meteor.publish('availableJobs', function() {
    return Jobs.find();
  });
});
