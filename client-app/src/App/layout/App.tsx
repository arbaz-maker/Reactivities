import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import {v4 as uuid} from 'uuid';
import Navbar from './Navbar';
import ActivityDashboard from '../../Features/acitivity/dashboard/ActivityDashboard'
import agent from '../api/Agent';
import LoadingComponent from './LoadingComponent';
function App() {

  const [activities, setactivities] = useState<Activity[]>([]);
  const[selectedActivity,setselectedActivity]=useState<Activity | undefined>(undefined);
  const[editMode,setEditMode]=useState(false);
  const [loading,setloading]=useState(true);
  const[submitting,setsubmitting]=useState(false)
  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        let activities:Activity[]=[];
        response.forEach(activity=>{
          activity.date=activity.date.split('T')[0];
          activities.push(activity);
        })
        setactivities(activities);
        setloading(false);
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
  setsubmitting(true);
  if(activity.id){
    agent.Activities.update(activity).then(()=>{
      setactivities([...activities.filter(x=>x.id!== activity.id),activity])
      setselectedActivity(activity);
      setEditMode(false);
      setsubmitting(false);
    })
  }
  else{
    activity.id=uuid();
    agent.Activities.create(activity).then(()=>{
      setactivities([...activities,activity]);
      setselectedActivity(activity);
      setEditMode(false);
      setsubmitting(false);

    })
  }
}
function handleDeleteActivity(id:string){
  setsubmitting(true);
  agent.Activities.delete(id)
  .then(()=>{
    setactivities([...activities.filter(x=>x.id !==id)])
    setsubmitting(false);
  })

}

if(loading) return <LoadingComponent content='Loading App' />;

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
        submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
