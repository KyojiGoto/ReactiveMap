import React, {Component} from 'react';
import Axios from 'axios';
import './overlay.css';
// import { findByLabelText } from '@testing-library/react';
import {NearMeCheckbox} from './nearMeCheckbox'
import redStatus from '../Images/StatusR.png'
import yellowStatus from '../Images/StatusY.png'
import greenStatus from '../Images/StatusG.png'
import undefStatus from '../Images/StatusU.png'

function statusImg(status) {
  // TODO: add undefined picture
  if (status === 'Undefined') {
    return undefStatus
  }
  else if (status === 'Low'){
    return redStatus
  }
  else if (status === 'Medium'){
    return yellowStatus
  }
  else{
    return greenStatus
  }
}
var province = '';
var city = '';

class Overlay extends Component {
  constructor(props){
    super(props);
    this.locNav = React.createRef(); 
  } 

  componentDidMount() {
    this.handleResetClick();
    if (window.innerWidth < 600){
      
    }
  }

  handleCheckedStatus() {
    var status = "";
    if (document.getElementById("Undefined").checked) {
      status += 'u';
    }
    if (document.getElementById("Low").checked) {
      status += 'l';
    }
    if (document.getElementById("Medium").checked) {
      status += 'm';
    }
    if (document.getElementById("High").checked) {
      status += 'h'
    }
    return status;
  }

  handleProvinceClick = (e) => {
    document.getElementById("cityDropdown").value='City'
    city = '';
    document.getElementById("nearMe").checked = false;
    var status = this.handleCheckedStatus();
    var url = "https://judicious-helpful-decimal.glitch.me/"
    if (e.target.value !== "Province") {
      url += "province/" + e.target.value + "/status/" + status;
      province = e.target.value;
    } else {
      province = '';
      url += "status/" + status;
    }
    Axios({
      method: "GET",
      url: (url),
    }).then(res => { this.props.handleUpdateListsProvince(res.data) });
  }

  handleCityClick = (e) => {
    var url = "https://judicious-helpful-decimal.glitch.me/"
    var status = this.handleCheckedStatus();
    document.getElementById("nearMe").checked = false;
    if (e.target.value !== "City") {
      url += "city/" + e.target.value + "/status/" + status;
      city = e.target.value;
      Axios({
        method: "GET",
        url: (url),
      }).then(res => { this.props.handleUpdateListsCity(res.data) });
    } else {
      city = '';
      if (province !== '') {
        url += "province/" + province + "/status/" + status;
      } else {
        url += "status/" + status;
      }
      Axios({
        method: "GET",
        url: (url),
      }).then(res => { this.props.handleUpdateListsProvince(res.data) });
    }
  }

  handleLocationClick = (e) => {
    this.props.handleUpdateZoom(e.target.value);
  }

  handleStatusClick = (e) => {
    var url = "https://judicious-helpful-decimal.glitch.me/"
    var status = this.handleCheckedStatus();
    document.getElementById("nearMe").checked = false;
    if(province === '') {
      if(city === ''){
        url += "status/" + status;
      } else {
        url += "city/" + city + "/status/" + status;
      }
      Axios({
        method: "GET",
        url: (url),
      }).then(res => { this.props.handleUpdateListsCity(res.data) });
    } else {
      if(city === ''){
        url += "province/" + province + "/status/" + status;
      } else {
        url += "city/" + city + "/status/" + status;
      }
      Axios({
        method: "GET",
        url: (url),
      }).then(res => { this.props.handleUpdateListsProvince(res.data) });
    }
  }

  handleResetClick = (e) => {
    document.getElementById("cityDropdown").value='City'
    document.getElementById("provinceDropdown").value='Province'
    document.getElementById("Undefined").checked = true;
    document.getElementById("Low").checked = true;
    document.getElementById("Medium").checked = true;
    document.getElementById("High").checked = true;
    document.getElementById("nearMe").checked = false;
    city = '';
    province = '';
    var url = "https://judicious-helpful-decimal.glitch.me/"
    Axios({
      method: "GET",
      url: (url),
    }).then(res => { this.props.handleUpdateListsProvince(res.data) });
  }

