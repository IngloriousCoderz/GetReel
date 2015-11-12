Meteor.startup(function() {
  Meteor.users.remove({roles: 'fake'});

  if(!Meteor.settings.development.generateFakeUsers) {
      console.log("WARNING: aborting fake user generation");
      return;
  }

  if(Meteor.settings.development.generateFakeUsers.admin) {
      if (Roles.getUsersInRole('admin').count() === 0) {
        console.log('regenerating fake admin');
        var admin = Accounts.createUser({
          username: 'administrator',
          email: 'administrator@getreel.com',
          password: 'password',
          profile: {
            first_name: 'fake',
            last_name: 'administrator',
            company: 'Inglorious Coderz',
          },
        });
        Roles.addUsersToRoles(admin, ['admin', 'fake']);
      }
  }

  if(Meteor.settings.development.generateFakeUsers.recruiter) {
      if (Roles.getUsersInRole('recruiter').count() === 0) {
        console.log('regenerating fake recruiter');
        var recruiter = Accounts.createUser({
          username: 'recruiter',
          email: 'recruiter@getreel.com',
          password: 'password',
          profile: {
            first_name: 'fake',
            last_name: 'recruiter',
            company: 'Inglorious Coderz',
          },
        });
        Roles.addUsersToRoles(recruiter, ['recruiter', 'fake']);
      }
  }
  /*
  var maxFakeUsers = 2;
  for (var i = 0; i < maxFakeUsers; i++) {
    var fakeUser = {
      username: 'utente' + i,
      email: 'utente' + i + '@getreel.com',
      password: 'password',
      profile: {
        first_name: 'nome' + i,
        last_name: 'cognome' + i,
        company: 'company' + i,
      },
      roles: ["user"]
    };
    Accounts.createUser(fakeUser);
    Roles.addUsersToRoles(fakeUser, "user");
  }
  */
});
