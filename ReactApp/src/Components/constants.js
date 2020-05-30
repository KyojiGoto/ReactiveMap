import L from "leaflet";
import redmarker from '../Images/Marker R.png';
import yellowmarker from '../Images/Marker Y.png';
import greenmarker from '../Images/Marker G.png';
import undefmarker from '../Images/Marker U.png';
import shadow from '../Images/marker-shadow.png';
import person from '../Images/MeMarker.png';

export const redMark = new L.Icon({
    iconUrl: redmarker,
    shadowUrl: shadow,
    iconSize:     [25, 40], // size of the icon
    shadowSize:   [30, 44], // size of the shadow
    iconAnchor:   [12.5, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 43],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

export const greenMark = new L.Icon({
    iconUrl: greenmarker,
    shadowUrl: shadow,
    iconSize:     [25, 40], // size of the icon
    shadowSize:   [30, 44], // size of the shadow
    iconAnchor:   [12.5, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 43],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

export const yellowMark = new L.Icon({
    iconUrl: yellowmarker,
    shadowUrl: shadow,
    iconSize:     [25, 40], // size of the icon
    shadowSize:   [30, 44], // size of the shadow
    iconAnchor:   [12.5, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 43],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

export const undefMark = new L.Icon({
    iconUrl: undefmarker,
    shadowUrl: shadow,
    iconSize:     [25, 40], // size of the icon
    shadowSize:   [30, 44], // size of the shadow
    iconAnchor:   [12.5, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 43],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

export const personMark = new L.Icon({
    iconUrl: person,
    iconSize:     [25, 60], // size of the icon
    iconAnchor:   [12.5, 60], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
});
