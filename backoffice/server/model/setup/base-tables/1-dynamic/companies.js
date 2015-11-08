Meteor.startup(function() {
  Companies.remove({});

  if (Companies.find().count() === 0) {
    var companies = [
      {name: 'PHOTOPRO'},
      {name: 'PHOTOYFOTO'},
      {name: 'COLORSPAGNA'},
      {name: 'DIGITAL GROUP SRL'},
      {name: 'DIGIGREECE'},
      {name: 'COLORPOINT SRL'},
      {name: 'DIGITUNISIE'},
      {name: 'NONSOLOFOTO'},
      {name: 'KROMATICKSMOS'},
      {name: 'PHOTO SMILE MALDIVES'},
      {name: 'Camandro'},
    ];

    companies.forEach(function(company) {
      Companies.insert(company);
    });

    console.log('added', Companies.find().count(), 'companies.');
  }
});
