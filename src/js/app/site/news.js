// JavaScript-код для новостей.
//
define([
  'jquery'
], function ($) {

  "use strict";

  $(function() {

    calendar();

  });

  function calendar() {

    var $viewMonth;
    var $viewYear;
    
    $("#field_month,#field_year").on('change', setDateForm);
    $("#news-calendar-table").on('click', "div.js-calendar-prev", setDatePrev);
    $("#news-calendar-table").on('click', "div.js-calendar-next", setDateNext);
    
    function setDateForm() {
        $viewMonth = $("#field_month option:selected").val();
        $viewYear = $("#field_year option:selected").val();
        load();
    }
    
    function setDatePrev() {
        $viewMonth = $(this).data('prev_month');
        $viewYear = $(this).data('prev_year');
        $("#field_month").attr('value', $viewMonth);
        $("#field_year").attr('value', $viewYear);
        load();
    }

    function setDateNext() {
        $viewMonth = $(this).data('next_month');
        $viewYear = $(this).data('next_year');
        $("#field_month").attr('value', $viewMonth);
        $("#field_year").attr('value', $viewYear);
        load();
    }

    function load() {
      var lang = '';

      $.post(
        "/news/viewcalendar",
        { "month": $viewMonth,
          "year":  $viewYear,
          "lang":  lang || ''
        })
      .success(function (response) {
        $("#news-calendar-table").html(response);
      });
    }
  }

});
