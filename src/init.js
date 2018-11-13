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
    console.log(window.dancers);
  });

  $('.lineUpDancers').on('click', function(event) {
    MichaelJackson.prototype.linedUp = true; // FIXME ????
    var half = Math.floor(window.dancers.length / 2);
    var left = $('body').width() * 0.20;
    var leftEnd = left - 300;
    var right = $('body').width() * 0.60;
    var height = $('body').height();
    var bottom = height * 0.80;
    var top = height * 0.10;
    var deltaHeight = (bottom - top) / half;
    var deltaWidth = (left - leftEnd) / half;

    for (let i = 0; i < half; i++) {
      var dancer = window.dancers[i];
      var dancerXPosition = (left - i * deltaWidth) - 0.5 * dancer.$node.children().width();
      dancer.setPosition(top + (i * deltaHeight), dancerXPosition);
    }

    for (let i = half; i < window.dancers.length; i++) {
      var dancer = window.dancers[i];
      var dancerXPosition = (right + i * deltaWidth) - 0.5 * dancer.$node.children().width();
      dancer.setPosition(top + ((i - half) * deltaHeight), dancerXPosition);
    }

  });
});

