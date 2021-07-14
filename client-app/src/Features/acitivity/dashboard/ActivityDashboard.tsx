import React from "react";
import { Grid } from "semantic-ui-react";
import {Activity} from '../../../App/models/activity';
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities:Activity[];
    selectedActivity:Activity | undefined;
    selectActivity:(id:string)=>void;
    cancelSelectActivity:()=>void;
    editMode:boolean;
    openForm:(id:string)=>void;
    closeForm:()=>void;
    createoredit:(activity:Activity)=>void;
    deleteactivity:(id:string)=>void;
}
export default function ActivityDashboard({deleteactivity,activities,selectActivity,selectedActivity,cancelSelectActivity,closeForm,openForm,editMode,createoredit}:Props ) {


    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList activities={activities} 
               selectActivity={selectActivity}
               deleteactivity={deleteactivity}
               />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                activity={selectedActivity} 
                cancelSelectedActivity={cancelSelectActivity}
                openForm={openForm}
                />}
                {editMode &&
                <ActivityForm
                closeForm={closeForm}
                activity={selectedActivity}
                createoredit={createoredit}
                />
                }
            </Grid.Column>
        </Grid>
    )
}