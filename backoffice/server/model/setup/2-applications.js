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

	for (var i = 0; i < maxApplications; i++) {
		var createdAt = moment().subtract(9, 'years').startOf('year');
		createdAt.add(Math.random() * 10*12*30*24*60*60*1000, 'milliseconds');
		createdAt = createdAt.toDate();

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
			region: Regions.findOne({id: Math.floor(Math.random() * 20) + 1}).id,
			experienceAsPhotographer: Math.random() >= 0.5,
			experienceAsOther: Math.random() >= 0.5,
			referrer: randomCollectionElement(Referrers)._id,
		};

		fakeApplication.phases.current = [0, 1, 2, 3, 4, 5][Math.floor(Math.random() * 6)];
		fakeApplication.phases.history = [Phases.findOne({id: 0})];

		for (var phasen = 1; phasen <= fakeApplication.phases.current; phasen++) {
			var phase = Phases.findOne({id: phasen});
			phase.recruiter =  Meteor.users.findOne({
				username: 'recruiter' + (Math.floor(Math.random() * Meteor.settings.development.generateFakeUsers.maxRecruiters) + 1),
				roles: 'recruiter',
			}, {fields: {_id: 1}})._id;
			fakeApplication.phases.history.push(phase);
			// fakeApplication.phases.history[phasen] = {
			// 	phase: phasen,
			// 	description: "Fase " + phasen,
			// 	recruiter: Meteor.users.findOne({
			// 		username: 'recruiter' + (Math.floor(Math.random() * Meteor.settings.development.generateFakeUsers.maxRecruiters) + 1),
			// 		roles: 'recruiter',
			// 	}, {fields: {_id: 1}})._id,
			// 	outcome: randomCollectionElement(RecruitingOutcomes).id,
			// 	// outcome: {
			// 	// 	id: randomCollectionElement(RecruitingOutcomes).id,
			// 	// 	reasonId: (function(current) {
			// 	// 		var reasons = OutcomeReasons.find({phase: current}).fetch();
			// 	// 		return randomCollectionElement(OutcomeReasons).id;
			// 	// 	})(fakeApplication.phases.current),
			// 		// notes: 'blablabla',
			// 	// }
			// }
		}
		fakeApplication.phases.current = fakeApplication.phases.history[fakeApplication.phases.current];

		fakeApplication.email = fakeApplication.firstname + '.' + fakeApplication.lastname + '@getreel.test';
		var diff = new Date() - fakeApplication.dateOfBirth;
		var age = Math.floor(diff / 31536000000);
		fakeApplication.age = age;
		fakeApplication.events = [];
		fakeApplication.activities = [];
		fakeApplication.careerSteps = [];

		Applications.insert(fakeApplication);
	}
});
