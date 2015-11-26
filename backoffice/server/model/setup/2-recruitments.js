Meteor.startup(function() {
  Recruitments.remove({
    fake: true
  });

  if (!Meteor.settings.development.generateFakeRecruitments) {
    console.log('WARNING: NOT regenerating fake recruitments');
    return;
  }

  var maxRecruitments = Meteor.settings.development.generateFakeRecruitments.maxRecruitments;
  console.log('regenerating', maxRecruitments, 'fake recruitments...');

  for (var i = 0; i < maxRecruitments; i++) {
    var createdAt = moment().subtract(9, 'years').startOf('year');
    createdAt.add(Math.random() * 10 * 12 * 30 * 24 * 60 * 60 * 1000, 'milliseconds');
    createdAt = createdAt.toDate();

    var application = {
      firstname: ['Palmer', 'Andersen', 'Antony', 'Roby', 'Federica'][Math.floor(Math.random() * 4)],
      lastname: ['Eldritch', 'Bianchi', 'Rossi', 'Verdi'][Math.floor(Math.random() * 3)],
      socialSecurityNumber: 'ABCD12345' + i,
      // gaussian random date from epoch to 30 years later
      dateOfBirth: new Date(Math.floor(gaussianRandom() * new Date(2000, 11, 31, 23, 59, 59).getTime())),
      permitKind: 'kinda',
      residentialCap: 10100,
      city: 'comune',
      province: 'prov',
      region: Regions.findOne({
        id: Math.floor(Math.random() * 20) + 1
      }).id,
      phone: '11223344' + i,
      mobile: '33344455' + i,
      experienceAsPhotographer: Math.random() >= 0.5,
      experienceAsOther: Math.random() >= 0.5,
      referrer: randomCollectionElement(Referrers)._id,
    };

    application.email = application.firstname + '.' + application.lastname + '@getreel.test';
    var diff = new Date() - application.dateOfBirth;
    var age = Math.floor(diff / 31536000000);
    application.age = age;

    var recruitment = {
      fake: true,
      createdAt: createdAt,
      application: application,
      stages: {
        current: [0, 1, 2, 3, 4, 5][Math.floor(Math.random() * 6)],
        history: [Stages.findOne({
          id: 0
        })],
      },
    };

    for (var j = 1; j <= recruitment.stages.current; j++) {
      var stage = Stages.findOne({
        id: j
      });
      stage.recruiter = Meteor.users.findOne({
        username: 'recruiter' + (Math.floor(Math.random() * Meteor.settings.development.generateFakeUsers.maxRecruiters) + 1),
        roles: 'recruiter',
      }, {
        fields: {
          _id: 1
        }
      })._id;
      recruitment.stages.history.push(stage);
      // recruitment.stages.history[stagen] = {
      // 	stage: stagen,
      // 	description: "Fase " + stagen,
      // 	recruiter: Meteor.users.findOne({
      // 		username: 'recruiter' + (Math.floor(Math.random() * Meteor.settings.development.generateFakeUsers.maxRecruiters) + 1),
      // 		roles: 'recruiter',
      // 	}, {fields: {_id: 1}})._id,
      // 	outcome: randomCollectionElement(RecruitingOutcomes).id,
      // 	// outcome: {
      // 	// 	id: randomCollectionElement(RecruitingOutcomes).id,
      // 	// 	reasonId: (function(current) {
      // 	// 		var reasons = OutcomeReasons.find({stage: current}).fetch();
      // 	// 		return randomCollectionElement(OutcomeReasons).id;
      // 	// 	})(recruitment.stages.current),
      // 		// notes: 'blablabla',
      // 	// }
      // }
    }
    recruitment.stages.current = recruitment.stages.history[recruitment.stages.current];

    recruitment.events = [];
    recruitment.activities = [];
    recruitment.careerSteps = [];

    Recruitments.insert(recruitment);
  }
});
