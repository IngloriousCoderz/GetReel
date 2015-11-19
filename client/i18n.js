Meteor.startup(function() {
  TAPi18n.setLanguage('it');
  loadFilePicker('ASOqF4I2hQ5O6FgWUBsHLz');
  GoogleMaps.load({
    key: 'AIzaSyAwmYRqqPG0EH9nZ_NIasHUxD3k8LKPbtU',
    libraries: 'places',
  });
});
