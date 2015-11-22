Template.filterElement.onRendered(function() {
  var name = this.data.name;
  var attrName = this.data.attrName;
  this.filter = new ReactiveTable.Filter(name, [attrName || name]);
  this.$('input[type="date"]').each(function(i, item) {
    var $input = $(item);
    $input.attr('type', 'text').datepicker({format: 'dd/mm/yyyy'});
    $input.siblings('#' + $input.attr('id') + '-btn').on('click', function() {
      $input.datepicker('show');
    });
  });
});

Template.filterElement.helpers({
  isSelect: function() {
    return this.type === 'select';
  },

  buildOptions: function() {
    var $options, options;
    $options = $('<div>');
    options = _.isArray(this.options) ? this.options : this.options.fetch();
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      $options.append('<option value="' + option[this.valueField] + '">' + option[this.descriptionField] + '</option>');
    }
    return Spacebars.SafeString($options.html());
  },

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
    $values.children(':visible').find(':input').change();
  },

  'change:all select.filter': function(e) {
    var op = e.target.value;
    var $values = $(e.target).parents('.options').siblings('.values');
    toggleValues(op, $values, true);
  },

  'change select.filter': function(e) {
    var op = e.target.value;
    var $values = $(e.target).parents('.options').siblings('.values');
    toggleValues(op, $values);
  },

  'keyup .value input, change .value :input': function(event, template) {
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
    var value = '';
    var from = cleanInput($('#' + this.name + '-from').val(), this.type);
    var to = cleanInput($('#' + this.name + '-to').val(), this.type);
    var not = $('#' + this.name + '-not').prop('checked');

    if (from !== '' && to !== '') {
      value = {$gte: from, $lt: to};
    }

    if (value !== '' && not) {
      value = {$not: value};
    }

    template.filter.set(value);
  },
});

var toggleValues = function(op, $values, massive) {
  switch (op) {
    case 'empty':
      $values.hide();
      $values.find(':input').val('').change();
      break;
    case 'eq':
    case 'contains':
    case 'startswith':
    case 'endswith':
    case 'gt':
    case 'lt':
      $values.show();
      $values.children('.value').show();
      if (!massive) {
          $values.children('.value').find(':input').change();
      }
      $values.children('.range').hide().find(':input').val('');
      break;
    case 'between':
      $values.show();
      $values.children('.value').hide().find(':input').val('');
      if (!massive) {
        $values.children('.range').show().find(':input').change();
      }
      break;
  }
};

var cleanInput = function(value, type) {
  if (type === 'select') {
    if (value !== '' && !isNaN(value)) {
      value = parseInt(value, 10);
    }
  } else if (type === 'number') {
    value = parseInt(value, 10);
    if (isNaN(value)) {
      value = '';
    }
  } else if (type === 'date') {
    value = value.split('/');
    value = new Date(value[2] + '/' + value[1] + '/' + value[0]);
    if (isNaN(value.getTime())) {
      value = '';
    }
  }
  return value;
};
