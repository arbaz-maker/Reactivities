import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import {v4 as uuid} from 'uuid';
import Navbar from './Navbar';
import ActivityDashboard from '../../Features/acitivity/dashboard/ActivityDashboard'
function App() {

  const [activities, setactivities] = useState<Activity[]>([]);
  const[selectedActivity,setselectedActivity]=useState<Activity | undefined>(undefined);
  const[editMode,setEditMode]=useState(false)
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        console.log(response.data);
        setactivities(response.data);
      })
      .catch((e) => {
        console.log(e);
      })

  }, [])

function handleSelectedActivity(id:string){
  setselectedActivity(activities.find(x=>x.id===id));
}
function handleCancelSelectActivity(){
  setselectedActivity(undefined);
}
function handleFormOpen(id?:string){
  id? handleSelectedActivity(id):handleCancelSelectActivity();
  setEditMode(true);
}
function handleFormClose(){
  setEditMode(false);
}
function handleCreateorEditActivity(activity:Activity){
  activity.id ? setactivities([...activities.filter(x=>x.id!== activity.id),activity])
  : setactivities([...activities,{...activity,id:uuid()}]);
  setEditMode(false);
  setselectedActivity(activity);
}
function handleDeleteActivity(id:string){
  setactivities([...activities.filter(x=>x.id !==id)])
}


  return (
    <Fragment >
      <Navbar openForm={handleFormOpen} />
      <Container style={{marginTop:'7em'}}>
       <ActivityDashboard
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectedActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createoredit={handleCreateorEditActivity}
        deleteactivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
