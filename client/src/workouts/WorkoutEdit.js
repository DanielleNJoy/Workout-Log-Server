/* eslint-disable no-whitespace-before-property */
import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState (props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState (props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState (props.workoutToUpdate.result);

    const workoutUpdate = (event, workout) => {
        event.preventDefault();
        fetch(`http://localhost:3000/log/${props.workoutToUpdate.id}`, {
            method:'PUT',
            body:JSON.stringify({
                log:{
                    description:editDesc,
                    definition:editDef,
                    result:editRes
                }
            }),
            headers:new Headers ({
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${props.token}`
            })
        }) .then ((res) => {
            props.fetchWorkouts();
            props.updateOff();
        })
    }

    return (
        <Modal isOpen={true}>
            <ModalHeader>Log a Workout</ModalHeader>
            <ModalBody>
                <Form onSubmit= {(e) => workoutUpdate(e) }>
                    <FormGroup>
                        <Label htmlFor='result'>Edit Result</Label>
                        <Input name='result' value={editRes} onChange={(e) => setEditRes(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='result'>Edit Description</Label>
                        <Input name='description' value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='result'>Edit Definition</Label>
                        <select name='definition' value={editDef} onChange={(e) => setEditDef(e.target.value)}>
                        <option></option>
                        <option value="Time">Time</option>
                        <option value='weight'>Weight</option>
                        <option value='distance'>Distance</option>
                        </select>
                    </FormGroup>
                    <Button type='submit'>Update Workout</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default WorkoutEdit;