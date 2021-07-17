import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { useStore } from "../../../App/stores/store";
import {v4 as uuid} from 'uuid';

export default  observer( function ActivityForm() {
   
    const history=useHistory();
    const{activityStore}=useStore();
    const {loadingInitial,createActivity,updateActivity,loading,loadActivity}=activityStore;
    const[activity,setActivity]=useState({
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:'',
    });
    const {id}=useParams<{id:string}>();


    useEffect(()=>{
        if(id) loadActivity(id).then((activity)=>{setActivity(activity!)

        })
    },[id,loadActivity])




    function handleSubmit(){
        if(activity.id.length===0) {
        let newActivity={
            ...activity,id:uuid()
        }
        createActivity(newActivity).then(()=>{history.push(`/activities/${newActivity.id}`)});
        }else{
            updateActivity(activity).then(()=>{history.push(`/activities/${activity.id}`)})
        }
        
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value}=event.target;
        setActivity({...activity,[name]:value})

    }

    if(loadingInitial) return<LoadingComponent content='loading activity ...' />

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
                <Button floated='right' as={Link} to='/activities' positive type='button' content='Cancel'  value={activity.title} name='title' onChange={handleInputChange} />
            </Form>
        </Segment>
    )
})