describe('Michael Jackson', function() {

  var mj, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    mj = new MichaelJackson(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(mj.$node).to.be.an.instanceof(jQuery);
  });

  it('should toggle class flipped when counter exceeds 20', function() {
    sinon.spy(mj.$node, 'toggle');
    for (let i = 0; i < 21; i++) {
      mj.step();
    }
    expect(mj.goRight).to.be.false;
    for (let i = 0; i < 21; i++) {
      clock.tick(timeBetweenSteps);
    }
    expect(mj.goRight).to.be.false;
  });

  it('should inherit from Dancer', function() {
    expect(mj.paired).to.equal(false);
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(mj, 'step');
      expect(mj.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(mj.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(mj.step.callCount).to.be.equal(2);
    });
  });
});