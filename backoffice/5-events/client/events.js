Meteor.subscribe('events');
Meteor.subscribe('locations');

Template.eventz.helpers({
  settings: function() {
    return {
      collection: 'reactiveEvents',
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

          tmpl: Template.editEvent,
        },
        {
          key: 'details',
          sortable: false,
          headerClass: 'text-center',
          cellClass: 'text-center',
          label: function(value) {
            return Spacebars.SafeString('<div class="glyphicon glyphicon-search"></div>');
          },

          fn: function(value) {
            return Spacebars.SafeString('<a href="#" role="button">details</a>');
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
        {key: 'name', label: 'event name'},
        {
          key: 'from',
          label: 'from',
          headerClass: 'text-center',
          cellClass: 'text-center',
          fn: function(value) {
            if (typeof value === 'undefined' || value === null || value === '') {
              return null;
            }

            return moment(value).format('L LT');
          },
        },
        {
          key: 'to',
          label: 'to',
          headerClass: 'text-center',
          cellClass: 'text-center',
          fn: function(value) {
            if (typeof value === 'undefined' || value === null || value === '') {
              return null;
            }

            return moment(value).format('L LT');
          },
        },
        {
          key: 'location',
          label: 'location',
          fn: function(value) {
            if (typeof value === 'undefined' || value === null || value === '') {
              return null;
            }

            return Locations.findOne({_id: value}).name;
          },
        },
        {key: 'phase', label: 'phase', cellClass: 'text-right'},
      ],
    };
  },
});

Template.eventz.events({
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
            $item.trigger('event:delete');
          }
        });
      }
    });
  },

  'event:delete .reactive-table tr': function(e) {
    Events.remove({_id: this._id});
  }
});
