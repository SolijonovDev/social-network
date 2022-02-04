import React from 'react'
import { Container, Grid } from "@material-ui/core";
import MUsers from "./MUsers/MUsers";
import MNavbar from "./Navbar/MNavbar";
import MDrawer from "./Drawer/Drawer";
import { makeStyles } from "@material-ui/styles";
import Registratsiya from './Registratsiya';
import Login from './Login/index';
import { useSelector } from 'react-redux';
import { Switch,Route,Redirect } from 'react-router-dom'
import Chat from './Dialogs/Dialogs'
import Group from './Guruhlar/Guruhlar'
import Channel from './Kanallar/Kanallar'

const useStyles=makeStyles((theme)=>({
  cont:{
    width: "100vw",
    height: "100vh",
    minHeight:"350px"
  },
  root:{
    backgroundColor:'rgba(0,0,0,.4)',
    height:"100%",
    overflow:"visible"
  }
}))

export default function SidebarRouter() {
  const {isAuth}=useSelector(state=>state.auth)
  const styles=useStyles()
  return (
    <div>
      {isAuth ?
        <Container maxWidth="lg" className={styles.cont}>
          <Grid item container xs={12} className={styles.root}>
            <Grid item xs={5} style={{ boxSizing: "border-box", position: "relative", padding: "60px 0 20px", height: "100%", maxHeight: "100vh" }}>
              <MNavbar />
              <MUsers />
            </Grid>
            <Grid item xs={7}>
              <Switch>
                <Route path="/chat/:id?" component={Chat} />
                <Route path="/channel/:id?" component={Channel} />
                <Route path="/group/:id?" component={Group} />
                <Redirect to="/" />
              </Switch>
            </Grid>
          </Grid>
          <MDrawer />
        </Container>
        :
        <Switch>
          <Route path="/registration" component={Registratsiya} />
          <Route path="/login" component={Login} />
          <Redirect to="/registration" />
        </Switch>
      }
    </div>

  )
}

