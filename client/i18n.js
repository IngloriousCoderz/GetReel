
Meteor.startup(function() {
  TAPi18n.setLanguage('it');
  moment.locale('it');
  $.fn.datepicker.defaults.language = 'it';
  $.fn.datetimepicker.defaults.language = 'it';

  TAPi18n._afterUILanguageChange = function(e) {
    moment.locale(TAPi18n.getLanguage());
    $.fn.datepicker.defaults.language = TAPi18n.getLanguage();
    $.fn.datetimepicker.defaults.language = TAPi18n.getLanguage();
  };
});
