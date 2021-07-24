import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

// const postItem = async (driver) => {
//   let res = await axios.post("http://13.229.188.217/delivery/addItem", {
//     "index": driver.index,
//     "origin_latitude": driver.origin.lat,
//     "origin_longitude": driver.origin.lng,
//     "destination_latitude": driver.destination.lat,
//     "destination_longitude": driver.destination.lng
//   })

// }

function createData(driver) {
  // postItem(driver)
  return {
    name: driver['name'],
    active: true,
    routes: [
      driver['origin'], driver['destination']
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.active}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Origin Coordinates, Destination Coordinates
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Latitude</TableCell>
                    <TableCell>Longitude</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.routes.map((routesRow, key) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {console.log(routesRow)}
                        {routesRow["lat"]}
                      </TableCell>
                      <TableCell>{routesRow["lng"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    routes: PropTypes.arrayOf(
      PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired
  }).isRequired,
};

export default function ItemTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Active</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.length != 0 ? props.data.map((driver) => {
              return (
                <Row key={driver.name} row={createData(driver)} />
          )}) 
          :<></>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}