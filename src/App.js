import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrimaryAppBar from './components/templates/primaryAppBar';
import MiniDrawer from './components/templates/miniDrawer';

import MapComponent from './components/maps'
import Drivers from './components/drivers'
import Allocations from './components/allocations'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [driversWithNewCoord, setDriversWithNewCoord] = React.useState([])
  const [items, setItems] = React.useState([])
  const [drivers, setDrivers] = React.useState([])

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <PrimaryAppBar classes={classes} open={open} handleDrawerOpen={handleDrawerOpen} />
        <MiniDrawer open={open} handleDrawerClose={handleDrawerClose} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path='/Drivers'>
              <Drivers driversWithNewCoord={driversWithNewCoord} setDriversWithNewCoord={setDriversWithNewCoord} drivers={drivers} setDrivers={setDrivers} />
            </Route>
            <Route path='/Allocations'>
              <Allocations items={items} setItems={setItems} drivers={drivers} setDrivers={setDrivers} />
            </Route>
            <Route path='/'>
              <MapComponent
                  driversWithNewCoord={driversWithNewCoord}
                  itemList={items}
                  allDrivers={drivers}
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBpRTg2qHFjwD2f7dO0upMRrvjbkCc8cwU&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={< div style={{ height: `100%` }
                  } />}
                  containerElement={<div style={{ height: `500px` }} />}
                  mapElement={< div style={{ height: `100%` }} />}
              />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;







// export default function App() {
//   return (
//     <>
//       <h1>Delivery Dashboard</h1>
      // <MapComponent
      //     isMarkerShown
      //     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBpRTg2qHFjwD2f7dO0upMRrvjbkCc8cwU&v=3.exp&libraries=geometry,drawing,places"
      //     loadingElement={< div style={{ height: `100%` }
      //     } />}
      //     containerElement={< div style={{ height: `800px` }} />}
      //     mapElement={< div style={{ height: `100%` }} />}
      // />
//     </>
//   );
// }