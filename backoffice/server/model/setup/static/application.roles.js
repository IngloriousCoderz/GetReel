Meteor.startup(function() {
  ApplicationRoles.remove({});

  if (ApplicationRoles.find().count() === 0) {
    var roles = [
      {title: 'Riserve'},
      {title: 'Fotografi'},
      {title: 'Responsabile'},
      {title: 'Supervisore'},
      {title: 'Fotografi non disponibili'},
      {title: 'Responsabili non disponibili'},
      {title: 'Fotografi & Responsabili Disp. Limitata'},
      {title: 'Fotografi Blacklist'},
    ];

    roles.forEach(function(role) {
      ApplicationRoles.insert(role);
    });

    console.log('added', ApplicationRoles.find().count(), 'application roles.');
  }
});
