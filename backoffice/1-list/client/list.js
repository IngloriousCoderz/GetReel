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
