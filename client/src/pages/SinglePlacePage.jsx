import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "../components/BookingWidget.jsx";
import PlaceGallery from "../components/PlaceGallery.jsx";
import AddressLink from "../components/AddressLink.jsx";

export default function SimplePlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`https://booking-app-api-zeta.vercel.app/places/${id}`).then(response => {
            setPlace(response.data);
        })
    }, [id]);

    if (!place) return '';

    return (
        <div className="mt-4 pt-8 bg-gray-100 -mx-8 px-8">
            <h1 className="text-3xl">{place.title}</h1>

            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place}/>

            <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}:00<br/>
                    Check-out: {place.checkOut}:00<br/>
                    {/*Max number of guests: {place.maxGuests}<br/>*/}
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl mt-2">Extra Information</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>

            </div>
        </div>
    )
}