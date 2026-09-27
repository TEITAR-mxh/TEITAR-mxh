(function () {
  'use strict';

  var canvas = document.getElementById('visitor-map-canvas');
  if (!canvas) return;
  var status = canvas.querySelector('.visitor-map-status');
  if (!status) return;

  // The Supercounters embed scripts inside #visitor-map-canvas render the map
  // in place and give it the id "scvmap". Hide the placeholder once it appears.
  var tries = 0;
  var timer = setInterval(function () {
    if (document.getElementById('scvmap')) {
      status.hidden = true;
      clearInterval(timer);
    } else if (++tries > 40) {
      status.textContent = 'Map is temporarily unavailable. Try Map & stats below.';
      clearInterval(timer);
    }
  }, 500);
})();
