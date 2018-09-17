$(function() {

    var m = $(".js-maps");

    if (m.length) {
      showMap(".js-maps");
    }

  });
  
  //Показ карты с одной выбранной станцией
  function showMap(selector) {
    var $map;
    var $centerMap;
    var $bounds;
    var $contentPoint;
    var $gm1 = $(selector).data('gm1'); // Координата 1 берется из атрибута data-gm1 селектора selector
    var $gm2 = $(selector).data('gm2'); // Координата 2 берется из атрибута data-gm2 селектора selector
    
    //Опции для карты
    $centerMap = new google.maps.LatLng($gm1, $gm2);
    var $myOptions = {
        zoom: 16,
        center: $centerMap,
        streetViewControl: false,
        overviewMapControl: false,
        scaleControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
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
]
    };
    
    //Создаём карту и ставим точку
    $map = new google.maps.Map(document.getElementById("mapsGoogle"), $myOptions);
    $bounds = new google.maps.LatLngBounds();
    
    //Маркер
    var $imageMarker = new google.maps.MarkerImage('/image/svg/marker.svg',
          new google.maps.Size(84, 92),
          new google.maps.Point(0,0),
          new google.maps.Point(42, 92));
    var $point = new google.maps.LatLng($gm1, $gm2);
    var $marker = new google.maps.Marker({
                   map: $map,
                   position: $point,
                   icon: $imageMarker
    });

    var tabs = $(".js-maps-tabs");

    tabs.on("click", function (e) {
      e.preventDefault();

      var cord, contents;

      tabs.removeClass("active");
      $(this).addClass("active");

      cord = $(this).data("cord").split(",");
      contents = $(this).data("content");

      console.log(cord[0]);
      console.log(cord[1]);
      console.log(contents);
    });

    $bounds.extend($point);
    // Инфоокно при клике
    var $mapInfoWindow = new google.maps.InfoWindow({content: ""});
    google.maps.event.addListener($marker, 'click', function() {
        $mapInfoWindow.setContent($contentPoint);
        $mapInfoWindow.open($map, this);
    });
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