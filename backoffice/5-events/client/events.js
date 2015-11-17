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

          fn: function(value) {
            return Spacebars.SafeString('<a href="#" role="button">edit</a>');
          },
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

            return value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear() + ' ' + value.getHours() + ':' + value.getMinutes();
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

            return value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear() + ' ' + value.getHours() + ':' + value.getMinutes();
          },
        },
        {key: 'location', label: 'location'},
        {key: 'phase', label: 'phase', cellClass: 'text-right'},
      ],
    };
  },
});

Template.eventz.events({
  'change #select-all': function(e) {
    $('.select').prop('checked', $(e.target).prop('checked'));
  },
});
