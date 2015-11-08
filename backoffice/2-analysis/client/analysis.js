Meteor.subscribe('referrers');
Meteor.subscribe('applications');
Meteor.subscribe('regions');

var currentChart;

Template.analysis.onRendered(function() {
  currentChart = new Chart(chart.getContext('2d')).Pie();
});

Template.analysis.events({
  'change #chart-type': function(e) {
    var chartType, cursor, data = [];

    currentChart.destroy();

    switch (parseInt(e.target.value)) {
      case 0:
      case 1:
      case 2:
        chartType = 'Pie';
        cursor = Referrers.find();
        colors = chroma.scale('Spectral').colors(cursor.count());
        var i = 0;
        cursor.forEach(function(referrer) {
          var color = chroma(colors[i]);
          data.push({
            value: Applications.find({referrer: referrer.name}).count(),
            label: referrer.name,
            color: color,
            highlight: color.brighten(),
          });
          i++;
        });
        break;
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

    currentChart = new Chart(chart.getContext('2d'))[chartType](data);
  },
});
