import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { randomSgCoord } from '../../helperFunctions'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(driver) {
  return {
    name: driver.name,
    active: 'true',
    routes: [
      driver.origin, driver.destination
    ],
    allocations: driver.allocations ? driver.allocations : []
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
                Routes
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
                        {routesRow["lat"]}
                      </TableCell>
                      <TableCell>{routesRow["lng"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>


{/* 
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Allocations
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Items</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.routes.map((routesRow, key) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {routesRow["lat"]}
                      </TableCell>
                      <TableCell>{routesRow["lng"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
 */}




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

export default function DriverTable(props) {
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