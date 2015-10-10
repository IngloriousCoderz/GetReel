Jobs = new Mongo.Collection('jobs'); //both on client and server
Applications = new Mongo.Collection('applications');

Template.body.helpers({
  webrtc: Modernizr.getUserMedia,
  showUpload: function() {
    return Session.get('showUpload');
  }
});

Template.body.helpers({
  jobs: function() {
    return Jobs.find({});
  }
});

Session.set('showUpload', true);

Template.body.events({
  'change input[name="video-type"]': function(e) {
    Session.set('showUpload', e.target.value === 'file');
  },

  'submit form': function(e) {
    e.preventDefault();
    var form = e.target;
    var args = {
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      job: form.job.value,
      resume: form.resume.value,
      videofile: form.videofile.value,
      videolink: form.videolink.value
    };
    Meteor.call('apply', args);
  }
});
