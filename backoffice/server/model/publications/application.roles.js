Meteor.publish('applicationRoles', function() {
  return ApplicationRoles.find();
});
