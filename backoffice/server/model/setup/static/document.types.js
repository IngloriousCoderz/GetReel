Meteor.startup(function() {
  DocumentTypes.remove({});

  if (DocumentTypes.find().count() === 0) {
    var types = [
      {name: 'Carta di Identità'},
      {name: 'PASSAPORTO'},
      {name: 'PERMESSO DI SOGGIORNO'},
    ];

    types.forEach(function(type) {
      DocumentTypes.insert(type);
    });
    console.log('added', DocumentTypes.find().count(), 'document types.');
  }
});
