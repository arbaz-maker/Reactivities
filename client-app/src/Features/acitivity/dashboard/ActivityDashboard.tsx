import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { useStore } from "../../../App/stores/store";
import ActivityList from "./ActivityList";

export default observer( function ActivityDashboard() {

    const{activityStore}=useStore();
    
  const {loadActivities,activityRegistry}=activityStore

  useEffect(() => {
   if(activityRegistry.size<=1){
    loadActivities();

   }

  }, [activityRegistry.size,loadActivities])





if(activityStore.loadingInitial) return <LoadingComponent content='Loading App' />;
    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList  
               
               />
            </Grid.Column>
            <Grid.Column width='6'>
           <h1>Activity filter=</h1>
            </Grid.Column>
        </Grid>
    )
}
)