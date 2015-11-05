Meteor.startup(function() {
  Meteor.publish('nations', function() {
    return Nations.find();
  });
});
