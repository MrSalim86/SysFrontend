import React, {useEffect, useState} from "react";
import facade from "../apiFacade";

const Location = ({user}) => {
    const [location, setLocation] = useState([]);

    useEffect(() => {
        const fetchLocation = async () => {
            const url = user.roles.split(",").includes("user")
                ? "/api/location/user"
                : "/api/location";
            // pass the controller's signal to the fetch options
            const res = await facade.fetchData(url);
            setLocation(res);
            console.log(res);
        };
        fetchCountry();
    }, [user]);

    return (
        <div>
            <h1>Location</h1>
            {location.map((location, index) => (
                <li key={index}>
                    <p>IP address: {location.ipaddress}</p>
                    <p>Country: {location.country}</p>
                </li>
            ))}
        </div>
    );
};

export default Location;