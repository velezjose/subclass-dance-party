$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var dancer = new dancerMakerFunction(
      Math.abs($('body').height() * Math.random() - 50),
      Math.abs($('body').width() * Math.random() - 50),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);

    window.dancers.push(dancer);  
  });

  $('.lineUpDancers').on('click', function(event) {
    MichaelJackson.prototype.linedUp = true; // FIXME ????
    var halfNumDancers = Math.floor(window.dancers.length / 2);
    var left = $('body').width() * 0.20;
    var leftEnd = left - 300;
    var right = $('body').width() * 0.60;
    var height = $('body').height();
    var bottom = height * 0.80;
    var top = height * 0.20;
    var deltaHeight = (bottom - top) / halfNumDancers;
    var deltaWidth = (left - leftEnd) / halfNumDancers;

    for (let i = 0; i < halfNumDancers; i++) {
      var dancer = window.dancers[i];
      dancer.$node.children('img').addClass('flipped');
      var dancerXPosition = left - (i * deltaWidth) - (0.5 * dancer.$node.children().width());
      var dancerYPosition = top + (i * deltaHeight) - (0.5 * dancer.$node.children().height());
      dancer.setPosition(dancerYPosition, dancerXPosition);
    }

    for (let i = halfNumDancers; i < window.dancers.length; i++) {
      var dancer = window.dancers[i];
      dancer.$node.children('img').removeClass('flipped');
      var dancerXPosition = right + (i * deltaWidth) - (0.5 * dancer.$node.children().width());
      var dancerYPosition = top + ((i - halfNumDancers) * deltaHeight) - (0.5 * dancer.$node.children().height());
      dancer.setPosition(dancerYPosition, dancerXPosition);
    }

  });

  $('.pairedDancers').on('click', function(event) {
    var distance = function(xi, xj, yi, yj) {
      return Math.sqrt(Math.pow((xi - xj), 2) + Math.pow((yi - yj), 2));
    };

    var midpoint = function(xi, xj, yi, yj) {
      var xm = Math.min(xi, xj) + Math.abs(xj - xi) / 2;
      var ym = Math.min(yi, yj) + Math.abs(yj - yi) / 2;
      return [xm, ym];
    };

    var potentialPairs = [];
    for (var i = 0; i < dancers.length; i++) {
      for (var j = i + 1; j < dancers.length; j++) {
        potentialPairs.push({
          partner1: i,
          partner2: j,
          distance: distance(dancers[i].left, dancers[j].left, dancers[i].top, dancers[j].top)
        });
      }
    }
    potentialPairs.sort((a, b) => a.distance - b.distance);
    
    var pairs = [];
    var found = {};
    for (var i = 0; i < potentialPairs.length; i++) {
      var d1 = potentialPairs[i].partner1;
      var d2 = potentialPairs[i].partner2;
      
      if (found[d1] === undefined && found[d2] === undefined) {
        found[d1] = true;
        found[d2] = true;
        var dancer1 = dancers[d1];
        var dancer2 = dancers[d2];
        pairs.push([dancer1, dancer2, midpoint(dancer1.left, dancer2.left, dancer1.top, dancer2.top)]);
      }
    }

    var r = 50;

    for (var i = 0; i < pairs.length; i++) {
      var [dancer1, dancer2, [xm, ym]] = pairs[i];

      dancer1.$node.animate({
        top: ym - r,
        left: xm
      }, 1000);
      dancer2.$node.animate({
        top: ym + r,
        left: xm
      });

      dancer1.top = ym - r;
      dancer1.left = xm;
      dancer2.top = ym + r;
      dancer2.left = xm;

      dancer1.paired = true;
      dancer2.paired = true;
    }

  });
});

