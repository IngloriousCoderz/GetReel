Meteor.publish('stages', function() {
  return Stages.find();
});
