export default function PlaceImage({place, index=0, className=null}) {
    if (!place.photos?.length) {
        return '';
    }

    if (!className) {
        className = 'object-cover';
    }

    return (
        <img className={className}
             src={'https://booking-app-api-zeta.vercel.app/uploads/' + place.photos[index]} alt=""/>
    )
}