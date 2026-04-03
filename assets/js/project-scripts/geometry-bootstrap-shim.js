// bootstrap-shim.js
// Ensures the two libs expose the expected globals (safe, idempotent).
// Source CHATGPT- helping to port my new code
(function(){
  // If colorhandler is bundled inside geometry, expose a compatible global.
  if (typeof window.colorhandler === 'undefined' && typeof window.geometry !== 'undefined') {
    // geometry may expose its color class under a different name; try common candidates.
    if (geometry.T) {
      window.colorhandler = { ColorHandler: geometry.T };
    } else if (geometry.ColorHandler) {
      window.colorhandler = { ColorHandler: geometry.ColorHandler };
    }
  }

  // If geometry bundled but named differently, make sure `geometry` exists.
  if (typeof window.geometry === 'undefined' && typeof window.GEOMETRY !== 'undefined') {
    window.geometry = window.GEOMETRY;
  }

  // Safety checks — throw helpful console warnings (non-fatal).
  if (typeof window.p5 === 'undefined') {
    console.warn('p5 not found. Ensure /assets/js/lib/p5js/p5.min.js is present and a global build.');
  }
  if (typeof window.geometry === 'undefined') {
    console.error('geometry not found. Check /assets/js/lib/geometry/index.global.js path and that it defines `var geometry`.');
  }
  if (typeof window.colorhandler === 'undefined') {
    console.warn('colorhandler not found. Either include /assets/js/lib/colorhandler/index.global.js or rely on geometry.T via shim.');
  }
})();