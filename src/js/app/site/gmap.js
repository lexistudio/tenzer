// JavaScript-код для страницы с картой.
//
define([
  'jquery',
  'gmaps'
], function ($, gmaps) {

  "use strict";

  $(function() {

    if ($(".js-maps").length) {
      showMap(".js-maps", "mapsGoogle");
    }

  });

  //Показ карты с одной выбранной станцией
  function showMap(selector, id) {
    var $map;
    var $centerMap;
    var $bounds;
    var $contentPoint = $(selector).data('content');
    var $gm1 = $(selector).data('gm1'); // Координата 1 берется из атрибута data-gm1 селектора selector
    var $gm2 = $(selector).data('gm2'); // Координата 2 берется из атрибута data-gm2 селектора selector

    //Опции для карты
    $centerMap = new gmaps.LatLng($gm1, $gm2);
    var $myOptions = {
        zoom: 16,
        center: $centerMap,
        streetViewControl: false,
        overviewMapControl: false,
        scaleControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        zoomControlOptions: {
            style: gmaps.ZoomControlStyle.LARGE,
            position: gmaps.ControlPosition.LEFT_TOP
        },
        panControl: false,
        disableDefaultUI: true,
        scrollwheel: false,
        styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#53504a"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#c3c2c2"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "weight": "5"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#d7d7d7"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e5f5c3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#b3ff00"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#8fc906"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b1dc48"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#60733b"
            },
            {
                "visibility": "on"
            },
            {
                "weight": "1"
            },
            {
                "lightness": "37"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#8fc906"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8fc906"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#8fc906"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e4e4e4"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#efefef"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#d8f2fa"
            },
            {
                "visibility": "on"
            }
        ]
    }
]};

    //Создаём карту и ставим точку
    $map = new gmaps.Map(document.getElementById(id), $myOptions);
    $bounds = new gmaps.LatLngBounds();

    //Маркер
    var $imageMarker = new gmaps.MarkerImage('/image/svg/marker.svg',
          new google.maps.Size(84, 92),
          new google.maps.Point(0,0),
          new google.maps.Point(42, 92));
    var $point = new gmaps.LatLng($gm1, $gm2);
    var $marker = new gmaps.Marker({
                   map: $map,
                   position: $point,
                   icon: $imageMarker
    });
    $bounds.extend($point);
    // Инфоокно при клике
    var $mapInfoWindow = new gmaps.InfoWindow({content: ""});
    gmaps.event.addListener($marker, 'click', function() {
        $mapInfoWindow.setContent($contentPoint);
        $mapInfoWindow.open($map, this);
    });

    var $btn = $(".js-maps-tabs");

    if ($btn.length) {
      $btn.on("click", function () {
        var $cord, $cordArr, $address;

        $btn.removeClass("active");
        $(this).addClass("active");
        
        $cord = $.trim($(this).data("cord"));
        $cordArr = $cord.split(",");

        $address = $(this).data("content");

        $centerMap = new gmaps.LatLng($cordArr[0], $cordArr[1]);
        $map.setCenter($centerMap);
        $map.setZoom(17);

        $marker = addMarker($map, $cordArr[0], $cordArr[1], $bounds, '' + $address + '', $imageMarker);
        $marker.setMap($map);
      });
    }
  }

  //Функция добавления точки (centerX, centerY) на карту mapId с расширением границ boundsId
  function addMarker(mapId, centerX, centerY, boundsId, contentPoint, imageMarker) {
    var $point = new gmaps.LatLng(centerX, centerY);
    var $marker = new gmaps.Marker({
                       position: $point,
                       icon: imageMarker
    });
    var $mapInfoWindow = new gmaps.InfoWindow({content: ""});
    gmaps.event.addListener($marker, 'click', function() {
        $mapInfoWindow.setContent(contentPoint);
        $mapInfoWindow.open(mapId, this);
    });
    if (boundsId) boundsId.extend($point);
    return $marker;
  }

});
