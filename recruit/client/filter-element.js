Template.filterElement.events({
  'change select.filter': function(e) {
    var criterion = e.target.value;
    var $values = $(e.target).parent().siblings('.values');
    switch (criterion) {
      case 'empty':
        $values.hide();
        break;
      case 'eq':
      case 'gt':
      case 'lt':
        $values.show();
        $values.children('.value').show();
        $values.children('.from').hide();
        $values.children('.to').hide();
        break;
      case 'between':
        $values.show();
        $values.children('.value').hide();
        $values.children('.from').show();
        $values.children('.to').show();
    }
  },
});

Template.filter.rendered = function() {
  this.$('.filter').change();
};
