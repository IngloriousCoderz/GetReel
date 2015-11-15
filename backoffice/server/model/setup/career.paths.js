//TODO: consider mass import from existing data
Meteor.startup(function() {

    if (Meteor.settings.development.generateFakeCareers) {
		var maxApplications = Meteor.settings.development.generateFakeCareers.maxApplications;
		var maxCareersPerApplication = Meteor.settings.development.generateFakeCareers.maxCareersPerApplication;
		console.log('regenerating max %d fake careers for %d applications...', maxCareersPerApplication, maxApplications);
	} else {
		var maxActivities = 0;
		console.log('WARNING : NOT regenerating fake activities');
		return;
	}

    var applications = Applications.find({}, {limit:maxApplications}).fetch();
    // var applicationRoles = ApplicationRoles.find().fetch();
    // var seasons = Seasons.find().fetch();
    // var companies = Companies.find().fetch();
    // var countries = Countries.find().fetch();
    // var roleEvaluations = RoleEvaluations.find().fetch();

	CareerPaths.remove({});

	if (CareerPaths.find().count() === 0) {
        var path = {};

        applications.forEach(function(application) {
            for(i= 0; i < Math.floor(Math.random()* maxCareersPerApplication);i++) {
                path = {
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
                CareerPaths.insert(path);
            }
        });
		// var paths = [{
		// 	surname: 'import',
		// 	name: 'import',
		// 	createdAt: new Date(),
		// 	role: 'reference to application.roles',
		// 	season: 'reference to seasons',
		// 	village: 'import',
		// 	company: 'reference to companies',
		// 	nation: 'reference to countries',
		// 	roleEvaluation: 'reference to role.evaluations',
		// 	periodFrom: 'import',
		// 	description: 'import',
		// }, ];
        //
		// paths.forEach(function(path) {
		// 	CareerPaths.insert(path);
		// });

		console.log('added', CareerPaths.find().count(), 'career paths.');
	}
});