Meteor.startup(function() {
  Meteor.publish('roleEvaluations', function() {
    return RoleEvaluations.find();
  });
});
