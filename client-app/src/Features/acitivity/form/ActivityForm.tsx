import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../App/stores/store";

export default  observer( function ActivityForm() {
    
    const{activityStore}=useStore();
    const {selectedActivity,closeForm,createActivity,updateActivity,loading}=activityStore;
    const initialState= selectedActivity ?? {
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:'',
    }
    const[activity,setActivity]=useState(initialState)
   
    function handleSubmit(){
        activity.id ? updateActivity(activity):createActivity(activity);
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value}=event.target;
        setActivity({...activity,[name]:value})

    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.Input placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date'  value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated='right' loading={loading} positive type='submit' content='Submit' value={activity.title} name='title' onChange={handleInputChange} />
                <Button floated='right' positive type='button' content='Cancel' onClick={closeForm} value={activity.title} name='title' onChange={handleInputChange} />
            </Form>
        </Segment>
    )
})