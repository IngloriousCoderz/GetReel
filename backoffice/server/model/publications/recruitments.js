Meteor.publish('recruitments', function() {
  //
  // ELIMINARE!
  //
  return Recruitments.find();

  //
  // ELIMINARE!
  //

  if (!Meteor.userId()) {
    throw new Meteor.Error('not-authorized');
  }

  var user = Meteor.users.find({
    _id: this.userId,
  });

  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Recruitments.find();
  }

  if (Roles.userIsInRole(this.userId, ['recruiter'])) {
    return Recruitments.find({
      $or: [
        {
          'status.current': 'unassigned',
        }, {
          $and: [
            {'status.current': 'assigned'},
            {'status.to': user.username},
          ],
        },
      ],
    });
  }
});
