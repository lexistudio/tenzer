define([
  'jquery',
  'lib/forms',
], function($, forms) {

  "use strict";

  var ikParms = {
    autoWidth: false,
    ddFullWidth: false,
    ddMaxHeight: 250
  };

  $(function() {
    forms.setup();

    // Search start
    (function () {
      var btn = $(".js-search");

      if (btn.length) {
        btn.on("click", function () {
          $(this).next("form").addClass("active");
          $(".js-search-field").focus();
        });
      }
    })();
    // End Search start
  });

});