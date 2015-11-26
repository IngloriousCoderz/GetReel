Meteor.startup(function() {
	Recruitments.remove({
		fake: true
	});

	if (Meteor.settings.development.generateFakeRecruitments) {
		var maxRecruitments = Meteor.settings.development.generateFakeRecruitments.maxRecruitments;
		console.log('regenerating', maxRecruitments, 'fake recruitments...');
	} else {
		var maxRecruitments = 0;
		console.log('WARNING : NOT regenerating fake recruitments');
		return;
	}

	for (var i = 0; i < maxRecruitments; i++) {
		var createdAt = moment().subtract(9, 'years').startOf('year');
		createdAt.add(Math.random() * 10*12*30*24*60*60*1000, 'milliseconds');
		createdAt = createdAt.toDate();

		var fakeRecruitment = {
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
			stages: {},
			createdAt: createdAt,
			region: Regions.findOne({id: Math.floor(Math.random() * 20) + 1}).id,
			experienceAsPhotographer: Math.random() >= 0.5,
			experienceAsOther: Math.random() >= 0.5,
			referrer: randomCollectionElement(Referrers)._id,
		};

		fakeRecruitment.stages.current = [0, 1, 2, 3, 4, 5][Math.floor(Math.random() * 6)];
		fakeRecruitment.stages.history = [Stages.findOne({id: 0})];

		for (var stagen = 1; stagen <= fakeRecruitment.stages.current; stagen++) {
			var stage = Stages.findOne({id: stagen});
			stage.recruiter =  Meteor.users.findOne({
				username: 'recruiter' + (Math.floor(Math.random() * Meteor.settings.development.generateFakeUsers.maxRecruiters) + 1),
				roles: 'recruiter',
			}, {fields: {_id: 1}})._id;
			fakeRecruitment.stages.history.push(stage);
			// fakeRecruitment.stages.history[stagen] = {
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
			// 	// 	})(fakeRecruitment.stages.current),
			// 		// notes: 'blablabla',
			// 	// }
			// }
		}
		fakeRecruitment.stages.current = fakeRecruitment.stages.history[fakeRecruitment.stages.current];

		fakeRecruitment.email = fakeRecruitment.firstname + '.' + fakeRecruitment.lastname + '@getreel.test';
		var diff = new Date() - fakeRecruitment.dateOfBirth;
		var age = Math.floor(diff / 31536000000);
		fakeRecruitment.age = age;
		fakeRecruitment.events = [];
		fakeRecruitment.activities = [];
		fakeRecruitment.careerSteps = [];

		Recruitments.insert(fakeRecruitment);
	}
});
