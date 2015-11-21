Meteor.subscribe('activities');
Meteor.subscribe('contactTypes');
Meteor.subscribe('activityOutcomes');

Template.activities.helpers({
  schema: function() {
    return ActivitySchema;
  },

  settings: function() {
    return {
      collection: 'reactiveActivities',
      rowsPerPage: 20,
      showFilter: false,
      showRowCount: true,
      showNavigationRowsPerPage: true,
      showColumnToggles: false,
      noDataTmpl: Template.noDataTemplate,
      class: 'table table-striped table-hover table-condensed',
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

          tmpl: Template.editActivity,
          // fn: function(value) {
          //   return Spacebars.SafeString('{{#afModal collection="Activities" operation="update" doc=_id}}edit{{/afModal}}');
          // },
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
        {key: 'lastname', label: 'lastname'},
        {key: 'firstname', label: 'firstname'},
        {key: 'createdBy', label: 'created by'},
        {key: 'phase', label: 'phase', cellClass: 'text-right'},
        {
          key: 'contactType',
          label: 'contact type',
          fn: function(value) {
            if (typeof value === 'undefined' || value === null || value === '') {
              return null;
            }

            return ContactTypes.findOne({_id: value}).name;
          }
        },
        {
          key: 'outcome',
          label: 'outcome',
          fn: function(value) {
            if (typeof value === 'undefined' || value === null || value === '') {
              return null;
            }

            return ActivityOutcomes.findOne({id: value}).name;
          }
        },
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
