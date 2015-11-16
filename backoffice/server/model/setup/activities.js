//TODO: consider mass import from existing data
Meteor.startup(function() {

    if (Meteor.settings.development.generateFakeActivities) {
		var maxApplications = Meteor.settings.development.generateFakeActivities.maxApplications;
		var maxActivitiesPerApplication = Meteor.settings.development.generateFakeActivities.maxActivitiesPerApplication;
		console.log('regenerating max %d fake activities for %d applications...', maxActivitiesPerApplication, maxApplications);
	} else {
		var maxActivities = 0;
		console.log('WARNING : NOT regenerating fake activities');
		return;
	}

    var applications = Applications.find({}, {limit:maxApplications});
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
            for(i= 0; i < Math.floor(Math.random()* maxActivitiesPerApplication);i++) {
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
                    contactType: randomCollectionElement(ContactTypes).name,
                    activityOutcome: randomCollectionElement(ActivityOutcomes).name,
                    notes: "blablabla",
                	deadline: new Date(),
        			createdAt: new Date(),
        			editedAt: new Date(),
                };

                activity._id = Activities.insert(activity);
                Applications.update({_id:application._id}, {$push: {activities:activity._id}});
            }
        });

		console.log('added', Activities.find().count(), 'activities.');
	}
});