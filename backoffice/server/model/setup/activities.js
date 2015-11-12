//TODO: consider mass import from existing data
Meteor.startup(function() {

    if (Meteor.settings.development.generateFakeActivities) {
		var maxActivities = Meteor.settings.development.generateFakeActivities.maxActivities;
		var maxApplications = Meteor.settings.development.generateFakeActivities.maxApplications;
		console.log('regenerating %d fake activities for %d applications...', maxActivities, maxApplications);
	} else {
		var maxActivities = 0;
		console.log('WARNING : NOT regenerating fake activities');
		return;
	}

    var applications = Applications.find({}, {limit:maxApplications}).fetch();
    var contactTypes = ContactTypes.find().fetch();
    var activityOutcomes = ActivityOutcomes.find().fetch();
    var recruiter = Meteor.users.findOne({
            roles: 'recruiter',
        }, {
            fields: {
                _id: 1,
                username: 1,
            },
        });

	Activities.remove({});

	if (Activities.find().count() === 0) {
        var activity = {};
        applications.forEach(function(application) {
            //console.log(application.firstname);
            activity = {
                application : {
                    _id: application._id,
                    firstname : application.firstname,
                    lastname: application.lastname,
                    socialSecurityNumber: application.socialSecurityNumber,
                    phase: application.phases.current,
                },
                createdBy: recruiter.username,
                contactType: contactTypes[Math.floor(Math.random() * contactTypes.length)].name,
                activityOutcome: activityOutcomes[Math.floor(Math.random() * activityOutcomes.length)].name,
                notes: "blablabla",
            	deadline: new Date(),
    			createdAt: new Date(),
    			editedAt: new Date(),
            };

            Activities.insert(activity);
        });
		// var activities = [{
		// 	surname: 'import',
		// 	name: 'import',
		// 	createdBy: 'reference to users',
		// 	taxCode: 'import',
		// 	phase: 'reference to phases?', // 1,2,3, assunto
		// 	contactType: 'reference to contactTypes',
		// 	activityOutcome: 'reference to activity outcomes',
		// 	notes: 'import',
		// 	deadline: new Date(),
		// 	createdAt: new Date(),
		// 	editedAt: new Date(),
		// }, ];
        //
		// activities.forEach(function(activity) {
		// 	Activities.insert(activity);
		// });

		console.log('added', Activities.find().count(), 'activities.');
	}
});