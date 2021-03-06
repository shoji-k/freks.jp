var calc = {
  format: function(n) {
    return Math.round(n * 100) / 100;
  },
  getMeter: function(start, end) {
    return parseInt(
        google.maps.geometry.spherical.computeDistanceBetween(
          start, end
          )
        ,10);
  },
  getAngleString: function(point, click) {
    var x = click.lat() - point.lat();
    var y = click.lng() - point.lng();
    var deg = Math.atan2(x, y) / Math.PI * 180;
    var abs_deg = this.format(Math.abs(deg));
    if (abs_deg == 0.0) {
      return '真東';
    }
    if (abs_deg == 180.0) {
      return '真西';
    }
    if (abs_deg == 90.0) {
      if (deg > 0) {
        return '真北';
      }
      return '真南';
    }
    if (abs_deg <= 45.0) {
      return '東から'+abs_deg+'度';
    }
    if (abs_deg >= 135.0) {
      return '西から'+calc.format(180-abs_deg)+'度';
    } else {
      if (deg > 0) {
        return '北から'+calc.format(Math.abs(abs_deg-90))+'度';
      }
      return '南から'+calc.format(Math.abs(abs_deg-90))+'度';
    }
    return 'error';
  }
};

var startPoint = {
  marker: null,
  circle: null,
  init: function(map, point) {
    this.marker = new google.maps.Marker({
      position: point,
    draggable: true,
    animation: google.maps.Animation.DROP,
    map: map
    });

    this.circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.0,
      map: map,
      center: point,
      radius: 100
    });
  },
  position() {
    return this.marker.getPosition();
  },
  refreshInfo() {
    this.circle.setCenter(this.marker.getPosition());
  }
};

var endPoint = {
  marker: null,
  infowindow: null,
  path: null,
  init: function(map, point) {
    if (this.marker){this.marker.setMap(null)};

    this.marker = new google.maps.Marker({
      position: point,
      draggable: true,
      map: map
    });
  },
  setInfoWindow: function(map, point) {
    if (this.infowindow){this.infowindow.setMap(null)};
    var latlng = this.marker.getPosition();
    var point_latlng = new google.maps.LatLng(point.lat(), point.lng());
    this.infowindow = new google.maps.InfoWindow({
      content:
      '<p>距離: ' + calc.getMeter(point_latlng, latlng) + ' m</p>'
      + '<p>方角: ' + calc.getAngleString(point_latlng, latlng) + ' </p>',
      maxWidth: 200
    });
    this.infowindow.open(map, this.marker);
  },
  drawLine: function(map, start) {
    if (this.path){this.path.setMap(null)};
    this.path = new google.maps.Polyline({
      path: [start, this.marker.getPosition()],
      geodesic: true,
      strokeColor: '#999900',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this.path.setMap(map);
  },
  refreshInfo(map, start) {
    endPoint.setInfoWindow(map, start);
    endPoint.drawLine(map, start);
  }
};

var mapMaker = {
  map: null,
  init: function() {
    var initialPoint = new google.maps.LatLng({lat: 35.0081176, lng: 135.7615772});
    this.map = new google.maps.Map(document.getElementById('map_canvas'), {
      center: initialPoint,
      scrollwheel: true,
      zoom: 16
    });

    startPoint.init(this.map, initialPoint);

    google.maps.event.addListener(this.map, 'click',
        function(event) {
          endPoint.init(this.map, event.latLng);
          endPoint.refreshInfo(this.map, startPoint.position())

      google.maps.event.addListener(
        endPoint.marker, 'dragend', function(m) {
          endPoint.refreshInfo(this.map, startPoint.position())
        }
        );
        }.bind(this)
        );

    google.maps.event.addListener(
        startPoint.marker, 'dragend', function(m) {
          startPoint.refreshInfo();
          if (endPoint.marker) {
            endPoint.refreshInfo(this.map, m.latLng)
          }
        }
        );
  }
};

function initMap() {
  mapMaker.init();
}
