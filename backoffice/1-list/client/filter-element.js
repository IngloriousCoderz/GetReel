Template.filterElement.onRendered(function() {
  var name = this.$('.value input').attr('id');
  this.filter = new ReactiveTable.Filter(name, [name]);
  this.$('input[type="date"]').each(function(i, item) {
    $(item).attr('type', 'text').datepicker({format: 'dd/mm/yyyy'});
  });
});

Template.filter.onRendered(function() {
  this.$('select.filter').change();
});

Template.filterElement.helpers({
  isDate: function() {
    return this.type === 'date';
  },

  isString: function() {
    return typeof this.type === 'undefined' || this.type === 'text';
  },

  isComparable: function() {
    return ['number', 'date'].indexOf(this.type) >= 0;
  },
});

Template.filterElement.events({
  'change :checkbox.not': function(e) {
    var $values = $(e.target).parents('.options').siblings('.values');
    $values.children(':visible').find('input').change();
  },

  'change select.filter': function(e) {
    var op = e.target.value;
    var $values = $(e.target).parents('.options').siblings('.values');

    switch (op) {
      case 'empty':
        $values.hide();
        $values.find('input').val('').change();
        break;
      case 'eq':
      case 'contains':
      case 'startswith':
      case 'endswith':
      case 'gt':
      case 'lt':
        $values.show();
        $values.children('.value').show().find('input').change();
        $values.children('.range').hide().find('input').val('');
        break;
      case 'between':
        $values.show();
        $values.children('.value').hide().find('input').val('');
        $values.children('.range').show().find('input').change();
        break;
    }
  },

  'keyup .value input, change .value input': function(event, template) {
    var value = cleanInput($(event.target).val(), this.type);
    var op = $('#' + this.name + '-op').val();
    var not = $('#' + this.name + '-not').prop('checked');

    if (value !== '') {
      if (op === 'empty') {
        value = {$exists: false};
      } else if (op === 'eq') {
        if (this.type === 'date') {
          var dayAfter = new Date(value);
          dayAfter.setDate(value.getDate() + 1);
          value = {$gte: value, $lt: dayAfter};
        } else {
          value = {$eq: value};
        }
      } else if (op === 'contains') {
        value = {$regex: value, $options: 'i'};
      } else if (op === 'startswith') {
        value = {$regex: '^' + value, $options: 'i'};
      } else if (op === 'endswith') {
        value = {$regex: value + '$', $options: 'i'};
      } else if (op === 'lt') {
        value = {$lt: value};
      } else if (op === 'gt') {
        value = {$gt: value};
      } else {
        value = '';
      }
    }

    if (value !== '' && not) {
      value = {$not: value};
    }

    template.filter.set(value);
  },

  'keyup .range input, change .range input': function(event, template) {
    var from = cleanInput($('#' + this.name + '-from').val(), this.type);
    var to = cleanInput($('#' + this.name + '-to').val(), this.type);
    var not = $('#' + this.name + '-not').prop('checked');

    var value = '';
    if (from !== '' && to !== '') {
      value = {$gte: from, $lt: to};
    }

    if (value !== '' && not) {
      value = {$not: value};
    }

    template.filter.set(value);
  },
});

var cleanInput = function(value, type) {
  if (type === 'number') {
    value = parseInt(value, 10);
    if (_.isNaN(value)) {
      value = '';
    }
  } else if (type === 'date') {
    value = value.split('/');
    value = new Date(value[2] + '/' + value[1] + '/' + value[0]);
    if (_.isNaN(value.getTime())) {
      value = '';
    }
  }
  return value;
};
