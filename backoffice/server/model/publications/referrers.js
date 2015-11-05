Meteor.startup(function() {
  Meteor.publish('referrers', function() {
    return Referrers.find();
  });
});

