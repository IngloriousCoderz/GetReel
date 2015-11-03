Template.generalInfoStep.onRendered(function() {
  loadFilePicker('ASOqF4I2hQ5O6FgWUBsHLz');
  /*  var elem = document.querySelector('.js-switch');
  var init = new Switchery(elem, {size: 'small', color: '#337ab7'});
*/
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  elems.forEach(function(html) {
    var switchery = new Switchery(html, {size: 'small', color: '#337ab7'});
  });
});

Template.generalInfoStep.events({

  'click :checkbox#permit': function(e) {
    var hasPermit = $(e.target).prop('checked');
    $(permit).val(hasPermit);
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
      application = Session.get('application');
      application.resume = InkBlob.url;
      Session.set('application', application);
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
      application = Session.get('application');
      application.videofile = InkBlob.url;
      Session.set('application', application);
    });
  },

  'submit #generalInfoForm': function(e) {
    e.preventDefault();

    application = Session.get('application');
    application.createdAt = new Date();

    check(ApplicationSchema.clean(application), ApplicationSchema);

    application.step = 2;
    Session.set('application', application);
    $('#steps li:eq(' + (application.step - 1) + ') a').tab('show');
  },
});
