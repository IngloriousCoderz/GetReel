Template.filterElement.onRendered(function() {
  var name = this.$('.value input').attr('id');
  this.filter = new ReactiveTable.Filter(name, [name]);
});

Template.filterElement.helpers({
  isString: function() {
    return typeof this.type === 'undefined' || this.type === 'text';
  },

  isComparable: function() {
    return ['number', 'date'].indexOf(this.type) >= 0;
  },
});

Template.filterElement.events({
  'change select.filter': function(e) {
    var op = e.target.value;
    var $values = $(e.target).parents('.options').siblings('.values');

    switch (op) {
      case 'empty':
        $values.hide();
        $values.find('input').val('');
        break;
      case 'eq':
      case 'contains':
      case 'startswith':
      case 'endswith':
      case 'gt':
      case 'lt':
        $values.show();
        $values.children('.value').show();
        $values.children('.from').hide().children('input').val('');
        $values.children('.to').hide().children('input').val('');
        break;
      case 'between':
        $values.show();
        $values.children('.value').hide().children('input').val('');
        $values.children('.from').show();
        $values.children('.to').show();
        break;
    }
  },

  'keyup .value input, input .value input': function(event, template) {
    var value = $(event.target).val();
    if (this.type === 'number') {
      value = parseInt(value, 10);
      if (!_.isNaN(value)) {
        template.filter.set({$eq: value});
      } else {
        template.filter.set('');
      }
    } else if (this.type === 'date') {
      value = new Date(value);
      if (!_.isNaN(value.getTime())) {
        var dayAfter = new Date();
        dayAfter.setDate(value.getDate() + 1);
        template.filter.set({$gte: value, $lt: dayAfter});
      } else {
        template.filter.set('');
      }
    } else {
      template.filter.set(value);
    }
  },
});

Template.filter.onRendered(function() {
  this.$('select.filter').change();
});
