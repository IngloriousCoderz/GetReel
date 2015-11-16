//TODO: consider mass import from existing data
Meteor.startup(function() {

    if (Meteor.settings.development.generateFakeCareers) {
		var maxApplications = Meteor.settings.development.generateFakeCareers.maxApplications;
		var maxCareersPerApplication = Meteor.settings.development.generateFakeCareers.maxCareersPerApplication;
		console.log('regenerating max %d fake careers for %d applications...', maxCareersPerApplication, maxApplications);
	} else {
		var maxCareersPerApplication = 0;
		console.log('WARNING : NOT regenerating fake careers');
		return;
	}

    var applications = Applications.find({}, {limit:maxApplications});

    var seasonsCursor = Seasons.find();
    var seasonsArray = seasonsCursor.fetch();

	CareerSteps.remove({});

	if (CareerSteps.find().count() === 0) {
        var step = {};
        applications.forEach(function(application) {
            for(i= 0; i < Math.floor(Math.random()* maxCareersPerApplication);i++) {
                step = {
                    application : {
                        _id: application._id,
                        firstname : application.firstname,
                        lastname: application.lastname,
                        //socialSecurityNumber: application.socialSecurityNumber,
                        //phase: application.phases.current,
                    },
                    createdAt: new Date(),
        			role: randomCollectionElement(ApplicationRoles).name,
        			season: randomCollectionElement(Seasons).name,
        			village: 'import',
        			company: randomCollectionElement(Companies).name,
        			country: randomCollectionElement(Countries).name,
        			roleEvaluation: randomCollectionElement(RoleEvaluations).name,
        			periodFrom: 'import',
        			description: 'import',
                }
                step._id = CareerSteps.insert(step);
                Applications.update({_id:application._id}, {$push: {careerSteps:step._id}});
            }
        });

		console.log('added', CareerSteps.find().count(), 'career steps.');
	}
});