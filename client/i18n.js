Meteor.startup(function() {
  TAPi18n.setLanguage('it');
  $.fn.datepicker.defaults.language = 'it';

  TAPi18n._afterUILanguageChange = function() {
    $.fn.datepicker.defaults.language = TAPi18n.getLanguage();
  };
});
