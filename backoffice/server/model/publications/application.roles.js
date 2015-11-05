Meteor.startup(function() {
  Meteor.publish('applicationRoles', function() {
    return ApplicationRoles.find();
  });
});
