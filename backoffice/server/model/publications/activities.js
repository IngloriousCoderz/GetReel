Meteor.startup(function() {
  Meteor.publish('activities', function() {
    return Activities.find();
  });
});
