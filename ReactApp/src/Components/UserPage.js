import React from 'react';
import './UserPage.scss'
import NavBar from './Nav';
import Axios from 'axios';
import { Map, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { redMark, yellowMark, greenMark, undefMark } from "./constants";
import 'react-leaflet-markercluster/dist/styles.min.css';

var baseURL = "https://judicious-helpful-decimal.glitch.me"

class userPage extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            foodbank: null
        };
    }

    componentDidMount() {
        Axios({
            method: 'post',
            url: baseURL + '/getBank',
            withCredentials: true,
            data: {
                foodbank: window.localStorage.getItem("foodbank")
            }
          }).then(res => this.loadFoodbank(res.data));
    }

    getColor(status) {
        if(status === "Low"){
            document.getElementById("statusDropdown").style.backgroundColor = "#ff4747";
        }
        else if(status === "Medium"){
            document.getElementById("statusDropdown").style.backgroundColor = "#ffd46e";
        }
        else if (status === "High"){
            document.getElementById("statusDropdown").style.backgroundColor = "#3deb00";
        }
        else{
            document.getElementById("statusDropdown").style.backgroundColor = "#6c757d";
        }
    }

    loadFoodbank = (data) => {
        this.setState({
            foodbank: data.foodbank
        });
        document.getElementById("statusDropdown").value = this.state.foodbank? this.state.foodbank.properties.status: "Undefined";
        document.getElementById("statusDropdown").style.backgroundColor = this.getColor(this.state.foodbank.properties.status);
    }
    
    buttonColor = (e) => {
        Axios({
            method: 'post',
            url: baseURL + '/updateBank',
            withCredentials: true,
            data: {
                foodbank: this.state.foodbank.properties.name,
                status: e.target.value
            }
          }).then(res => this.loadFoodbank(res.data));
    }

    setIcon (status) {
        // TODO: add undefined picture
        if (status === 'Undefined') {
          return undefMark
        }
        else if (status === 'Low'){
          return redMark
        }
        else if (status === 'Medium'){
          return yellowMark
        }
        else{
          return greenMark
        }
      }

    render() {
        return (
            <div className="userPage">
                <div className="nav-style">
                    <NavBar/>
                </div>
                <div class="setContainer">
                    
                    <div class="foodbankInfo">
                        <div class="fbName">
                            <h2>{this.state.foodbank? this.state.foodbank.properties.name : "...Loading" }</h2>
                            <h4>{this.state.foodbank? this.state.foodbank.properties.address : "...Loading" }</h4>
                            <h4 id="currStatus">Status: {this.state.foodbank? this.state.foodbank.properties.status : "...Loading" }</h4>
                            <Map 
                                id='map' 
                                center={[56.1304, -106.3468]} 
                                zoom={2} 
                                zoomControl={false} 
                                worldCopyJump={true} 
                                maxBounds={[[-90, -Infinity],[90, Infinity]]} 
                                maxBoundsViscosity={0.2} 
                                boundsOptions={{padding: [50, 50]}}
                            >
                                <ZoomControl position="bottomright" />
                                <TileLayer
                                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                                {this.state.foodbank? 
                                <Marker position={L.latLng(this.state.foodbank.geometry.coordinates[1], this.state.foodbank.geometry.coordinates[0])} icon={this.setIcon(this.state.foodbank.properties.status)}>
                                    <Popup>
                                        <b> {this.state.foodbank.properties.name} </b> <br />  {this.state.foodbank.properties.address}  <br /> Status:      {this.state.foodbank.properties.status}
                                    </Popup>
                                </Marker>: null}
                            </Map>
                        </div>
                    </div>
                    <div class="statCntrl">
                        <div class="switch">
                            <h3>Change your foodbanks supply status:</h3>
                            <div class="select">
                                <select class="btn btn-secondary" id="statusDropdown" onChange={this.buttonColor}>
                                    <option class="selection" value="Undefined">Undefined</option>
                                    <option class="selection"  value="Low">Low</option>
                                    <option class="selection"  value="Medium">Medium</option>
                                    <option class="selection" value="High">High</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default userPage;