import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { useStore } from "../../../App/stores/store";
import {v4 as uuid} from 'uuid';
import { Formik,Form } from "formik";
import * as  Yup from 'yup';
import MyTextInput from "../../../App/common/form/MyTextInput";
import MyTextArea from "../../../App/common/form/MyTextArea";
import MySelectInput from "../../../App/common/form/MySelectInput";
import { CatergoryOptions } from "../../../App/common/options/CategoryOptions";
import MyDateInput from "../../../App/common/form/MyDateInput";
import { Activity } from "../../../App/models/activity";
export default  observer( function ActivityForm() {
   
    const history=useHistory();
    const{activityStore}=useStore();
    const {loadingInitial,createActivity,updateActivity,loading,loadActivity}=activityStore;
    const[activity,setActivity]=useState<Activity>({
        id:'',
        title:'',
        category:'',
        description:'',
        date:null,
        city:'',
        venue:'',
    });
    const validationSchema=Yup.object({
        title:Yup.string().required('The acitivity title is required'),
        description:Yup.string().required('The description is required'),
        category:Yup.string().required(),
        venue:Yup.string().required(),
        date:Yup.string().required('date is required').nullable(),
        city:Yup.string().required(),

    })
    const {id}=useParams<{id:string}>();


    useEffect(()=>{
        if(id) loadActivity(id).then((activity)=>{setActivity(activity!)

        })
    },[id,loadActivity])




    function handleFormSubmit(activity:Activity){
        if(activity.id.length===0) {
        let newActivity={
            ...activity,id:uuid()
        }
        createActivity(newActivity).then(()=>{history.push(`/activities/${newActivity.id}`)});
        }else{
            updateActivity(activity).then(()=>{history.push(`/activities/${activity.id}`)})
        }
        
    }

    if(loadingInitial) return<LoadingComponent content='loading activity ...' />

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={activity} 
            onSubmit={values=>handleFormSubmit(values)}>
                {({handleSubmit,isValid,isSubmitting,dirty})=>(
                     <Form className='ui form' onSubmit={handleSubmit}>
                        <MyTextInput name='title' placeholder='Title' />
                     <MyTextArea rows={3} placeholder='Description' name='description'  />
                     <MySelectInput options={CatergoryOptions} placeholder='Category'  name='category'  />
                     <MyDateInput  
                     name='date'
                     placeholderText='Date'
                     showTimeSelect
                     timeCaption='time'
                     dateFormat="MMMM d,yyyy h:mm aa"
                     />
                    <Header content="Location Details" sub color='teal' />

                     <MyTextInput placeholder='City'  name='city'  />
                     <MyTextInput placeholder='Venue'  name='venue'  />
                     <Button 
                     disabled={isSubmitting || !dirty || !isValid}
                     floated='right' 
                     loading={loading} 
                     positive type='submit' 
                     content='Submit' 
                     value={activity.title} 
                     name='title'
                       />
                     <Button floated='right' as={Link} to='/activities' positive type='button' content='Cancel'  value={activity.title} name='title'  />
                 </Form>
                )}
            </Formik>
           
        </Segment>
    )
})