Meteor.startup(function() {
  Referrers.remove({});

  if (Referrers.find().count() === 0) {
    var referrers = [
      {name: 'Sito Il Gruppo Digitale'},
      {name: 'Eures'},
      {name: 'Fiera io lavoro Torino'},
      {name: 'In Villaggio'},
      {name: 'Vivastreet'},
      {name: 'Internet Non ricordo'},
      {name: 'Facebook'},
      {name: 'Bacheche scolastiche'},
      {name: 'BARI 2013 - FIERA LAVORO TURISMO'},
      {name: 'Fiera'},
      {name: 'Bakeca'},
      {name: 'Kijiji'},
      {name: 'QUINTA COLONNA RETE4'},
      {name: 'NIKON SCHOOL'},
    ];

    referrers.forEach(function(referrer) {
      Referrers.insert(referrer);
    });

    console.log('added', Referrers.find().count(), 'referrers.');
  }
});
