import {Navigate, useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import {useContext, useState} from "react";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNavigation from "../components/AccountNavigation.jsx";

function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);

    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logOut() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    // if (!ready) {
    //     return 'Loading...';
    // }

    if (ready && !user && !redirect) {
        return <Navigate to={"/login"}/>;
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return <div>
        <AccountNavigation/>
        {subpage === 'profile' && (<div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email})<br/>
            <button className="primary max-w-sm mt-2" onClick={logOut}>Log Out</button>
        </div>)}

        {subpage === 'places' && (<PlacesPage/>)}
    </div>;
}

export default ProfilePage;