  handleNearMe = (location) => {
    var data = {nearMe: document.getElementById("nearMe").checked, location: []};
    if (data.nearMe){
      data.location = location;
    }
    this.props.handleNearMe(data);
  }
  showFilters() {
    if (document.getElementById("allControls").style.display !== "none"){
      document.getElementById("allControls").style.display = "none";
    }
    else{
      document.getElementById("allControls").style.display = "block";
    }
    
  }
  showLocations(){
    if (document.getElementById("locationsNav").style.display !== "none"){
      document.getElementById("locationsNav").style.display = "none";
    }
    else{
      document.getElementById("locationsNav").style.display = "block";
    }

  }

  render() {
    return (
      <div className="overlay-container" >
        <div class="accordeonBigWrapper">
          <nav className="navbar-light">
            {/* comment */}
            <button className="navbar-toggler filter-toggler" onClick={this.showFilters} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                Filter Locations
            </button>

            <div className="navbar-collapse filters" id="filtersNav">
            <div id="allControls">
              <div class ="allFilters">
                <div class="controlsLeft">
              
                  {/* checkbox */}
                  <NearMeCheckbox id="nearMe" 
                    handleNearMe={this.handleNearMe}
                  />
                {/* province dropdown */}
                <select class="btn btn-secondary btn-sm custbut" id="provinceDropdown" onChange={this.handleProvinceClick}>
                  <option selected="selected" value={"Province"}>Province</option>
                  {this.props.provinces ? this.props.provinces.map((object, i) => <option key={i} value={object[1]}>{object[0]}</option>) : <tbody><tr><td><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></td></tr></tbody>}
                </select>

                {/* city dropdown */}
                <select class="btn btn-secondary btn-sm custbut" id="cityDropdown" onChange={this.handleCityClick}>
                  <option selected="selected" value={"City"}>City</option>
                  {this.props.cities ? this.props.cities.map((object, i) => <option key={i} value={object}>{object}</option>) : <tbody><tr><td><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></td></tr></tbody>}
                </select>
                </div>
                
                    <div class="controlsRight">
                      <h5>Supply Level:</h5>
                      <div class="checkboxes"></div>
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="Undefined" defaultChecked onClick={this.handleStatusClick}/>
                        <label class="custom-control-label" for="Undefined">Undefined</label>
                      </div>
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="Low" defaultChecked onClick={this.handleStatusClick}/>
                        <label class="custom-control-label" for="Low">Low</label>
                      </div>
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="Medium" defaultChecked onClick={this.handleStatusClick}/>
                        <label class="custom-control-label" for="Medium" checked>Medium</label>
                      </div>
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="High" defaultChecked onClick={this.handleStatusClick}/>
                        <label class="custom-control-label" for="High">High</label>
                      </div>
                    </div>
                </div>
                <div class="resetButt">
                      <button type="button" class="btn btn-lg btn-block reset" onClick={this.handleResetClick}>Reset Filters</button>
                    </div>
              </div>
            </div>
          </nav>
        </div>
        {/* ////Locations/////////// */}
        <nav className="navbar-light locnav" ref="locationNav" locNav={this.locNav} id="locNav">
           {/* comment */}
           <button className="navbar-toggler filter-toggler" type="button" data-toggle="collapse" data-target="#locationsNav" aria-controls="locationNav" aria-expanded="false" aria-label="Toggle navigation" onClick={this.showLocations}>
              Locations
          </button>
          <div className="navbar-collapse locnav" id="locationsNav">
            <div className="locs">
            <table class="clr" style={{width: "100%"}}>
              <tr style={{width: "100%"}}>
                <th class="tabloc">Locations</th>
                <th class = "tabstat">Status</th>
              </tr>
            </table>
            <div className = "loctable">
              <table style={{width: "100%", marginLeft: "3%", marginRight: "3%"}}>
                {this.props.foodbanks ? this.props.foodbanks.map((object, i) => <tbody><tr><td class="tabloc"><button class="locbutt" type="button" onClick={this.handleLocationClick} value={[object.geometry.coordinates[1], object.geometry.coordinates[0]]}>{object.properties.name}</button></td><td class="tabstat"><img src={statusImg(object.properties.status)} /></td></tr></tbody>) : <tbody><tr><td><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></td></tr></tbody>}
              </table>
            </div>
            
        </div>  

        
          </div>
        </nav>

        
      </div>
      )

    }
  }
  
  export default Overlay