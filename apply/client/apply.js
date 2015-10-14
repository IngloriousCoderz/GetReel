Meteor.subscribe('availableJobs');

Session.set('showUpload', true);

Template.Apply.helpers({
  webrtc: Modernizr.getUserMedia,
  availableJobs: function() {
    return Jobs.find();
  },
  showUpload: function() {
    return Session.get('showUpload');
  }
});

Template.Apply.events({
  'change input[name="video-type"]': function(e) {
    Session.set('showUpload', e.target.value === 'file');
  },

  'submit form': function(e) {
    e.preventDefault();
    var form = e.target;
    var application = {
      createdAt: new Date(),
      applicant: Meteor.userId(),
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      job: form.job.value,
      resume: form.resume.value,
      videofile: form.videofile.value,
      videolink: form.videolink.value
    };

    /* TODO: form validation */
    /*for (name in args) {
      var arg = args[name];
      if (arg === undefined || arg === null || arg === '') {
        alert('Please fill in all form values');
        return;
      }
    };*/

    Meteor.call('submit', application, function(error, result) {
      if (error) {
        alert('Have you signed in yet? Please do it now');
      } else {
        Router.go('/apply/success');
      }
    });
  }
});
