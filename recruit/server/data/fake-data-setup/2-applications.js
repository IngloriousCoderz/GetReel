Meteor.startup(function() {
  console.log('regenerating', maxFakeApplications, 'fake applications...');
  Applications.remove({fake:true});
  var maxFakeApplications = 50;
  console.log('generating', maxFakeApplications, 'fake applications');
  for (var i = 0; i < maxFakeApplications; i++) {
    var fakeApplication = {
      fake: true,
      firstname: ['Andersen', 'Antony', 'Roby', 'Federica'][Math.floor(Math.random() * 3)],
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
      experienceAsPhotographer: true,
      experienceAsOther: false,
    };
    fakeApplication.status.current = [0, 1, 2, 3][Math.floor(Math.random() * 2)];
    if (fakeApplication.status.current > 0) {
      //fakeApplication.status.recruiter = 'recruiter';
      fakeApplication.status.recruiter = Meteor.users.findOne({
          roles: 'recruiter'
      }, {
          fields: {
              _id: 1,
              username: 1
          }
      });
    }

    fakeApplication.email = fakeApplication.firstname + '.' + fakeApplication.lastname + '@getreel.test';
    var birthdate = fakeApplication.dateOfBirth;
    var cur = new Date();
    var diff = cur - birthdate;
    var age = Math.floor(diff / 31536000000);
    fakeApplication.age = age.toString();

    Applications.insert(fakeApplication);
  }
});