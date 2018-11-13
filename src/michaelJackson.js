var MichaelJackson = function (top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, 100);
  // this.$node.addClass('michaelJackson');
  this.$node.append('<img src="assets/moonwalk1.gif"/>');
  this.top = top;
  this.left = left;
  this.initialLeft = left;
  this.counter = 0;
  this.goRight = true;
};

MichaelJackson.prototype = Object.create(Dancer.prototype);
MichaelJackson.prototype.constructor = MichaelJackson;
MichaelJackson.prototype.oldStep = Dancer.prototype.step;

MichaelJackson.prototype.step = function () {
  this.oldStep();


  this.counter++;

  if (this.counter > 20) {
    this.counter = 0;
    this.goRight = !this.goRight;
    this.$node.toggleClass('flipped');
  }

  if (this.goRight) {
    this.left += 10;
  } else {
    this.left -= 10;
  }
  this.setPosition(this.top, this.left);
};