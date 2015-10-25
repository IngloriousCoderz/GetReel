Meteor.startup(function() {
  if (Jobs.find().count() === 0) {
    var jobs = [
      {title: 'Select a job position...'},
      {title: 'Haiti Village Photographer'},
      {title: 'Rapallo On The Beach'},
    ];
    jobs.forEach(function(job) {
      Jobs.insert(job);
    });
  }

  //if (Meteor.users.find({roles:"admin"}).count() === 0) {
  if (Roles.getUsersInRole('admin').count() === 0) {
      console.log("no admin found, creating fake admin");
      var admin = Accounts.createUser({
          username: 'administrator',
          email: 'administrator@getreel.com',
          password: 'password',
          profile: {
              first_name: 'fake',
              last_name: 'administrator',
              company: 'inglorious coderz',
          },
      });
      Roles.addUsersToRoles(admin, "admin");
  }
  //if (Meteor.users.find({roles:"recruiter"}).count() === 0) {
  if (Roles.getUsersInRole('recruiter').count() === 0) {
      console.log("no recruiters found, creating fake recruiter");
      var recruiter = Accounts.createUser({
          username: 'recruiter',
          email: 'recruiter@getreel.com',
          password: 'password',
          profile: {
              first_name: 'fake',
              last_name: 'recruiter',
              company: 'inglorious coderz',
          },
          roles: ["recruiter"]
      });
      Roles.addUsersToRoles(recruiter, "recruiter");
  }
});

Meteor.publish('applications', function () {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var user = Meteor.users.find({_id: this.userId});

    if (Roles.userIsInRole(this.userId, ['admin'])) {
        return Applications.find();
    }

    if (Roles.userIsInRole(this.userId, ['recruiter'])) {
        return Applications.find({
            $or: [
                    {'status.current':"unassigned"},
                    $and: [
                            {'status.current':"assigned"}
                            {'status.to':user.username}
                          ]
                 ]
        });
    }
});

