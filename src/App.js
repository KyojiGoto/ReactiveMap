import React from 'react';
import './App.css';
import Axios from "axios";
import TheMap from './Components/Map'
import NAV_BAR from './Components/Nav'
import Overlay from './Components/overlay'


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      foodbanks: null,
      provinces: null,
      cities: null,
      bounds: null,
      nearMeBounds: null,
      userLoc: null
    };
  }
  
  componentDidMount () {
    Axios({
      method: "GET",
      url: "https://judicious-helpful-decimal.glitch.me/",
    }).then(res => { this.setState({
      foodbanks: res.data.FoodBank_list, 
      provinces: res.data.province_lst, 
      cities: res.data.city_list,
      bounds: res.data.bounds,
      nearMeBounds: null,
      userLoc: null
    })});
  }

  updateBounds = (boundString) => {
    if (boundString) {
      var bound = boundString.split(',');
      var bounds = [];
      bounds.push(bound);
      bounds.push(bound);
      this.setState({
        bounds: bounds,
        nearMeBounds: null,
        userLoc: null
      });
    }
  }

  updateLists_province = (data) => {
    if(data){
      this.setState({
        foodbanks: data.FoodBank_list, 
        provinces: data.province_lst, 
        cities: data.city_list,
        bounds: data.bounds,
        nearMeBounds: null,
        userLoc: null
      });
    }
  }

  updateLists_city = (data) => {
    if(data){
      this.setState({
        foodbanks: data.FoodBank_list,
        bounds: data.bounds,
        nearMeBounds: null,
        userLoc: null
      });
    }
  }

  near_me = (data) => {
    if(data.nearMe){
      if(data.location){
        //have to manipulate to get actual bounds
        var latMax = data.location[0] + 0.5;
        var latMin = data.location[0] - 0.5;
        var lngMax = data.location[1] + ((50*1.0)/(111.320*Math.cos(data.location[0])));
        var lngMin = data.location[1] - ((50*1.0)/(111.320*Math.cos(data.location[0])));
        var locationsNearMe = [];
        var bounds = [];
        var north = null;
        var south = null;
        var east = null;
        var west = null;
        this.state.foodbanks.forEach((item) => {
          if ((latMin <= item.geometry.coordinates[1] && item.geometry.coordinates[1] <= latMax) && (lngMin <= item.geometry.coordinates[0] && item.geometry.coordinates[0] <= lngMax)) {
            locationsNearMe.push(item);
          }
        });
        locationsNearMe.forEach(function(item) {
          if (north == null || north < item.geometry.coordinates[0]) {
            north = item.geometry.coordinates[0];
          }
          if (south == null || south > item.geometry.coordinates[0]) {
            south = item.geometry.coordinates[0];
          }
          if (east == null || east < item.geometry.coordinates[1]) {
            east = item.geometry.coordinates[1];
          }
          if (west == null || west > item.geometry.coordinates[1]) {
            west = item.geometry.coordinates[1];
          }
        });
        if (
          north !== null &&
          south !== null &&
          east !== null &&
          west !== null
        ) {
          bounds.push([west, north]);
          bounds.push([east, south]);
        }
        this.setState({
          nearMeBounds: bounds,
          userLoc: data.location
        });
      }
    } else {
      this.setState({
        nearMeBounds: null
      });
    }
  }
  closeFilters(){
    if (window.innerWidth < 768){
      document.getElementById('allControls').style.display = "none";
    }
    
  }

  render () {
    return (
      <div className= "mainpage">
          <div className="nav-style">
            <NAV_BAR id="appNavbar"/>
          </div>
          <div className="overlap" id="appOverlap">
            <Overlay 
              foodbanks={this.state.foodbanks}
              provinces={this.state.provinces}
              cities={this.state.cities}
              handleUpdateListsProvince={this.updateLists_province}
              handleUpdateListsCity={this.updateLists_city}
              handleUpdateZoom={this.updateBounds}
              handleNearMe={this.near_me}
            />
          </div>
          <div class= "bgcolor">
          </div>
          <div id="map-style" onClick={this.closeFilters} onTouchMove={this.closeFilters}>
            <TheMap
              foodbanks={this.state.foodbanks}
              bounds={this.state.nearMeBounds ? this.state.nearMeBounds : this.state.bounds}
              userLoc={this.state.userLoc}
            />
          </div>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
      </div>
    );
  }
}

export default App;
