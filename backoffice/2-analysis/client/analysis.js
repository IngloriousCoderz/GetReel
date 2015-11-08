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
        chartType = 'Doughnut';//Bar
        var minAge = Applications.findOne({}, {sort: {age: 1}}).age;
        var maxAge = Applications.findOne({}, {sort: {age: -1}}).age;
        var ages = [];
        for (var i = minAge; i < maxAge; i++) {
          ages.push(i);
        }
        colors = chroma.scale('Spectral').colors(ages.length);
        for (var i = 0; i < ages.length; i++) {
          var age = ages[i];
          var color = chroma(colors[i]);
          data.push({
            value: Applications.find({age: age}).count(),
            label: age + ' anni',
            color: color,
            highlight: color.brighten(),
          });
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
