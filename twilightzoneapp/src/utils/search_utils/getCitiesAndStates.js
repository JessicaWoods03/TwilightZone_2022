import React from 'react';

import axios from 'axios';

export default async function getCitiesAndStates() {
    const cities = await axios
        .get("http://localhost:5000/cities?page=1&limit=500")
        .then((response) => {
            return response.data.cities;
        })
        .catch(function (error) {
            console.log("ERROR IN CITIES CALL")
            console.log(error);
        });

    const states = await axios
        .get("http://localhost:5000/states")
        .then((response) => {
            return response.data.states;
        })
        .catch(function (error) {
            console.log(error);
        });

    const citiesAndStates = {
        cities: cities,
        states: states
    }

    return citiesAndStates;
}