import React from "react";
import { SyntheticEvent } from "react";
import { useState } from "react";

import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from '../../../App/models/activity';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteactivity: (id: string) => void;
    submitting: boolean;

}
export default function ActivityList({ submitting, deleteactivity, activities, selectActivity }: Props) {
    const[target,settarget]=useState('');

    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
        settarget(e.currentTarget.name);
        deleteactivity(id);

    }
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description} </div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={() => { selectActivity(activity.id) }} />
                                <Button
                                    name={activity.id}
                                    floated='right' 
                                    loading={submitting && target===activity.id} 
                                    content='Delete' 
                                    color='red' 
                                    onClick={(e) => { handleActivityDelete(e,activity.id) }}
                                    
                                    />

                                <Label basic content={activity.category} />

                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}