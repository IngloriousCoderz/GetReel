Meteor.publish('outcomeReasons', function() {
  return OutcomeReasons.find();
});
