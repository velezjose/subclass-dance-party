var BananaDancer = function (top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.append('<img src="assets/pbj-guy.gif"/>');
  // Rotate banana dancer when clicked
  this.$node.children().click((function () {
    if (this.$node.children()[0].classList.contains('rotate-counter-clockwise')) {
      this.$node.children().removeClass('rotate-counter-clockwise');
      this.$node.children().addClass('rotate-clockwise');
    } else {
      this.$node.children().removeClass('rotate-clockwise');
      this.$node.children().addClass('rotate-counter-clockwise');
    }
  }).bind(this));
};

BananaDancer.prototype = Object.create(Dancer.prototype);
BananaDancer.prototype.constructor = BananaDancer;

