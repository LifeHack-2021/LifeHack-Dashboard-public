import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button, List, ListItem, Avatar, ListItemAvatar, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios'


import DriverTable from './templates/driverTable';
import { randomSgCoord } from '../helperFunctions';

const styles = {
done: {
    textDecoration: "line-through",
    opacity: ".5",
    display: "flex",
    width: "100%"
},
header: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
},
main: {
    width: "100%",
    maxWidth: "400px",
    margin: "20px auto"
},
card: {
    padding: "20px",
    margin: "20px 0"
},
todo: {
    position: "relative",
    display: "flex",
    flexFow: "row",
    alignContent: "space-between"
},
label: {
    display: "flex",
    width: "100%"
},
divider: {
    position: "absolute",
    width: "100%",
    top: 0
}
};

export default function Drivers(props) {

    const [newDriver, setNewDriver] = useState("")

    const onNewDriverUpdate = e => setNewDriver(e.target.value)

    const addNewItemRoute = async (driver) => {
        try {
            let res = await axios.post('http://13.229.188.217/delivery/addDriver', {
                "index": 1,
                "origin_latitude": driver.origin.lat,
                "origin_longitude": driver.origin.lng,
                "destination_latitude": driver.destination.lat,
                "destination_longitude": driver.destination.lng
            })
            let data = await res["data"]
            // console.log(res.data)



            let newArray = props.driversWithNewCoord
            newArray.push({name: driver.name, origin: {lat: driver.origin.lat, lng: driver.origin.lng}, destination: {lat: driver.destination.lat, lng: driver.destination.lng}, itemIndex: data})
            props.setDriversWithNewCoord(newArray)

        } catch (err) {
            console.log(err)
        }
    }

    const addNewDriver = () => {
        let newDriverArray = props.drivers
        let pushedObject = {name: newDriver, origin: randomSgCoord(), destination: randomSgCoord(), index: props.drivers.length}
        newDriverArray.push(pushedObject)
        addNewItemRoute(pushedObject)
        props.setDrivers(newDriverArray)
        setNewDriver("")
    }
    
    return (
        <>
        <Grid container>
            <Grid item xs={3}>

                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <TextField onChange={onNewDriverUpdate} id="standard-basic" label="Driver's Name" />
                        </Grid>
                        <Grid item>
                            <Button onClick={addNewDriver} variant="outlined" color="secondary">
                                Add Driver
                            </Button>
                        </Grid>
                    </Grid>
                    
                    <Grid container>
                        <Grid item xs={12}>
                            <List dense={true}>
                            {
                                props.drivers.length != 0 ? props.drivers.map((driver, key) => {
                                    return (
                                        
                                        <ListItem key={key}>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={driver.name}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                }) : <></>
                            }
                            </List>
                        </Grid>
                    </Grid>

            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={8}>
                <DriverTable data={props.drivers} />
            </Grid>

        </Grid>

        </>
    )
}

{/* 
        {tasks.length > 0 && (
          <Card style={styles.card}>
            <FormGroup>
              {tasks.map((task, index) => (
                <div key={index} style={styles.todo}>
                  {index > 0 ? <Divider style={styles.divider} /> : ""}
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={!task.done}
                        onChange={() => this.toggle(task)}
                      />
                    }
                    label={task.text}
                    style={task.done ? styles.done : styles.label}
                  />
                  <Tooltip title="Delete task" placement="top">
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.deleteTask(task)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ))}
            </FormGroup>
          </Card>
        )}
      </div> */}