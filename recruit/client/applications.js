Meteor.subscribe('regions');
Meteor.subscribe('applications');

Template.applications.helpers({
  applications: function() {
    return Applications.find({}, {limit: 10});
  },

  formatDate: function(date) {
    if (typeof date === 'undefined') {
      return null;
    }

    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  },

  regionName: function(id) {
    if (typeof id === 'undefined') {
      return null;
    }

    return Regions.findOne({id: id}).name;
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
