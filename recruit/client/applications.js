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
          sortable: false,
          label: function(value) {
            return Spacebars.SafeString('<div class="glyphicon glyphicon-pencil"></div>');
          },

          fn: function(value) {
            return Spacebars.SafeString('<a href="#">edit</a>');
          },
        },
        {
          key: 'select',
          sortable: false,
          cellClass: 'text-center',

          label: function(value) {
            return Spacebars.SafeString('<input id="select-all" type="checkbox" />');
          },

          fn: function(value) {
            return Spacebars.SafeString('<input class="select" type="checkbox" />');
          },
        },
        {
          key: 'activities',
          sortable: false,
          label: function(value) {
            return Spacebars.SafeString('<div class="glyphicon glyphicon-list-alt"></div>');
          },

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
        },
        {key: 'mobile', label: 'mobile'},
        {key: 'experienceAsPhotographer', label: 'experience as a photographer'},
        {key: 'experienceAsOther', label: 'experience as other'},
        {key: 'photo', label: 'photo'},
        {key: 'status.recruiter.username', label: 'recruiter'},
      ],
      showColumnToggles: true,
      noDataTmpl: Template.noDataTemplate,
      class: 'table table-striped table-hover table-condensed col-sm-12',
    };
  },
});

Template.applications.events({
  'change #select-all': function(e) {
    $('.select').prop('checked', $(e.target).prop('checked'));
  },
});
