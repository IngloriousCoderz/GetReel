Meteor.startup(function() {
  if (Regions.find().count() === 0) {
    var regions = [
      {id: 13, name: 'Abruzzo'},
      {id: 17, name: 'Basilicata'},
      {id: 18, name: 'Calabria'},
      {id: 15, name: 'Campania'},
      {id: 8, name: 'Emilia-Romagna'},
      {id: 6, name: 'Friuli-Venezia Giulia'},
      {id: 12, name: 'Lazio'},
      {id: 7, name: 'Liguria'},
      {id: 3, name: 'Lombardia'},
      {id: 11, name: 'Marche'},
      {id: 14, name: 'Molise'},
      {id: 1, name: 'Piemonte'},
      {id: 16, name: 'Puglia'},
      {id: 20, name: 'Sardegna'},
      {id: 19, name: 'Sicilia'},
      {id: 9, name: 'Toscana'},
      {id: 4, name: 'Trentino-Alto Adige'},
      {id: 10, name: 'Umbria'},
      {id: 2, name: 'Valle d\'Aosta'},
      {id: 5, name: 'Veneto'},
    ];
    regions.forEach(function(region) {
      Regions.insert(region);
    });
  }

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

  Meteor.users.remove({roles:'fake'});
  if (Roles.getUsersInRole('admin').count() === 0) {
    console.log('no admin found, creating fake admin');
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

  if (Roles.getUsersInRole('recruiter').count() === 0) {
    console.log('no recruiters found, creating fake recruiter');
    var recruiter = Accounts.createUser({
      username: 'recruiter',
      email: 'recruiter@getreel.com',
      password: 'password',
      profile: {
        first_name: 'fake',
        last_name: 'recruiter',
        company: 'inglorious coderz',
      },
    });
    Roles.addUsersToRoles(recruiter, ['recruiter', 'fake']);
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
  console.log('regenerating', maxFakeApplications, 'fake applications...');
  Applications.remove({fake:true});
  var maxFakeApplications = 50;
  console.log('generating', maxFakeApplications, 'fake applications');
  for (var i = 0; i < maxFakeApplications; i++) {
    var fakeApplication = {
      fake: true,
      firstname: ['Antony', 'Roby', 'Federica'][Math.floor(Math.random() * 3)],
      lastname: ['Bianchi', 'Rossi', 'Verdi'][Math.floor(Math.random() * 3)],
      socialSecurityNumber: 'ABCD12345' + i,
      dateOfBirth: new Date(1970 + i % 30, (i % 12) + 1, i),
      permitKind: 'kinda',
      city: 'comune',
      province: 'prov',
      residentialCap: 10100,
      phone: '11223344' + i,
      mobile: '33344455' + i,
      status: {},
      createdAt: new Date(),
      region: [1, 12, 15][Math.floor(Math.random() * 3)],
      experienceAsPhotographer: 'YES',
      experienceAsOther: 'NO',
    };
    fakeApplication.status.current = ['unassigned', 'assigned'][Math.floor(Math.random() * 2)];
    if (fakeApplication.status.current === 'assigned') {
      fakeApplication.status.to = 'recruiter';
    }

    fakeApplication.email = fakeApplication.firstname + '.' + fakeApplication.lastname + '@getreel.test';
    var birthdate = fakeApplication.dateOfBirth;
    var cur = new Date();
    var diff = cur - birthdate;
    var age = Math.floor(diff / 31536000000);
    fakeApplication.age = age;

    Applications.insert(fakeApplication);
  }

  //console.log("application", i, ":", fakeApplication);
});

Meteor.publish('regions', function() {
  return Regions.find();
});

Meteor.publish('applications', function() {
  return Applications.find();

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
        {'status.current':'unassigned'},
        {
          $and: [
            {'status.current':'assigned'},
            {'status.to':user.username},
          ],
        },
     ],
    });
  }
});
