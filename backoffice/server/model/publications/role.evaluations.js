Meteor.startup(function() {
  Meteor.publish('nations', function() {
    return RoleEvaluations.find();
  });
});
