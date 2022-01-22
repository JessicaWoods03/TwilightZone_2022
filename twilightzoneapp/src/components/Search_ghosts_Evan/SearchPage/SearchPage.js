import React, { useState, useEffect } from 'react';

import '../base.css';
import './styles.css';

//Import MaterialUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SearchPageResultsTable from '../SearchPageResultsTable/SearchPageResultsTable';
import Typography from "@material-ui/core/Typography";

import getCitiesAndStates from '../../../utils/search_utils/getCitiesAndStates'
import getSearchResults from '../../../utils/search_utils/getSearchResults';

const SearchPage = (props) => {

    useEffect(() => {
        getCitiesAndStatesAsync();
      }, []);


    const [city, setCity] = useState();
    const [state, setState] = useState();
    
    const [cities, setCities] = useState(null);
    const [states, setStates] = useState(null);

    const handleCityChange = (city) => {
        setCity(city)
    }

    const handleStateChange = (state) => {
        setState(state)
    }

    const [results, setResults] = useState(null);

    const getResults = async () => {
        const searchResults = await getSearchResults(city, state);
        setResults(searchResults.reports);

        console.log(searchResults.reports)
    }

    const getCitiesAndStatesAsync = async () => {
        const citiesAndStates = await getCitiesAndStates();
        setCities(citiesAndStates.cities)
        setStates(citiesAndStates.states)
    }

    const clearResults = () => {
        console.log(results)
        alert("Not yet implemented")
    }

    return (
        <div class="searchPage">
            {/* Search box section */}
            <div class="searchFormBox">
                <Typography variant="h5">
                    Search
                </Typography>
                <form class="searchForm" noValidate autocomplete="off">

                    {/* TODO: Fix the below running slowly when using menu item */}
                    {/* City selection box */}
                    <TextField id="standard-basic" label="City" fullWidth select title="Choose a city to search in" onChange={(e) => { handleCityChange(e.target.value) }}>
                        {cities && cities.map((option) => (
                            // <MenuItem key={option} value={option}>
                            //     {option}
                            // </MenuItem>
                            <div key={option} value={option}>{option}</div>
                        ))}
                    </TextField>

                    {/* State selection box */}
                    <TextField id="standard-basic" label="State" fullWidth select title="Choose a state to search in" onChange={(e) => { handleStateChange(e.target.value) }}>
                        {states && states.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button variant="contained" color="primary" id="searchBtn" onClick={() => { getResults() }}>Search</Button>
                    <Button variant="contained" color="primary" id="searchBtn" onClick={() => { clearResults() }}>Clear</Button>
                </form>
            </div>

            {/* Results section */}
            <div class="results">
                {results &&
                    <SearchPageResultsTable
                        results={results}
                        getReportData={props.getReportData}
                    ></SearchPageResultsTable>
                }
            </div>
        </div>
    )
}

export default SearchPage;