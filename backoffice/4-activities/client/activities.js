Meteor.subscribe('activities');

Template.activities.helpers({
  settings: function() {
    return {
      collection: Activities.find(),
      rowsPerPage: 20,
      showFilter: false,
      showRowCount: true,
      showNavigationRowsPerPage: true,
      showColumnToggles: false,
      noDataTmpl: Template.noDataTemplate,
      class: 'table table-striped table-hover table-condensed col-sm-12',
      filters: [],
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
        // {
        //   key: 'editInline',
        //   sortable: false,
        //   headerClass: 'text-center',
        //   cellClass: 'text-center',
        //   label: function(value) {
        //     return Spacebars.SafeString('<div class="glyphicon glyphicon-pencil"></div>');
        //   },
        //
        //   fn: function(value) {
        //     return Spacebars.SafeString('<a href="#">edit<br>inline</a>');
        //   },
        // },
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
        {key: 'application.lastname', label: 'lastname'},
        {key: 'application.firstname', label: 'firstname'},
        {key: 'createdBy', label: 'created by'},
        {key: 'application.phase', label: 'phase', cellClass: 'text-right'},
        {key: 'contactType', label: 'contact type'},
        {key: 'outcome', label: 'outcome'},
        {key: 'notes', label: 'notes'},
        {
          key: 'deadline',
          label: 'deadline',
          headerClass: 'text-center',
          cellClass: 'text-center',
          fn: function(value) {
            if (typeof value === 'undefined' || value === null || value === '') {
              return null;
            }

            return value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear();
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
      ],
    };
  },
});

Template.activities.events({
  'change #select-all': function(e) {
    $('.select').prop('checked', $(e.target).prop('checked'));
  },
});
