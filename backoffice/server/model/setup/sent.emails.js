Meteor.startup(function() {
  OpticalArchive.remove({});

  if (OpticalArchive.find().count() === 0) {
    var docs = [
      {
        docType: 'reference to document.types',
        attachment1: 'allegato (blob)',
        description: 'descrizione',
        acquisitionDate: new Date(),
        user: 'reference to users',
      },
    ];

    docs.forEach(function(doc) {
      OpticalArchive.insert(doc);
    });

    console.log('added', OpticalArchive.find().count(), 'Optical docs.');
  }
});


