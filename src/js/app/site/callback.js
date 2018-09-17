define([
  'jquery',
  'lib/forms',
  'jquery/colorbox',
], function($, forms) {

  "use strict";

  $(function() {
    forms.setup();
    forms.validate('#callbackForm', {});

    showCallback();
  });

  function showCallback() {
    var $callback = $('.js-callback');
    $callback.colorbox({ inline:true });
  }



});

