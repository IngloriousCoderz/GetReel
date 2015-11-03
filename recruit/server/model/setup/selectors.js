Meteor.startup(function() {
  Selectors.remove({});
  if (Selectors.find().count() === 0) {
    var selectors = [
      {title: 'Select a job position...'},
      {title: 'Haiti Village Photographer'},
      {title: 'Rapallo On The Beach'},
    ];
    selectors.forEach(function(selector) {
      Selectors.insert(selector);
    });
    console.log("added ", Selectors.find().count(), "selectors.");
  }
});
