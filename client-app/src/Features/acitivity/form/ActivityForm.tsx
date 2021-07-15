import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import {Activity} from '../../../App/models/activity';

interface Props{
    activity:Activity|undefined;
    closeForm:()=>void;
    createoredit:(activity:Activity)=>void;
    submitting:boolean;

}
export default function ActivityForm({submitting,createoredit,activity:selectedActivity,closeForm}:Props) {
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
        createoredit(activity);
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
                <Button floated='right' loading={submitting} positive type='submit' content='Submit' value={activity.title} name='title' onChange={handleInputChange} />
                <Button floated='right' positive type='button' content='Cancel' onClick={closeForm} value={activity.title} name='title' onChange={handleInputChange} />
            </Form>
        </Segment>
    )
}