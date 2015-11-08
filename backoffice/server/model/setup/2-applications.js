Meteor.startup(function() {
  Applications.remove({fake: true});

  var maxFakeApplications = 1000;
  console.log('regenerating', maxFakeApplications, 'fake applications...');

  var referrers = Referrers.find().fetch();

  for (var i = 0; i < maxFakeApplications; i++) {
    var createdAt = new Date();

    // console.log("createdAt", createdAt);
    createdAt.setDate(createdAt.getDate() + Math.random() * maxFakeApplications);

    // console.log("createdAt", createdAt);
    var fakeApplication = {
      fake: true,
      firstname: ['Palmer', 'Andersen', 'Antony', 'Roby', 'Federica'][Math.floor(Math.random() * 4)],
      lastname: ['Eldritch', 'Bianchi', 'Rossi', 'Verdi'][Math.floor(Math.random() * 3)],
      socialSecurityNumber: 'ABCD12345' + i,
      // gaussian random date from epoch to 30 years later
      dateOfBirth: new Date(Math.floor(gaussianRandom() * new Date(2000, 11, 31, 23, 59, 59).getTime())),
      permitKind: 'kinda',
      city: 'comune',
      province: 'prov',
      residentialCap: 10100,
      phone: '11223344' + i,
      mobile: '33344455' + i,
      phases: {},
      createdAt: createdAt,
      region: [1, 12, 15][Math.floor(Math.random() * 3)],
      experienceAsPhotographer: true,
      experienceAsOther: false,
      referrer: referrers[Math.floor(Math.random() * referrers.length)].name,
    };
    fakeApplication.phases.current = [0, 1, 2, 3][Math.floor(Math.random() * 4)];
    if (fakeApplication.phases.current > 0) {
      //fakeApplication.status.recruiter = 'recruiter';
      fakeApplication.phases.recruiter = Meteor.users.findOne({
        roles: 'recruiter',
      }, {
        fields: {
          _id: 1,
          username: 1,
        },
      });
    }

    fakeApplication.email = fakeApplication.firstname + '.' + fakeApplication.lastname + '@getreel.test';
    var birthdate = fakeApplication.dateOfBirth;
    var cur = new Date();
    var diff = cur - birthdate;
    var age = Math.floor(diff / 31536000000);
    fakeApplication.age = age;

    Applications.insert(fakeApplication);
  }
});
