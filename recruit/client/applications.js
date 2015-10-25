Meteor.subscribe('applications');

Template.applications.helpers({
  applications: function() {
    return Applications.find();
  },
});

Template.applications.rendered = function() {
  $('#applications').DataTable();
};
