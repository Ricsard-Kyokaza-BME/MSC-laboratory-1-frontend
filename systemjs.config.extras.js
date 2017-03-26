/**
 * Add barrels and stuff
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    packages: {
      'app/': {
        meta: {
          '*.styl': { loader: 'stylus' }
        }
      }
    }
  });
})(this);
