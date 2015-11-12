Meteor.subscribe('regions');
Meteor.subscribe('applications');

Template.applications.helpers({
  settings: function() {
    return {
      collection: 'filterableApplications',
      rowsPerPage: 20,
      showFilter: false,
      showRowCount: true,
      showNavigationRowsPerPage: true,
      showColumnToggles: false,
      noDataTmpl: Template.noDataTemplate,
      class: 'table table-striped table-hover table-condensed col-sm-12',
      filters: [
        'createdAt',
        'recruiter',
        'firstname',
        'lastname',
        'age',
        'mobile',
        'status',
        'region',
      ],
      fields: [
        {
          key: 'edit',
          sortable: false,
          headerClass: 'text-center',
          cellClass: 'text-center',
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
          headerClass: 'text-center',
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
          headerClass: 'text-center',
          cellClass: 'text-center',
          label: function(value) {
            return Spacebars.SafeString('<div class="glyphicon glyphicon-list"></div>');
          },

          fn: function(value) {
            return Spacebars.SafeString('<a href="#">activities</a>');
          },
        },
        {
          key: 'email',
          sortable: false,
          headerClass: 'text-center',
          cellClass: 'text-center',
          label: function(value) {
            return Spacebars.SafeString('<div class="glyphicon glyphicon-envelope"></div>');
          },

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
          headerClass: 'text-center',
          cellClass: 'text-center',
          fn: function(value) {
            if (typeof value === 'undefined' || value === null || value === '') {
              return null;
            }

            return value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear();
          },
        },
        {key: 'firstname', label: 'firstname'},
        {key: 'lastname', label: 'lastname'},
        {key: 'age', label: 'age', cellClass: 'text-right'},
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
        {
          key: 'experienceAsPhotographer',
          headerClass: 'text-center',
          cellClass: 'text-center',
          label: function() {
            return Spacebars.SafeString('experience as<br>a photographer');
          },

          fn: function(value) {
            var glyphicon = 'glyphicon glyphicon-remove';
            if (value) {
              glyphicon = 'glyphicon glyphicon-ok';
            }

            return Spacebars.SafeString('<div class="' + glyphicon + '"></div>');
          },
        },
        {
          key: 'experienceAsOther',
          headerClass: 'text-center',
          cellClass: 'text-center',
          label: function() {
            return Spacebars.SafeString('experience<br>as other');
          },

          fn: function(value) {
            var glyphicon = 'glyphicon glyphicon-remove';
            if (value) {
              glyphicon = 'glyphicon glyphicon-ok';
            }

            return Spacebars.SafeString('<div class="' + glyphicon + '"></div>');
          },
        },
        {key: 'photo', label: 'photo'},
        {
          key: 'phases.current',
          label: 'recruiter',
          fn: function(value, object) {
            if (object.phases.current === 0) {
              return null;
            }

            return object.phases.list[object.phases.current].recruiter.username;
          },
        },
      ],
    };
  },
});

Template.applications.events({
  'change #select-all': function(e) {
    $('.select').prop('checked', $(e.target).prop('checked'));
  },
});
