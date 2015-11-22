Meteor.subscribe('availableJobs');

Template.generalInfoStep.onRendered(function() {
  loadFilePicker('ASOqF4I2hQ5O6FgWUBsHLz');

  if ($('input[type=\'filepicker-dragdrop\']')) {
    $('input[type=\'filepicker-dragdrop\']').each(function(i, e) {
      if ($(e).css('display') != 'none') {
        filepicker.constructWidget(e);
      }
    });
  };
/*
  this.autorun(function() {
    if (GoogleMaps.loaded()) {
      $('findAddress').geocomplete({
        details: 'form',
      });
    }
  });
*/
this.autorun(function() {
  if (GoogleMaps.loaded()) {
    $(findAddress).geocomplete({
      details: '.address',
    });
  }
});






  var data = this.data.step.data();
  var hasPermit;
  var hasSameAddress;
  var hasPassport;
  if (typeof data !== 'undefined') {
    hasPermit = data.permit;
    hasSameAddress = data.sameAddress;
    hasPassport = data.passport;
  }

  $(permit).prop('checked', typeof hasPermit !== 'undefined' ? hasPermit : true);
  $(sameAddress).prop('checked', typeof hasSameAddress !== 'undefined' ? hasSameAddress : true);
  $(passport).prop('checked', typeof hasPassport !== 'undefined' ? hasPassport : true);

  this.$('.js-switch').each(function(i, html) {
    var switchery = new Switchery(html, {size: 'small', color: '#337ab7'});
  });

  $(':checkbox').change();
});

Template.generalInfoStep.helpers({
  availableJobs: function() {
    return Jobs.find();
  },
});

Template.generalInfoStep.events({
  'change :checkbox#permit': function(e) {
    var hasPermit = $(e.target).prop('checked');
    if (hasPermit === false) {
      $(permitKind).val('').attr('disabled', !hasPermit);
    } else {
      $(permitKind).attr('disabled', !hasPermit);
    }
  },

  'change :checkbox#sameAddress': function(e) {
    var sameAddress = $(e.target).prop('checked');
    $(currentAddressFieldset).toggleClass('hidden', sameAddress);
  },

  'change :checkbox#passport': function(e) {
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
