var MichaelJackson = function (top, left, timeBetweenSteps) {

  var adjustPostion = function (top, left) {
    while (top < 10 || top > $(window).height() - this.$node.children().height() - 300) {
      top = $(window).height() * Math.random();
    }
    while (left < 5 || left > $(window).width() - this.$node.children().width() - 400) {
      left = $(window).width() * Math.random();
    }
    return [top, left];
  };

  Dancer.call(this, top, left, 100);  
  this.$node.append('<img src="assets/moonwalk1.gif"/>');

  [top, left] = adjustPostion.call(this, top, left);

  this.setPosition(top, left);  
  this.top = top;
  this.left = left;
  this.initialLeft = left;
  this.counter = 0;
  this.goRight = true;

  this.$node.children('img').click((function() {
    this.$node.append('<p class="hee">Hee</p>');
    this.$node.children('p').on('animationend', (function () {
      this.$node.children('p').remove();
    }).bind(this));
  }).bind(this));

};

MichaelJackson.prototype = Object.create(Dancer.prototype);
MichaelJackson.prototype.constructor = MichaelJackson;
MichaelJackson.prototype.oldStep = Dancer.prototype.step;
MichaelJackson.prototype.linedUp = false;

MichaelJackson.prototype.step = function () {
  this.oldStep();

  if (!this.linedUp) {
    this.counter++;

    if (this.counter > 20) {
      this.counter = 0;
      this.goRight = !this.goRight;
      this.$node.children('img').toggleClass('flipped');
    }

    if (this.goRight) {
      this.left += 10;
    } else {
      this.left -= 10;
    }
    this.setPosition(this.top, this.left);
  }
  
};