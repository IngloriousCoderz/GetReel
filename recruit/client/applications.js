Meteor.subscribe('regions');
Meteor.subscribe('applications');

Template.applications.helpers({
  settings: function() {
    var mongoFilter = Session.get('mongo-filter');
    console.log('Template.applications.helpers:applications:filter', JSON.stringify(mongoFilter));

    return {
      collection: Applications.find(mongoFilter),
      rowsPerPage: 20,
      showRowCount: true,
      fields: [
        {
          key: 'edit',
          label: function(value) {
            return Spacebars.SafeString('<div class="glyphicon glyphicon-pencil"></div>');
          },

          sortable: false,
          fn: function(value) {
            return Spacebars.SafeString('<a href="#">edit</a>');
          },
        },
        {
          key: 'select',
          label: function(value) {
            return Spacebars.SafeString('<input type="checkbox" />');
          },

          sortable: false,
          cellClass: 'text-center',
          fn: function(value) {
            return Spacebars.SafeString('<input type="checkbox" />');
          },
        },
        {
          key: 'activities',
          label: function(value) {
            return Spacebars.SafeString('<div class="glyphicon glyphicon-list-alt"></div>');
          },
          sortable: false,
          fn: function(value) {
            return Spacebars.SafeString('<a href="#">activities</a>');
          },
        },
        {
          key: 'email',
          label: 'mail',
          fn: function(value) {
            if (typeof value === 'undefined' || value === null || value === '') {
              return null;
            }

            return Spacebars.SafeString('<a href="mailto:' + value + '">email</a>');
          },
        },
        {
          key: 'createdAt',
          label: 'creation date',
          fn: function(value) {
            if (typeof value === 'undefined' || value === null || value === '') {
              return null;
            }

            return value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear();
          },
        },
        {key: 'firstname', label: 'firstname'},
        {key: 'lastname', label: 'lastname'},
        {key: 'age', label: 'age'},
        {key: 'city', label: 'city'},
        {key: 'province', label: 'province'},
        {
          key: 'region',
          label: 'region',
          fn: function(value, object) {
            if (typeof value === 'undefined' || value === null || value === '') {
              return null;
            }

            return Regions.findOne({id: value}).name;
          },
        },//<td>{{regionName region}}</td>
        {key: 'mobile', label: 'mobile'},
        {key: 'experienceAsPhotographer', label: 'experience as a photographer'},
        {key: 'experienceAsOther', label: 'experience as other'},
        {key: 'photo', label: 'photo'},
        {key: 'status.recruiter.username', label: 'recruiter'},
      ],
      showColumnToggles: true,
      noDataTmpl: Template.noDataTemplate,
      class: 'table table-striped table-bordered table-hover table-condensed col-sm-12',
    };
  },

  formatDate: function(date) {
    if (typeof date === 'undefined') {
      return null;
    }

    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  },
});

Template.applications.rendered = function() {
  /*
  var mongoFilter = Session.get('mongo-filter');
  console.log('Template.applications.rendered', JSON.stringify(mongoFilter));
  var applications = Applications.find(mongoFilter, {limit: 10}).fetch();
  console.log(applications);

  $('#applications').dataTable({
    searching: false,
    scrollX: true,
    pagingType: 'full_numbers',
    language: {
      decimal: ',',
      thousands: '.',
    },
    columns: [
      {data: 'edit'},
      {data: 'select'},
      {data: 'activities'},
      {data: 'mail'},
      {data: 'creation date'},
      {data: 'first name'},
      {data: 'last name'},
      {data: 'age'},
      {data: 'city'},
      {data: 'province'},
      {data: 'region'},
      {data: 'mobile'},
      {data: 'experience as photographer'},
      {data: 'experience as other'},
      {data: 'photo'},
      {data: 'recruiter'},
    ],
    data: applications,
  });*/
};
