import React from 'react';
import {geolocated} from 'react-geolocated';

class Checkbox extends React.Component {

    handleClick = (e) => {
        if (document.getElementById("nearMe").checked){
            if(this.props.coords){
                var locations = [this.props.coords.latitude, this.props.coords.longitude];
                this.props.handleNearMe(locations); 
            }
        } else {
          this.props.handleNearMe(null); 
        }
    }

  render() {
      if (!this.props.isGeolocationAvailable || !this.props.isGeolocationEnabled) {
        return (<div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input disabled" id="nearMe" onClick={this.handleClick} disabled/>
            <label class="custom-control-label" for="nearMe" >Near Me</label>
        </div>);
      } else {
        return (<div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="nearMe" onClick={this.handleClick}/>
            <label class="custom-control-label" for="nearMe">Near Me</label>
        </div>);
      }
  }
}

export const NearMeCheckbox = geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Checkbox);