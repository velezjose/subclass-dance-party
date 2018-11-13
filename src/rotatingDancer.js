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
    this.angle += 30;
    this.angle %= 360; 
    var strAngle = this.angle.toString() + 'deg';
    this.$node.css('transform', 'rotate(' + strAngle + ')');
  }


// $( "#go" ).click(function() {
//   $( "#block" ).animate({
//     width: "70%",
//     opacity: 0.4,
//     marginLeft: "0.6in",
//     fontSize: "3em",
//     borderWidth: "10px"
//   }, 1500 );
// });
};