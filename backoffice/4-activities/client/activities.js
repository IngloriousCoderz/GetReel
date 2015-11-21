Meteor.subscribe('activities');
Meteor.subscribe('contactTypes');
Meteor.subscribe('activityOutcomes');

Template.activities.helpers({
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

            return moment(value).format('L');
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

            return moment(value).format('L');
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

  'click #delete-selected': function(e) {
    BootstrapModalPrompt.prompt({
      title: 'Warning',
      content: 'Are you sure you want to delete these items?',
    }, function (result) {
      if (result) {
        $('.reactive-table tr').each(function(i, item) {
          $item = $(item);
          if ($item.find('.select').prop('checked')) {
            $item.trigger('activity:delete');
          }
        });
      }
    });
  },

  'activity:delete .reactive-table tr': function(e) {
    Activities.remove({_id: this._id});
  }
});
