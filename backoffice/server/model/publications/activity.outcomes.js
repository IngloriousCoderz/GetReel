Meteor.startup(function() {
  Meteor.publish('outcomeReasons', function() {
    return OutcomeReasons.find();
  });
  Meteor.publish('outcomeReasons2', function() {
    return OutcomeReasons2.find();
  });
  Meteor.publish('outcomeReasons3', function() {
    return OutcomeReasons3.find();
  });
});
