Template.filterElement.helpers({
  isString: function() {
    return typeof this.type === 'undefined' || this.type === 'text';
  },

  comparable: function() {
    return ['number', 'date'].indexOf(this.type) >= 0;
  },
});

Template.filterElement.events({
  'change select.filter': function(e) {
    var criterion = e.target.value;
    var $values = $(e.target).parents('.options').siblings('.values');
    switch (criterion) {
      case 'empty':
        $values.hide();
        // $values.toggleClass('hidden');
        break;
      case 'eq':
      case 'contains':
      case 'startswith':
      case 'endswith':
      case 'gt':
      case 'lt':
        $values.show();
        $values.children('.value').show();
        console.log($values.children('.from'));
        $values.children('.from').hide();
        $values.children('.to').hide();
        // $values.children('.value').toggleClass('hidden');
        // $values.children('.from').toggleClass('hidden');
        // $values.children('.to').toggleClass('hidden');
        break;
      case 'between':
        $values.show();
        $values.children('.value').hide();
        $values.children('.from').show();
        $values.children('.to').show();
        // $values.children('.value').toggleClass('hidden');
        // $values.children('.from').toggleClass('hidden');
        // $values.children('.to').toggleClass('hidden');
        break;
    }
  },
});

Template.filter.rendered = function() {
  this.$('select.filter').change();
};
