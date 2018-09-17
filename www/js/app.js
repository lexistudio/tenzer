$(function () {
  
  // Main Carusel
  (function () {
    var path = ".js-carusel";
    var $slider = {
      box: $(path),
      prev: path + '__prev',
      next: path + '__next',
      pagination: path + '__pagination',
    };

    if ($slider.box.length) {
      var $swiperSlider = new Swiper($slider.box, {
        pagination: $slider.pagination,
        paginationElement: 'div',
        bulletClass: 's-btn',
        bulletActiveClass: 'active',
        paginationClickable: true,
        speed: 500,
        autoHeight: false,
        autoplay: 5000,
        loop: true,
        autoplayDisableOnInteraction: false,
        nextButton: $slider.next,
        prevButton: $slider.prev,
        slidesPerView: 1,
        spaceBetween: 0
      });
    }
  })();
  // End Main Carusel

  // Team Carusel
  (function () {
    var path = ".js-team";
    var $slider = {
      box: $(path),
      prev: path + '__prev',
      next: path + '__next',
      pagination: path + '__pagination',
    };

    if ($slider.box.length) {
      var $swiperSlider = new Swiper($slider.box, {
        pagination: $slider.pagination,
        paginationElement: 'div',
        bulletClass: 's-btn',
        bulletActiveClass: 'active',
        paginationClickable: true,
        speed: 500,
        autoHeight: false,
        loop: true,
        autoplayDisableOnInteraction: false,
        nextButton: $slider.next,
        prevButton: $slider.prev,
        slidesPerView: 1,
        spaceBetween: 32,
        onSlideChangeStart: function (e) {
          var round = e.realIndex + 1;
          $(".team__pagination-round-one").text(round);
        }
      });
    }
  })();
  // End Team Carusel

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