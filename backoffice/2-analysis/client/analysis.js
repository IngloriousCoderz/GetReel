Meteor.subscribe('referrers');
Meteor.subscribe('applications');
Meteor.subscribe('regions');

var currentChart;

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
        howDoYouKnowUs({'status.current': {$gt: 0}, 'status.outcome': 1});
        break;
      case 2:
        howDoYouKnowUs({'status.current': {$gt: 0}, 'status.outcome': 2});
        break;
        // chartType = 'Pie';
        // cursor = Referrers.find();
        // colors = chroma.scale('Spectral').colors(cursor.count());
        // var i = 0;
        // cursor.forEach(function(referrer) {
        //   var color = chroma(colors[i]);
        //   data.push({
        //     value: Applications.find({referrer: referrer.name}).count(),
        //     label: referrer.name,
        //     color: color,
        //     highlight: color.brighten(),
        //   });
        //   i++;
        // });
        //break;
      case  3:
        chartType = 'Bar';
        var minAge = Applications.findOne({}, {sort: {age: 1}}).age;
        var maxAge = Applications.findOne({}, {sort: {age: -1}}).age;
        var ages = [];
        for (var i = minAge; i <= maxAge; i++) {
          ages.push(i);
        }
        //colors = chroma.scale('Spectral').colors(ages.length);
        var data = {
          labels: ages,
          datasets: [{
            fillColor: 'rgba(151,187,205,0.5)',
            strokeColor: 'rgba(151,187,205,0.8)',
            highlightFill: 'rgba(151,187,205,0.75)',
            highlightStroke: 'rgba(151,187,205,1)',
            data: [],
          }],
        };

        for (var i = 0; i < ages.length; i++) {
          data.datasets[0].data.push(Applications.find({age: ages[i]}).count());
        }
        currentChart = new Chart(chart.getContext('2d'))[chartType](data);
        break;
      case 4:
        chartType = 'Doughnut';
        cursor = Regions.find();
        //colors = _.shuffle(colors);
        colors = chroma.scale('Spectral').colors(cursor.count());
        var i = 0;
        cursor.forEach(function(region) {
          var color = chroma(colors[i]);
          data.push({
            value: Math.floor(Math.random() * 100),
            label: region.name,
            color: color,
            highlight: color.brighten(),
          });
          i++;
        });
        currentChart = new Chart(chart.getContext('2d'))[chartType](data);
        break;
      case 5:
        chartType = 'Line';
        break;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        chartType = 'Doughnut';
        break;
    }

  },
});
