var BananaDancer = function (top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, 100);
  this.top = top;
  this.left = left;
  this.counter = 0;
  this.goRight = true;
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

BananaDancer.prototype.oldStep = Dancer.prototype.step;
BananaDancer.prototype.step = function () {
  this.oldStep();

  if (this.paired) {
    this.counter++;

    var numSteps = 10;
    if (this.counter > numSteps) {
      this.counter = 0;
      this.goRight = !this.goRight;
    }

    if (this.goRight) {
      this.left += 10;
    } else {
      this.left -= 10;
    }
    this.setPosition(this.top, this.left);
  }
};

