describe('Banana Dancer', function() {

  var banana, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    banana = new BananaDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(banana.$node).to.be.an.instanceof(jQuery);
  });

  it('should inherit from Dancer', function() {
    expect(banana.paired).to.equal(false);
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(banana, 'step');
      expect(banana.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(banana.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(banana.step.callCount).to.be.equal(2);
    });
  });
});