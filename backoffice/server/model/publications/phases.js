Meteor.publish('phases', function() {
  return Phases.find();
});
