import React, { Component } from 'react';
//integrating Andrew_T updates from his branch (Nov.2, 2021)
import axios from 'axios';
import './styles.css';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
//added Typography...I probably forgot to add it in integrations
import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Container, Grid, FormControlLabel, Typography } from '@material-ui/core';


const { useState } = React;

const SightingsPage = (props) => {
    const [reports, setReports] = useState([]);
    const [report, setReport] = useState({});
    const [emp, setEmp] = useState(false)
    const [video, setVideo] = useState(false)
    const [picture, setPicture] = useState(false)
    const [thermo, setThermo] = useState(false)
    const [ghostBox, setGhostBox] = useState(false)
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [media, setMedia] = useState('')

    //replacing Andrew_T code with updated code from his branch (Nov.2, 2021)
    const test_list =[
        {
            "id":"1", 
            "EMP": true, 
            "Video": true, 
            "Picture": false, 
            "GhostBox": false, 
            "Thermo": false, 
            "City":"Columbus", 
            "State":"OH", 
            "description":"desc", 
            "date":"10/3/2021", 
            "media":"uploaded"
        }, 
        {
            "id":"2", 
            "EMP": true, 
            "Video": true, 
            "Picture": false, 
            "GhostBox": false, 
            "Thermo": false, 
            "City":"Cinncinati", 
            "State":"OH", 
            "description":"desc cinci", 
            "date":"10/3/2021", 
            "media":"uploaded"
        }
    ];

    return (
        //integrated from Evans_branch styles css changes Nov. 12, 2021
        //value = {report.emp} - seems to have an issue?
        <div className="sightingsPage">
            <div className="sightingsFormBox">
                <Typography variant="h5">
                    Sightings
                </Typography>
                <form className="sightingForm" noValidate autoComplete="off">
                    <Grid >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="EMP"
                                    value={report.emp}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                            }
                            label="EMP" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="Video"
                                    value={report.Video}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                            }
                            label="Video" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="Picture"
                                    value={report.Picture}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                            }
                            label="Picture" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="GhostBox"
                                    value={report.GhostBox}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                            }
                            label="Ghost Box" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="ThermoImaging"
                                    value={report.Thermo}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                            }
                            label="Thermo Imaging" />
                    </Grid>
                    <Grid>
                        <br></br>
                        {/* City text box */}
                        <TextField id="standard-basic" label="City" fullWidth value={report.City} onChange={(e)=>setCity(e.target.value)}>
                        </TextField>
                        <br></br>
                        {/* State text box */}
                        <TextField id="standard-basic" label="State"  fullWidth value={report.State} onChange={(e)=>setState(e.target.value)}>
                        </TextField>
                        <br></br>
                        {/* Description text box */}
                        <TextField id="standard-basic" label="Description"  fullWidth value={report.Description} onChange={(e)=>setDescription(e.target.value)}>
                        </TextField>
                        <br></br>
                        {/* Date text box */}
                        <TextField id="standard-basic" label="Date"  fullWidth value={report.Date} onChange={(e)=>setDate(e.target.value)}>
                        </TextField>
                        <br></br>
                        {/* Location text box */}
                        <TextField id="standard-basic" label="Location"  fullWidth value={report.Location} onChange={(e)=>setLocation(e.target.value)}>
                        </TextField>
                        <br></br>
                        <TextField id="standard-basic" label="Media Upload"  fullWidth value={report.media} onChange={(e)=>setMedia(e.target.value)}>
                        </TextField>
                        <br></br>
                        {/* Cool thing that could be used to upload a file later
                        <Button id="uploadButton" variant="contained" component="label">Upload File
                            <input type="file" hidden/>
                        </Button> */}
                        
                        {/* Add dynamic reports to thesaving object */}
                        <Button variant="contained" color="primary" id="saveBtn" onClick={() => {SaveReport(props)}}>Save</Button>
                    </Grid>
                </form>
            </div>
        </div>
    )

    function handleCheckboxChange(e) {
        let isChecked = e.target.checked;
        let cbName = e.target.name;

        if(cbName === "EMP") {
            setEmp(isChecked);
        } else if(cbName === "Picture"){
            setPicture(isChecked);
        } else if(cbName === "Video"){
            setVideo(isChecked);
        } else if(cbName === "ThermoImaging"){
            setThermo(isChecked);
        } else if(cbName === "GhostBox"){
            setGhostBox(isChecked);
        }
    }
    
    function SaveReport() {
        //build the record and set it/post it
        let rep = {
            "emp": emp,
            "video": video,
            "picture": picture,
            "thermoImaging": thermo,
            "ghostBox": ghostBox,
            "city": city,
            "state": state,
            "description": description,
            "date": date,
            "location": location,
            "media": media,
            /* add support for this when session is handled */
            "username":""

        }
        //Personal note: Middlewear Axios is integrated 
        //in front end, Evans is seperated in utils files-
        setReport(rep);

        reports.push(rep);
        setReports(reports);

        axios.post(`http://localhost:5000/ghostReports`, { body: rep })
        .then(res => {
            console.log(res.data);
        });
    } 
}

export default SightingsPage;