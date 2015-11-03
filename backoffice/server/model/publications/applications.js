Meteor.startup(function() {
  //ReactiveTable.publish('applications', Applications);
  Meteor.publish('applications', function() {
    //
    // ELIMINARE!
    //
    return Applications.find();

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
      return Applications.find();
    }

    if (Roles.userIsInRole(this.userId, ['recruiter'])) {
      return Applications.find({
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
});
