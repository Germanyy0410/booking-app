import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import Perks from "../components/Perks.jsx";
import axios from "axios";

export default function PlacesPage() {
    const {action} = useParams();

    const [titlte, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);

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

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:fileName} = await axios.post('/upload-by-link', {link: photoLink});
        setAddedPhotos(prev => {
            return [...prev, fileName];
        });
        setPhotoLink('');
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className=" inline-flex gap-1 bg-primary text-white py-2 px-5 rounded-full "
                          to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        Add new place</Link>
                </div>
            )}

            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'title for your place should be short and catchy as in advertisement')}
                        <input type="text" value={titlte} onChange={ev => setTitle(ev.target.value)}
                               placeholder={"My lovely apartment"}/>

                        {preInput('Address', 'Address to this place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}
                               placeholder={"Address"}/>

                        {preInput('Photo', 'Asset of your place')}
                        <h2 className="text-2xl mt-4">Photo</h2>
                        <p className="text-gray-500 text-sm">Asset of your place</p>
                        <div className="flex gap-2">
                            <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type="text"
                                   placeholder={"Add using a link"}/>
                            <button onClick={addPhotoByLink} className="bg-gray-200 grow px-4 rounded-2xl">Add&nbsp;photos</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className="rounded-2xl" src={"http://localhost:4000/uploads/" + link} />
                                </div>
                            ))}
                            <button
                                className="flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mt-1">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"/>
                                </svg>
                                Upload
                            </button>
                        </div>

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
            )}
        </div>
    )
}