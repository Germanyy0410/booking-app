import PhotoUploader from "../components/PhotoUploader.jsx";
import Perks from "../components/Perks.jsx";
import {useState} from "react";
import axios from "axios";
import AccountNavigation from "../components/AccountNavigation.jsx";
import {Navigate} from "react-router-dom";

export default function PlaceFormPage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);

    const [redirect, setRedirect] = useState(false);
    function inputHeader(text) {
        return (<h2 className="text-2xl mt-4">{text}</h2>);
    }

    function inputDescription(text) {
        return (<p className="text-gray-500 text-sm">{text}</p>)
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function addNewPlace(ev) {
        ev.preventDefault();

        await axios.post('/places', {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuest});
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div>
            <AccountNavigation/>
            <form onSubmit={addNewPlace}>
                {preInput('Title', 'title for your place should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)}
                       placeholder={"My lovely apartment"}/>

                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}
                       placeholder={"Address"}/>

                {preInput('Photo', 'Asset of your place')}
                <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

                {preInput('Description', 'description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                {preInput('Perks', 'Select all the perks of your place')}
                <Perks selected={perks} onChange={setPerks}/>

                {preInput('Extra Information', 'house rules, etc...')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>

                {preInput('Check In & Out time', 'check in and check out time, remember to clean the rooms between guests')}
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                               placeholder="14:00"/>
                    </div>
                    <div>
                        <h3>Check out time</h3>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                               placeholder="12:00"/>
                    </div>
                    <div>
                        <h3>Max number of guests</h3>
                        <input type="number" value={maxGuest} onChange={ev => setMaxGuest(ev.target.value)}/>
                    </div>
                </div>

                <button className="primary my-4">Save</button>

            </form>
        </div>
    )
}