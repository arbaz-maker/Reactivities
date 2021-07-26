import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../Features/acitivity/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../Features/home/HomePage';
import ActivityForm from '../../Features/acitivity/form/ActivityForm';
import ActivityDetails from '../../Features/acitivity/details/ActivityDetails';
import TestErrors from '../../Features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../Features/errors/NotFound';
import ServerError from '../../Features/errors/serverError';
function App() {

  const location=useLocation();

  return (
    <Fragment >
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage}/>
      <Route 
      path={'/(.+)'}
      render={()=>(
        <>
      <Navbar  />
      <Container style={{marginTop:'7em'}}>
        <Switch>
       <Route  exact path='/activities' component={ActivityDashboard}/>
       <Route exact path='/activities/:id' component={ActivityDetails}/>
       <Route key={location.key}  exact path={['/createactivity','/manage/:id']} component={ActivityForm}/>
      <Route path='/errors' component={TestErrors}/>
      <Route path='/server-error' component={ServerError}/>

      <Route component={NotFound}/>
      </Switch>
      </Container>
        </>
      )}
      />
     
    </Fragment>
  );
}

export default observer(App);
