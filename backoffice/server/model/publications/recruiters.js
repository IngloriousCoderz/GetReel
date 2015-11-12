Meteor.publish('recruiters', function() {
  return Meteor.users.find({roles: 'recruiter'});
});
