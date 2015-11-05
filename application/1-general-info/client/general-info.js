Meteor.subscribe('availableJobs');

Template.generalInfoStep.onRendered(function() {
  loadFilePicker('ASOqF4I2hQ5O6FgWUBsHLz');

  this.$('.js-switch').each(function(i, html) {
    var switchery = new Switchery(html, {size: 'small', color: '#337ab7'});
    $(permit).prop('checked', true);
    $(sameAddress).prop('checked', false);
    $(passport).prop('checked', true);
  });
});

Template.generalInfoStep.helpers({
  availableJobs: function() {
    return Jobs.find();
  },
});

Template.generalInfoStep.events({
  'click :checkbox#permit': function(e) {
    var hasPermit = $(e.target).prop('checked');
    $(permitKind).val('').attr('disabled', !hasPermit);
  },

  'click :checkbox#sameAddress': function(e) {
    var sameAddress = $(e.target).prop('checked');
    $(currentAddressFieldset).toggleClass('hidden', sameAddress);
  },

  'click :checkbox#passport': function(e) {
    var hasPassport = $(e.target).prop('checked');
    $(passportFieldset).toggleClass('hidden', !hasPassport);
  },

  'click #resume': function(e) {
    filepicker.pick({
      mimetypes: [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
      ],
      maxSize: 10 * 1024 * 1024,
      multiple: false,
    }, function(InkBlob) {
      Session.set('resume', InkBlob.url);
    });
  },

  'click #showreel': function(e) {
    filepicker.pick({
      mimetypes: [
        'video/mp4',
        'video/3gpp',
        'video/quicktime',
        'video/x-msvideo',
        'video/x-ms-wmv',
      ],
      maxSize: 10 * 1024 * 1024,
      multiple: false,
    }, function(InkBlob) {
      Session.set('videofile', InkBlob.url);
    });
  },
});
