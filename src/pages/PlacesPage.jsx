import {Link} from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImage from "../components/PlaceImgage.jsx";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        })
    }, []);

    return (
        <div>
            <AccountNavigation/>
            <div className="text-center">
                <Link className=" inline-flex gap-1 bg-primary text-white mb-3 py-2 px-5 rounded-full "
                      to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    Add new place</Link>
            </div>

            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    // eslint-disable-next-line react/jsx-key
                    <Link to={'/account/places/'+place._id} className="mb-3 flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32  grow shrink-0">
                            <PlaceImage place={place}/>
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl font-bold">{place.title}</h2>
                            <p className="text-sm italic mb-3">{place.address}</p>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                    )
                )}
            </div>
        </div>
    )
}