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
    query.referrer = referrer.name;
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
  var minDate = Applications.findOne({}, {sort: {createdAt: 1}}).createdAt;
  var maxDate = Applications.findOne({}, {sort: {createdAt: -1}}).createdAt;
  var dates = [];
  var span = null;
  if (maxDate - minDate < 30*24*60*60*1000) {
    span = 'month';
    for (var i = 0; i < 30; i++) {
      dates.push(minDate.getDate() + i);
    }
  } else if (maxDate - minDate < 12*30*24*60*60*1000) {
    span = 'year';
    for (var i = 0; i < 12; i++) {
      dates.push(monthNames[minDate.getMonth() + i]);
    }
  } else if (maxDate - minDate < 10*12*30*24*60*60*1000) {
    span = 'decade';
    for (var i = 0; i < 10; i++) {
      dates.push(minDate.getFullYear() + i);
    }
  } else if (maxDate - minDate < 10*10*12*30*24*60*60*1000) {
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

Template.analysis.onRendered(function() {
  howDoYouKnowUs({});
});

Template.analysis.events({
  'change #chart-type': function(e) {
    var chartType, cursor, data = [];

    currentChart.destroy();

    switch (parseInt(e.target.value)) {
      case 0:
        howDoYouKnowUs({});
        break;
      case 1:
        howDoYouKnowUs({'phases.current.phase': {$gt: 0}, 'phases.current.outcome.id': 1});
        break;
      case 2:
        howDoYouKnowUs({'phases.current.phase': {$gt: 0}, 'phases.current.outcome.id': 3});
        break;
      case 3:
        ages({});
        break;
      case 4:
        regions({});
        break;
      case 5:
        applicationsPerDay({});
        break;
      case 6:
        regions({'phases.current.phase': 0});
        break;
      case 7:
        regions({'phases.current.phase': 1});
        break;
      case 8:
        regions({'phases.current.phase': 2});
        break;
      case 9:
        regions({'phases.current.phase': 3});
        break;
      case 10:
        regions({'phases.current.outcome.id': 3});
        break;
    }

  },
});
