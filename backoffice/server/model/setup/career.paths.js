//TODO: consider mass import from existing data
Meteor.startup(function() {
  CareerPaths.remove({});

  if (CareerPaths.find().count() === 0) {
    var paths = [
      {
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
      },
    ];

    paths.forEach(function(path) {
      CareerPaths.insert(path);
    });

    console.log('added', CareerPaths.find().count(), 'career paths.');
  }
});
