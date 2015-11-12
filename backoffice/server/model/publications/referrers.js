Meteor.publish('referrers', function() {
  return Referrers.find();
});
