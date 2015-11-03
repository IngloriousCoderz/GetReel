Meteor.startup(function() {
  Seasons.remove({});
  if (Seasons.find().count() === 0) {
    var seasons = [
      {name: 'ESTATE 2013'},
      {name: 'INVERNO 2013/2014'},
      {name: 'ESTATE 2014'},
      {name: 'INVERNO 2012/2013'},
      {name: 'IGV SANTA GIUSTA'},
      {name: 'INVERNO 2012/2013'},
      {name: 'INVERNO 2014-15'},
      {name: 'ESTATE 2015'},
    ];
    seasons.forEach(function(season) {
      Seasons.insert(season);
    });
    console.log("added ", Seasons.find().count(), "season.");
  }
});
