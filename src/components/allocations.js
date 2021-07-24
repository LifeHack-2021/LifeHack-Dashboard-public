import React, { useEffect, useState } from 'react'
import DriverTable from './templates/driverTable';
import ItemTable from './templates/itemTable';

import { Grid, TextField, Button, List, Typography, ListItem, Avatar, ListItemAvatar, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import { randomSgCoord } from '../helperFunctions';
import axios from 'axios';

export default function Allocations(props) {

    const [newItemName, setNewItemName] = useState([])
    
    const onNewItemUpdate = e => setNewItemName(e.target.value)

    const addNewItemRoute = async (item) => {
        try {
            let res = await axios.post('http://13.229.188.217/delivery/addItem', {
                "index": item.index,
                "origin_latitude": item.origin.lat,
                "origin_longitude": item.origin.lng,
                "destination_latitude": item.destination.lat,
                "destination_longitude": item.destination.lng
            })
        } catch (err) {
            console.log(err)
        }
    }

    const addNewItem = () => {
        let newItemsArray = props.items
        let newItem = {name: newItemName, origin: randomSgCoord(), destination: randomSgCoord(), index: props.items.length}
        newItemsArray.push(newItem)
        addNewItemRoute(newItem)
        props.setItems(newItemsArray)
        setNewItemName("")
    }

    return (
        <>
        <Typography>
            This is the Allocations Page
            this will contain the list of drivers and the list of the items with their location
            
            when someone clicks allocate, the drivers will be allocated to the item and the routes will show in the maps page
        </Typography>
        <Grid container>
            <Grid item xs={5}>
                <DriverTable data={props.drivers} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                <ItemTable data={props.items} />  
            </Grid>
        </Grid>
        <Grid container>
        <Grid item xs={3}>

                <Grid container spacing={3} alignItems="center">
                    <Grid item>
                        <TextField onChange={onNewItemUpdate} id="standard-basic" label="Item Name" />
                    </Grid>
                    <Grid item>
                        <Button onClick={addNewItem} variant="outlined" color="secondary">
                            Add Item
                        </Button>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <List dense={true}>
                        {
                             props.items.length != 0 ? props.items.map((item, key) => {
                                return (
                                    
                                    <ListItem key={key}>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.name}
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
            <Grid item xs={9}></Grid>
        </Grid>
        </>
    )
}