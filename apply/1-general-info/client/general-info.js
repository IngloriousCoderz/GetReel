Template.applyGeneralInfo.rendered = function() {
  loadFilePicker('ASOqF4I2hQ5O6FgWUBsHLz');

  $('input[type="date"]').each(function(i, elem) {
    $(elem).datepicker({
      autoclose: true,
      format: 'dd/mm/yyyy',
    });
  });

  Shower({
    id: 'generalInfoForm',
    fields: {
      firstname: {
        required: true,
        requiredMessage: 'Hai toppato',
      },

      lastname: {
        required: true,
        requiredMessage: 'Cognome da inserire',
      },
    },

    onSuccess: function(formData, formHandle) {
      /*
      Meteor.call('submit', application, function(error, result) {
        if (error) {
          alert('Have you signed in yet? Please do it now');
        } else {
          Router.go('/apply/success');
        }
      });*/
      var application = Session.get('application');
      application.step = 2;
      Session.set('application', application);

      Shower.Utils.successCallback(formData, formHandle);
    },

    onFailure: function(erroredFields, formHandle) {
      for (id in erroredFields) {
        $('<span>').attr('id', id + '-error').insertAfter($('#' + id));
      }

      Shower.Utils.failureCallback(erroredFields, $(generalInfoForm));
    },
  });
};

Template.applyGeneralInfo.events({
  'change :checkbox#permit': function(e) {
    var hasPermit = $(e.target).prop('checked');
    $(permitKind).val('').attr('disabled', !hasPermit);
  },

  'change :checkbox#sameAddress': function(e) {
    var sameAddress = $(e.target).prop('checked');
    $(currentAddressFieldset).toggleClass('hidden', sameAddress);
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
    application.applicant = Meteor.userId();

    Shower.generalInfoForm.validate(application);
  },
});
