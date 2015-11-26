Meteor.subscribe('recruitments');
Meteor.subscribe('regions');

Template.recruitments.helpers({
  settings: function() {
    return {
      collection: 'reactiveRecruitments',
      rowsPerPage: 20,
      showFilter: false,
      showRowCount: true,
      showNavigationRowsPerPage: true,
      showColumnToggles: false,
      noDataTmpl: Template.noDataTemplate,
      class: 'table table-striped table-hover table-condensed',
      filters: [
        'stage',
        'createdAt',
        'recruiter',
        'firstname',
        'lastname',
        'age',
        'mobile',
        'outcome',
        'region',
      ],
      fields: [{
        key: 'edit',
        sortable: false,
        headerClass: 'text-center',
        cellClass: 'text-center',
        label: function(value) {
          return Spacebars.SafeString('<div class="glyphicon glyphicon-pencil"></div>');
        },

        fn: function(value) {
          return Spacebars.SafeString('<a href="#" role="button">edit</a>');
        },
      }, {
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
      }, {
        key: 'activities',
        sortable: false,
        headerClass: 'text-center',
        cellClass: 'text-center',
        label: function(value) {
          return Spacebars.SafeString('<div class="glyphicon glyphicon-list"></div>');
        },

        fn: function(value) {
          return Spacebars.SafeString('<a href="#" role="button">activities</a>');
        },
      }, {
        key: 'application.email',
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
      }, {
        key: 'createdAt',
        sortDirection: 'descending',
        label: 'creation date',
        headerClass: 'text-center',
        cellClass: 'text-center',
        fn: function(value) {
          if (typeof value === 'undefined' || value === null || value === '') {
            return null;
          }

          return moment(value).format('L');
        },
      }, {
        key: 'application.firstname',
        label: 'firstname'
      }, {
        key: 'application.lastname',
        label: 'lastname'
      }, {
        key: 'application.age',
        label: 'age',
        cellClass: 'text-right'
      }, {
        key: 'application.city',
        label: 'city'
      }, {
        key: 'application.province',
        label: 'province'
      }, {
        key: 'application.region',
        label: 'region',
        fn: function(value) {
          if (typeof value === 'undefined' || value === null || value === '') {
            return null;
          }

          return Regions.findOne({
            id: value
          }).name;
        },
      }, {
        key: 'application.mobile',
        label: 'mobile'
      }, {
        key: 'application.experienceAsPhotographer',
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
      }, {
        key: 'application.experienceAsOther',
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
      }, {
        key: 'application.photo',
        label: 'photo'
      }, {
        key: 'stages.current.recruiter',
        label: 'recruiter',
        fn: function(value) {
          if (typeof value === 'undefined' || value === null || value === '') {
            return null;
          }

          return Meteor.users.findOne({
            _id: value
          }, {
            fields: {
              username: 1
            }
          }).username;
        },
      }],
    };
  },
});

Template.recruitments.events({
  'change #select-all': function(e) {
    $('.select').prop('checked', $(e.target).prop('checked'));
  },

  'recruitment:delete .reactive-table tr': function(e) {
    Recruitments.remove({
      _id: this._id
    });
  }
});
