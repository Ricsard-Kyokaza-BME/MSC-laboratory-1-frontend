/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({ baseURL: '/app' });
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'ng2-dnd':                   'npm:ng2-dnd/bundles/index.umd.js',
      'contra':                    'npm:contra',
      'atoa':                      'npm:atoa',
      'ticky':                     'npm:ticky',
      'crossvent':                 'npm:crossvent/src',
      'custom-event':              'npm:custom-event',
      'jquery':                    'npm:jquery/dist/jquery.js',
      'materialize-css':           'npm:materialize-css',
      'angular2-materialize':      'npm:angular2-materialize',
      'class-transformer':         'npm:class-transformer'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      'app': { main: './main.js', defaultExtension: 'js' },
      'rxjs': { main: 'bundles/Rx.js', defaultExtension: 'js' },
      'materialize-css': { format: "global", main: "dist/js/materialize.js", defaultExtension: 'js' },
      'angular2-materialize': { "main": "dist/index.js", "defaultExtension": "js" },
      'class-transformer': { "main": "index.js", "defaultExtension": "js" },
      'contra': { main: 'contra.js', defaultExtension: 'js' },
      'atoa': { main: 'atoa.js', defaultExtension: 'js' },
      'ticky': { main: 'ticky.js', defaultExtension: 'js' },
      'crossvent': { main: 'crossvent.js', defaultExtension: 'js' },
      'custom-event': { main: 'index.js', defaultExtension: 'js' }
    }
  });
})(this);
