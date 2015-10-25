Meteor.subscribe('applications');

Template.applications.helpers({
  applications: function() {
    return Applications.find();
  },
});

Template.applications.rendered = function() {
  $('#applications').dataTable({
    searching: false,
    scrollX: true,
    pagingType: 'full_numbers',
    language: {
      decimal: ',',
      thousands: '.',
    },
  });
};
