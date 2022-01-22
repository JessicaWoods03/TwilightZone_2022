import React from 'react';

import axios from 'axios';

export default async function getReportData(id) {
    return await axios
        .get("http://localhost:5000/ghostReports/?_id=" + id)
        .then((response) => {
            return response.data.reports[0];
        })
        .catch(function (error) {
            console.log(error);
        });
}