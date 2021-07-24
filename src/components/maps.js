import React, { useEffect, useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import { randomSgCoord, getPath } from '../helperFunctions'
import { Grid, Button } from '@material-ui/core'
import MultipleSelect from './templates/multipleSelect'


let MapComponent = withScriptjs(withGoogleMap((props) => {
    const [newRouteActive, setNewRouteActive] = useState(false)
    const [directionsArray, setDirectionsArray] = useState({})
    const [adjustedDirectionsArray, setAdjustedDirectionsArray] = useState({})
    const [selectedDrivers, setSelectedDrivers] = useState([])

    const toggleNewRoute = () => {
      setNewRouteActive(!newRouteActive)
    }

    const getAllRoutes = () => {
      props.allDrivers.forEach((e)=> {
        const google = window.google
        const newDirectionsService = new google.maps.DirectionsService();
        newDirectionsService.route({
            origin: new google.maps.LatLng(e.origin.lat, e.origin.lng),
            destination: new google.maps.LatLng(e.destination.lat, e.destination.lng),
            travelMode: google.maps.TravelMode.DRIVING
          }, (result, status) => { 
            if (status === google.maps.DirectionsStatus.OK) {
              setDirectionsArray(directionsArray => {
                let newArray = directionsArray
                newArray[e.name] = result
                return newArray
              })
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
      })
    }

    const getAllNewRoutes = () => {
      props.driversWithNewCoord.forEach((e)=> {
        const google = window.google
        let myIndex = e.itemIndex == "" ? 0 : parseInt(e.itemIndex)
        console.log("HEREE", props.itemList[myIndex])
        const newDirectionsService = new google.maps.DirectionsService();
        newDirectionsService.route({
            origin: new google.maps.LatLng(e.origin.lat, e.origin.lng),
            destination: new google.maps.LatLng(e.destination.lat, e.destination.lng),
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: [
              {
                  location: new google.maps.LatLng(1.315218,  103.824921)
              }
          ]
          }, (result, status) => { 
            if (status === google.maps.DirectionsStatus.OK) {
              setAdjustedDirectionsArray(directionsArray => {
                let newArray = directionsArray
                newArray[e.name] = result
                return newArray
              })
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
      })
    }

    useEffect(() => {
      getAllRoutes()
      getAllNewRoutes()
    }, [])
  
    return (
      <>
      <Grid container>
        <Grid item xs={12}>
          {console.log(directionsArray)}
          <MultipleSelect allData={props.allDrivers} data={selectedDrivers} setData={setSelectedDrivers} />
          <Button onClick={toggleNewRoute} variant="contained" color="primary">
              Toggle New Route
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
        <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
        >
        {
          newRouteActive ? 
          selectedDrivers.map((driver) => {
            return (<DirectionsRenderer directions={directionsArray[driver]} />)
          })
          : selectedDrivers.map((driver) => {
            return (<DirectionsRenderer directions={adjustedDirectionsArray[driver]} />)
          })
        }
        </GoogleMap>
        </Grid>
      </Grid>
      </>
    )
  }
  
  ))

export default MapComponent