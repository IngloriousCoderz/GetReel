Meteor.publish('roleEvaluations', function() {
  return RoleEvaluations.find();
});
