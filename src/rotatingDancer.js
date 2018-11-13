var RotatingDancer = function (top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('rotatingDancer');
  this.angle = 0;
};

RotatingDancer.prototype = Object.create(Dancer.prototype);
RotatingDancer.prototype.constructor = RotatingDancer;
RotatingDancer.prototype.oldStep = Dancer.prototype.step;

RotatingDancer.prototype.step = function () {
  this.oldStep();
  
  if (this.angle !== undefined) {
    this.angle += 45;
    this.angle %= 360; 
    var strAngle = this.angle.toString() + 'deg';
    this.$node.css('transform', 'rotate(' + strAngle + ')');
  }
};