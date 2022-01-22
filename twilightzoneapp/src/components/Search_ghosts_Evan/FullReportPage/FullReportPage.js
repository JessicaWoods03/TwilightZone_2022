import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//ensure to import that..it blew up...I need to import icons and mui
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
//moving to my github account
export default function FullReportPage({ isDialogOpened, handleCloseDialog, data }) {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth] = React.useState("sm");
    const [editing, setEditing] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        //setOpen(true);
        //setTimeout(() => setOpen(false), 16000);
    };

    const handleClose = () => {
        //setOpen(false);
        handleCloseDialog(false);
    };

    const handleUpdate = () => {
        setEditing(!editing);
    }

    const handleDelete = () => {
        let req_body = {"id": data._id};
        axios.delete("http://localhost:5000/ghostReports",{
            data: req_body
        });
        setEditing(!editing);
        handleCloseDialog(false);
    }

    const handleSubmit = async () => {
        //create put body
        let update_body = {
            "updateAll": false,
            "id": data._id,
            "updated_report": {
                "city": data.city,
                "state": data.state,
                "location": data.location,
                "report_date": data.report_date,
                "description": data.description,
                "media": data.media,
            }
        }

        await axios.put("http://localhost:5000/ghostReports", update_body);
        setEditing(!editing);
    }

    const handleCancel = function(e) {
        setEditing(!editing);
    }

    const handleTextFieldChange = function(e) {
        if(e.target.name == "location"){
            data.location = e.target.value;
        } else if(e.target.name == "city"){
            data.city = e.target.value;
        } else if(e.target.name == "state"){
            data.state = e.target.value;
        } else if(e.target.name == "description"){
            data.description = e.target.value;
        } else if(e.target.name == "date"){
            data.report_date = e.target.value;
        } else if(e.target.name == "media"){
            data.media = e.target.value;
        }
    }

    if(!editing){
    return (
        <>
            {data &&
                <Dialog
                    fullScreen
                    open={isDialogOpened}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Full Report
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <List>
                        {/* [EMP boolean, Video boolean, Picture boolean, GhostBox boolean, Thermo Image boolean, City, State, description, date, media uploaded]; */}
                        <ListItem>
                            <ListItemText primary="Location" secondary={data.location} />
                            <IconButton onClick={handleUpdate} edge="end" aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="City" secondary={data.city} />
                            <IconButton onClick={handleUpdate} edge="end" aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="State" secondary={data.state} />
                            <IconButton onClick={handleUpdate} edge="end" aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Description" secondary={data.description} />
                            <IconButton onClick={handleUpdate} edge="end" aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Date" secondary={data.report_date} />
                            <IconButton onClick={handleUpdate} edge="end" aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Media" secondary="Click to view media WIP" />
                            <IconButton onClick={handleUpdate} edge="end" aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </ListItem>
                        <ListItem button variant="outlined" onClick={handleDelete}>Delete(Cannot be undone!!)</ListItem>
                    </List>
                </Dialog>
            }
        </>
    );
    } else {
        return (
            <>
                {data &&
                    <Dialog
                        fullScreen
                        open={isDialogOpened}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                    >
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    Full Report
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <List>
                            {/* [EMP boolean, Video boolean, Picture boolean, GhostBox boolean, Thermo Image boolean, City, State, description, date, media uploaded]; */}
                            <ListItem>
                                <ListItemText primary="Location" secondary={data.location} />
                                <TextField
                                    id="filled-search"
                                    label={data.location}
                                    type="search"
                                    variant="filled"
                                    name="location"
                                    onChange={handleTextFieldChange}
                                    />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="City" secondary={data.city} />
                                <TextField
                                    id="filled-search"
                                    label={data.city}
                                    type="search"
                                    variant="filled"
                                    name="city"
                                    onChange={handleTextFieldChange}
                                    />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="State" secondary={data.state} />
                                <TextField
                                    id="filled-search"
                                    label={data.state}
                                    type="search"
                                    variant="filled"
                                    name="state"
                                    onChange={handleTextFieldChange}
                                    />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Description" secondary={data.description} />
                                <TextField
                                    id="filled-search"
                                    label={data.description}
                                    type="search"
                                    variant="filled"
                                    name="description"
                                    onChange={handleTextFieldChange}
                                    />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Date" secondary={data.report_date} />
                                <TextField
                                    id="filled-search"
                                    label={data.report_date}
                                    type="search"
                                    variant="filled"
                                    name="date"
                                    onChange={handleTextFieldChange}
                                    />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Media" secondary="Click to view media WIP" />
                                <TextField
                                    id="filled-search"
                                    label={data.media}
                                    type="search"
                                    variant="filled"
                                    name="media"
                                    onChange={handleTextFieldChange}
                                    />
                            </ListItem>
                            <ListItem button onClick={handleSubmit}>Submit</ListItem>
                            <ListItem button onClick={handleCancel}>Cancel</ListItem>
                            <ListItem button onClick={handleDelete}>Delete(Cannot be undone!!)</ListItem>
                        </List>
                    </Dialog>
                }
            </>
        );
    }
}