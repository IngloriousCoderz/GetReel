Meteor.startup(function() {
  ApplicationRoles.remove({});

  if (ApplicationRoles.find().count() === 0) {
    var roles = [
      {name: 'Riserve'},
      {name: 'Fotografi'},
      {name: 'Responsabile'},
      {name: 'Supervisore'},
      {name: 'Fotografi non disponibili'},
      {name: 'Responsabili non disponibili'},
      {name: 'Fotografi & Responsabili Disp. Limitata'},
      {name: 'Fotografi Blacklist'},
    ];

    roles.forEach(function(role) {
      ApplicationRoles.insert(role);
    });

    console.log('added', ApplicationRoles.find().count(), 'application roles.');
  }
});
