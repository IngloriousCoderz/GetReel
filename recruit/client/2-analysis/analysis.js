Template.analysis.helpers({});

Template.analysis.onRendered(function() {
  var data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],

    series: [
      [5, 2, 4, 2, 0],
    ],
  };

  var options = {
    width: '100%',
    height: '100%',
  };

  new Chartist.Line('#chart', data);//, options);
});
