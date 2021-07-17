import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../Features/acitivity/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../Features/home/HomePage';
import ActivityForm from '../../Features/acitivity/form/ActivityForm';
import ActivityDetails from '../../Features/acitivity/details/ActivityDetails';
function App() {

  const location=useLocation();

  return (
    <Fragment >
      <Route exact path='/' component={HomePage}/>
      <Route 
      path={'/(.+)'}
      render={()=>(
        <>
      <Navbar  />
      <Container style={{marginTop:'7em'}}>
       <Route  exact path='/activities' component={ActivityDashboard}/>
       <Route exact path='/activities/:id' component={ActivityDetails}/>
       <Route key={location.key}  exact path={['/createactivity','/manage/:id']} component={ActivityForm}/>
      </Container>
        </>
      )}
      />
     
    </Fragment>
  );
}

export default observer(App);
