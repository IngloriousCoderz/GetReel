Meteor.startup(function() {
  Meteor.publish('companies', function() {
    return Companies.find();
  });
});
