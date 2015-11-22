Template.list.events({
  'click #delete-selected': function(e) {
    BootstrapModalPrompt.prompt({
      title: 'Warning',
      content: 'Are you sure you want to delete these items?',
    }, function (result) {
      if (result) {
        $('.reactive-table tr').each(function(i, item) {
          $item = $(item);
          if ($item.find('.select').prop('checked')) {
            $item.trigger('application:delete');
          }
        });
      }
    });
  },
});

Template.phaseFilter.onRendered(function() {
  this.filter = new ReactiveTable.Filter('phase', ['phases.current.id']);
  $('#phase-filter li > a:first').click();
});

Template.phaseFilter.events({
  'click #phase-filter li > a': function(event, template) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    $target.closest('.btn-group').find('[data-bind="label"]').text($target.text());

    var value = $target.data('phase');
    if (value !== '' && value <= 5) {
      value = {$eq: value};
    } else {
      value = '';
    }
    template.filter.set(value);
  },
});
