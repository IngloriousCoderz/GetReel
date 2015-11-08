Meteor.startup(function() {
  Meteor.publish('countries', function() {
    return Countries.find();
  });
});
