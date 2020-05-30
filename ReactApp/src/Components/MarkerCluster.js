import { useEffect } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useLeaflet } from "react-leaflet";
import { redMark, yellowMark, greenMark, undefMark, personMark } from "./constants";

function donutSegment(start, end, r, r0, color) {
    if (end - start === 1) end -= 0.00001;
    var a0 = 2 * Math.PI * (start - 0.25);
    var a1 = 2 * Math.PI * (end - 0.25);
    var x0 = Math.cos(a0),
        y0 = Math.sin(a0);
    var x1 = Math.cos(a1),
        y1 = Math.sin(a1);
    var largeArc = end - start > 0.5 ? 1 : 0;
  
    return [
        '<path d="M',
        r + r0 * x0,
        r + r0 * y0,
        'L',
        r + r * x0,
        r + r * y0,
        'A',
        r,
        r,
        0,
        largeArc,
        1,
        r + r * x1,
        r + r * y1,
        'L',
        r + r0 * x1,
        r + r0 * y1,
        'A',
        r0,
        r0,
        0,
        largeArc,
        0,
        r + r0 * x0,
        r + r0 * y0,
        '" fill="' + color + '" />'
    ].join(' ');
  }
  
  // Map
  // code for creating an SVG donut chart from feature properties
  function createDonutChart(props) {
    var colors = ['#C7C7C7', '#FF4747', '#FFD46E', '#3DEB00']; //TODO: change first color in list to grey
    var offsets = [];
    var counts = [
        props[0],
        props[1],
        props[2],
        props[3]
    ];
    var total = 0;
    for (var i = 0; i < counts.length; i++) {
        offsets.push(total);
        total += counts[i];
    }
    var fontSize =
        total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
    var r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
    var r0 = Math.round(r * 0.6);
    var w = r * 2;

    var html =
        '<div><svg width="' +
        w +
        '" height="' +
        w +
        '" viewbox="0 0 ' +
        w +
        ' ' +
        w +
        '" text-anchor="middle" style="font: ' +
        fontSize +
        'px sans-serif">';

    for (i = 0; i < counts.length; i++) {
        html += donutSegment(
            offsets[i] / total,
            (offsets[i] + counts[i]) / total,
            r,
            r0,
            colors[i]
        );
    }
    html +=
        '<circle cx="' +
        r +
        '" cy="' +
        r +
        '" r="' +
        r0 +
        '" fill="white" /><text dominant-baseline="central" transform="translate(' +
        r +
        ', ' +
        r +
        ')">' +
        total.toString() +
        '</text></svg></div>';

    var el = document.createElement('div');
    el.innerHTML = html;
    return el.firstChild;
  }

const mcg = new L.MarkerClusterGroup({
    'iconCreateFunction': function(cluster) {
      var markers = cluster.getAllChildMarkers();
      var props = [0, 0, 0, 0];
      markers.forEach(function (marker){
        switch(marker.feature.properties.status) {
          case "Undefined":
            props[0] += 1;
            break;
          case "Low":
            props[1] += 1;
            break;
          case "Medium":
            props[2] += 1;
            break;
          case "High":
            props[3] += 1;
            break;
          default:
        }
      });
      return new L.DivIcon({
          html: createDonutChart(props),
          className: "marker-cluster",
          iconSize: new L.Point(40, 40)
      })
    },
  });

const MarkerCluster = ({ markers, bounds, userLoc }) => {
  const { map } = useLeaflet();

  useEffect(() => {
    if (markers !== []) {
        mcg.clearLayers();
        markers.forEach((item) =>
            L.geoJSON(item, {
            pointToLayer: function () {
                switch(item.properties.status) {
                  case "Undefined":
                      return L.marker(L.latLng(item.geometry.coordinates[1], item.geometry.coordinates[0]), {icon: undefMark}).bindPopup("<b>" + item.properties.name + "</b><br>" + item.properties.address + "<br> Status:    " + item.properties.status);
                  case "Low":
                      return L.marker(L.latLng(item.geometry.coordinates[1], item.geometry.coordinates[0]), {icon: redMark}).bindPopup("<b>" + item.properties.name + "</b><br>" + item.properties.address + "<br> Status:    " + item.properties.status);
                  case "Medium":
                      return L.marker(L.latLng(item.geometry.coordinates[1], item.geometry.coordinates[0]), {icon: yellowMark}).bindPopup("<b>" + item.properties.name + "</b><br>" + item.properties.address + "<br> Status:    " + item.properties.status);
                  case "High":
                      return L.marker(L.latLng(item.geometry.coordinates[1], item.geometry.coordinates[0]), {icon: greenMark}).bindPopup("<b>" + item.properties.name + "</b><br>" + item.properties.address + "<br> Status:    " + item.properties.status);
                  default:
                }
            }}).addTo(mcg)
        );

        // optionally center the map around the markers
        // map.fitBounds(mcg.getBounds());
        // // add the marker cluster group to the map
        map.addLayer(mcg);
        if(userLoc){
          var user = L.marker(L.latLng(userLoc[0], userLoc[1]), {icon: personMark}).bindPopup("<b> Your location </b>");  
          user.addTo(map);
        }
        if (bounds) {
          if(L.latLngBounds(bounds).isValid()){
            map.fitBounds(bounds, {padding: [50, 50]});
          }
        }

        setTimeout(() => {
          map.invalidateSize();
        }, 0);
    }
  }, [markers, map, bounds, userLoc]);

  return null;
};

export default MarkerCluster;
