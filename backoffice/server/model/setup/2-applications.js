Meteor.startup(function() {
	Applications.remove({
		fake: true
	});

	if (Meteor.settings.development.generateFakeApplications) {
		var maxApplications = Meteor.settings.development.generateFakeApplications.maxApplications;
		console.log('regenerating', maxApplications, 'fake applications...');
	} else {
		var maxApplications = 0;
		console.log('WARNING : NOT regenerating fake applications');
		return;
	}

	var referrers = Referrers.find().fetch();
	var activityOutcomes = ActivityOutcomes.find().fetch();
	var outcomeReasons = OutcomeReasons.find();//.fetch();

	for (var i = 0; i < maxApplications; i++) {
		var createdAt = new Date();

		// console.log("createdAt", createdAt);
		createdAt.setDate(createdAt.getDate() + Math.random() * maxApplications);

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

		fakeApplication.phases.current = [0, 1, 2, 3, 4][Math.floor(Math.random() * 4)];
		fakeApplication.phases.list = [{
			phase: 0,
			description: "recruiting",
		}];

		for (var phasen = 1; phasen <= fakeApplication.phases.current; phasen++) {
			fakeApplication.phases.list[phasen] = {
				phase: phasen,
				description: "Fase " + phasen,
				recruiter: Meteor.users.findOne({
					username: 'recruiter' + (Math.floor(Math.random() * Meteor.settings.development.generateFakeUsers.maxRecruiters) + 1),
					roles: 'recruiter',
				}, {
					fields: {
						_id: 1,
						username: 1,
					},
				}),
				outcome: {
					id: activityOutcomes[Math.floor(Math.random() * activityOutcomes.length)].id,
					reasonId: (function(current) {
						var reasons = OutcomeReasons.find({phase:current}).fetch();
						return reasons[Math.floor(Math.random() * reasons.length)].id;
					})(fakeApplication.phases.current),
					notes: 'blablabla',
				}
			}
		}

		fakeApplication.email = fakeApplication.firstname + '.' + fakeApplication.lastname + '@getreel.test';
		var diff = new Date() - fakeApplication.dateOfBirth;
		var age = Math.floor(diff / 31536000000);
		fakeApplication.age = age;

		Applications.insert(fakeApplication);
	}
});
