Meteor.subscribe('referrers');
Meteor.subscribe('applications');
Meteor.subscribe('regions');

var currentChart;
var monthNames = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];

function howDoYouKnowUs(query) {
  var data = [];
  var cursor = Referrers.find();
  var colors = chroma.scale('Spectral').colors(cursor.count());
  var i = 0;
  cursor.forEach(function(referrer) {
    var color = chroma(colors[i]);
    query.referrer = referrer._id;
    data.push({
      value: Applications.find(query).count(),
      label: referrer.name,
      color: color,
      highlight: color.brighten(),
    });
    i++;
  });

  currentChart = new Chart(chart.getContext('2d')).Pie(data);
}

function ages(query) {
  var minAge = Applications.findOne({}, {sort: {age: 1}}).age;
  var maxAge = Applications.findOne({}, {sort: {age: -1}}).age;

  var ages = [];
  for (var i = minAge; i <= maxAge; i++) {
    ages.push(i);
  }

  var data = {
    labels: ages,
    datasets: [
      {
        fillColor: 'rgba(151,187,205,0.5)',
        strokeColor: 'rgba(151,187,205,0.8)',
        highlightFill: 'rgba(151,187,205,0.75)',
        highlightStroke: 'rgba(151,187,205,1)',
        data: [],
      },
    ],
  };

  for (var i = 0; i < ages.length; i++) {
    query.age = ages[i];
    data.datasets[0].data.push(Applications.find(query).count());
  }

  currentChart = new Chart(chart.getContext('2d')).Bar(data);
}

function regions(query) {
  var data = [];
  var cursor = Regions.find();
  var colors = chroma.scale('Spectral').colors(cursor.count());

  //colors = _.shuffle(colors);
  var i = 0;
  cursor.forEach(function(region) {
    var color = chroma(colors[i]);
    query.region = region.id;
    data.push({
      value: Applications.find(query).count(),
      label: region.name,
      color: color,
      highlight: color.brighten(),
    });
    i++;
  });

  currentChart = new Chart(chart.getContext('2d')).Doughnut(data);
}

function applicationsPerDay(query) {
  var minDate = Applications.findOne(query, {sort: {createdAt: 1}}).createdAt;
  var maxDate = Applications.findOne(query, {sort: {createdAt: -1}}).createdAt;
  var dates = [];
  var span = null;
  if (maxDate - minDate <= 31*24*60*60*1000) {
    span = 'month';
    for (var i = 0; i < 30; i++) {
      dates.push(minDate.getDate() + i);
    }
  } else if (maxDate - minDate <= 366*24*60*60*1000) {
    span = 'year';
    for (var i = 0; i < 12; i++) {
      dates.push(monthNames[minDate.getMonth() + i]);
    }
  } else if (maxDate - minDate <= 10*366*24*60*60*1000) {
    span = 'decade';
    for (var i = 0; i < 10; i++) {
      dates.push(minDate.getFullYear() + i);
    }
  } else if (maxDate - minDate <= 10*10*366*24*60*60*1000) {
    span = 'century';
    for (var i = 0; i < 10; i++) {
      dates.push(minDate.getFullYear() + i * 10);
    }
  }

  var data = {
    labels: dates,
    datasets: [
      {
        fillColor: 'rgba(151,187,205,0.5)',
        strokeColor: 'rgba(151,187,205,0.8)',
        highlightFill: 'rgba(151,187,205,0.75)',
        highlightStroke: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [],
      },
    ],
  };

  var date = minDate;
  for (var i = 0; i < dates.length; i++) {
    newDate = new Date(date);
    switch (span) {
      case 'month':
        newDate.setDate(date.getDate() + 1);
        break;
      case 'year':
        newDate.setMonth(date.getMonth() + 1);
        break;
      case 'decade':
        newDate.setFullYear(date.getFullYear() + 1);
        break;
      case 'century':
        newDate.setFullYear(date.getFullYear() + 10);
        break;
    }
    query.createdAt = {$gte: date, $lt: newDate};
    data.datasets[0].data.push(Applications.find(query).count());
    date = newDate;
  }

  currentChart = new Chart(chart.getContext('2d')).Line(data);
}

function renderChart() {
  var query = {};

  if (typeof currentChart !== 'undefined') {
    currentChart.destroy();
  }

  var chartType = Session.get('analysis-chart-type');
  var year = Session.get('analysis-year');
  if (year !== '' && !isNaN(year)) {
    year = parseInt(year, 10);
    nextYear = year + 1;
    query = {createdAt: {$gte: new Date(year + '/01/01'), $lt: new Date(nextYear + '/01/01')}};
  }

  switch (chartType) {
    case 0:
      howDoYouKnowUs(query);
      break;
    case 1:
      query['phases.current.phase'] = {$gt: 0};
      query['phases.current.outcome.id'] = 1;
      howDoYouKnowUs(query);
      break;
    case 2:
      query['phases.current.phase'] = {$gt: 0};
      query['phases.current.outcome.id'] = 3;
      howDoYouKnowUs(query);
      break;
    case 3:
      ages(query);
      break;
    case 4:
      regions(query);
      break;
    case 5:
      applicationsPerDay(query);
      break;
    case 6:
      query['phases.current.phase'] = 0;
      regions(query);
      break;
    case 7:
      query['phases.current.phase'] = 1;
      regions(query);
      break;
    case 8:
      query['phases.current.phase'] = 2;
      regions(query);
      break;
    case 9:
      query['phases.current.phase'] = 3;
      regions(query);
      break;
    case 10:
      query['phases.current.outcome.id'] = 3;
      regions(query);
      break;
  }
}

Template.analysis.onRendered(function() {
  Session.set('analysis-chart-type', 0);
  Session.set('analysis-year', '');
  renderChart();
});

Template.analysis.helpers({
  chartType: function() {
    return Session.get('analysis-chart-type');
  },

  year: function() {
    return Session.get('analysis-year');
  },
});

Template.analysis.events({
  'change #chart-type': function(e) {
    Session.set('analysis-chart-type', parseInt(e.target.value));
    renderChart();
  },

  'change #year': function(e) {
    Session.set('analysis-year', e.target.value);
    renderChart();
  },

  'submit #analysis-form': function(e) {
    e.preventDefault();
  },
});
