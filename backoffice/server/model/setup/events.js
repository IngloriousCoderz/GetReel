//TODO: consider mass import from existing data
Meteor.startup(function() {

    var contactTypes = ContactTypes.find().fetch();
    var activityOutcomes = ActivityOutcomes.find().fetch();

	Activities.remove({});

	if (Activities.find().count() === 0) {
		var activities = [{
			surname: 'import',
			name: 'import',
			createdBy: 'reference to users',
			taxCode: 'import',
			phase: 'reference to phases?', // 1,2,3, assunto
			contactType: 'reference to contactTypes',
			activityOutcome: 'reference to activity outcomes',
			notes: 'import',
			deadline: new Date(),
			createdAt: new Date(),
			editedAt: new Date(),
		}, ];

		activities.forEach(function(activity) {
			Activities.insert(activity);
		});

		console.log('added', Activities.find().count(), 'activities.');
	}
});