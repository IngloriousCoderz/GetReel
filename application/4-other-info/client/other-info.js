Template.otherInfoStep.onRendered(function() {
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  elems.forEach(function(html) {
    var switchery = new Switchery(html, {size: 'small', color: '#337ab7'});
  });
});
