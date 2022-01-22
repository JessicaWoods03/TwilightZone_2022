import React from 'react';

import axios from 'axios';

export default async function getSearchResults(city, state) {
    let query_string = ``;
    if(city !== undefined && state !== undefined) {
        query_string = `?city=${city}&state=${state}`
    } else if(city !== undefined && state == undefined){
        query_string = `?city=${city}`
    } else if(city == undefined && state !== undefined) {
        query_string = `?state=${state}`
    }
    
    return await axios
        .get("http://localhost:5000/ghostReports" + query_string)
        .then((response) => {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}