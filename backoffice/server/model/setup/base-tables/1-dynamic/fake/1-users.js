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

  var maxRecruiters = Meteor.settings.development.generateFakeUsers.maxRecruiters;
  if (maxRecruiters) {
    console.log('regenerating', maxRecruiters, 'fake recruiters...');
    for (var i = 1; i <= maxRecruiters; i++) {
      var recruiter = Accounts.createUser({
        username: 'recruiter' + i,
        email: 'recruiter' + i + '@getreel.com',
        password: 'password' + i,
        profile: {
          first_name: 'Fake' + i,
          last_name: 'Recruiter', // they're siblings :P
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
