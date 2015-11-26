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
            $item.trigger('recruitment:delete');
          }
        });
      }
    });
  },
});

Template.stageFilter.onRendered(function() {
  this.filter = new ReactiveTable.Filter('stage', ['stages.current.id']);
  $('#stage-filter li > a:first').click();
});

Template.stageFilter.events({
  'click #stage-filter li > a': function(event, template) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    $target.closest('.btn-group').find('[data-bind="label"]').text($target.text());

    var value = $target.data('stage');
    if (value !== '' && value <= 5) {
      value = {$eq: value};
    } else {
      value = '';
    }
    template.filter.set(value);
  },
});
