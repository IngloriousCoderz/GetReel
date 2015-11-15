//TODO: consider mass import from existing data
Meteor.startup(function() {

    var applicationRoles = ApplicationRoles.find().fetch();
    var seasons = Seasons.find().fetch();
    var companies = Companies.find().fetch();
    var countries = Countries.find().fetch();
    var roleEvaluations = RoleEvaluations.find().fetch();

	CareerPaths.remove({});

    

	if (CareerPaths.find().count() === 0) {
		var paths = [{
			surname: 'import',
			name: 'import',
			createdAt: new Date(),
			role: 'reference to application.roles',
			season: 'reference to seasons',
			village: 'import',
			company: 'reference to companies',
			nation: 'reference to countries',
			roleEvaluation: 'reference to role.evaluations',
			periodFrom: 'import',
			description: 'import',
		}, ];

		paths.forEach(function(path) {
			CareerPaths.insert(path);
		});

		console.log('added', CareerPaths.find().count(), 'career paths.');
	}
});