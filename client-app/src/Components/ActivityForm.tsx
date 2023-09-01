import React, { ChangeEvent, useEffect, useState } from 'react';
import { useStore } from '../app/stores/store';
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from 'react-router-dom';


export default observer(function ActivityForm() {

    // Mobx
    const {activityStore} = useStore();
    const {closeEdit, isLoading, createActivity, updateActivity, loadActivity} = activityStore;
    
    // Use params
    const {id} = useParams();

    // Navigate
    const navigate = useNavigate();

    // Activity 
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    // Fetch activity if edit, else load empty activity
    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        } 
        else {
            setActivity({
                id: '',
                title: '',
                date: '',
                description: '',
                category: '',
                city: '',
                venue: ''
            });
        }
    }, [id, loadActivity])

    
    // Update value when user input
    function updateForm(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    // Submit
    function submit(event: React.FormEvent){
        event.preventDefault();
        try {
            // Create 
            if(activity.id.length === 0) {
                createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
            }
            // Update
            else {
                updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
            }
        } catch (error) {
            console.log(error);
            
        }               
    }

    

    return (
        <>
        <div className="close w-full flex justify-end">
            <i onClick={closeEdit} className="fa-solid fa-xmark text-2xl cursor-pointer"></i>
        </div>

        <form onSubmit={submit} className="w-full bg-[#7F5A83] p-5 flex flex-col gap-5 rounded-lg" autoComplete='false'>
            <input className='input-field' type="text" name='title' value={activity.title} placeholder='Title' 
                onChange={updateForm}
            />
            <textarea className='input-field' rows={5} name='description' value={activity.description} placeholder='Description'
                onChange={updateForm}
            ></textarea>
            <input className='input-field' type="text" name='category' value={activity.category} placeholder='Category' 
                onChange={updateForm}
            />
            <input className='input-field' type="date" name='date' value={activity.date} placeholder='Date' 
                onChange={updateForm}
            />
            <input className='input-field' type="text" name='venue' value={activity.venue} placeholder='Venue' 
                onChange={updateForm}
            />
            <input className='input-field' type="text" name='city' value={activity.city} placeholder='City' 
                onChange={updateForm}
            />
            
            <button type='submit' className='w-full py-2 btn-secondary font-semibold tracking-wider'>
                Submit
                {isLoading && <i className="fa-solid fa-circle-notch animate-spin ml-5" /> }
                
            </button>
        </form>
        </>
    )
})