import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import {Grid, CardActions, Container,  TextField, Checkbox} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import {TZTheme, useStyles} from '../../styles/TZTheme';
import { TitleBox } from '../Extra/Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import RadioIcon from '@mui/icons-material/Radio';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton } from '@material-ui/core';
import EditSightings from './EditSightings';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


//Integrated Nov. 9th 2020 from Drews_branch


export default function SightingsMain() {
    let [sightingsList, setSightingsList] = useState([]);
    let [propertiesSet,setPropertiesSet] = useState([]);
    let [sightingID, setSightingID] = useState("");
    let [loaded, setLoaded] = useState(false);
    let [maxPage, setMaxPage] = useState(1);
    let pageError = false;
    let [currentPage, setCurrentPage] = useState(1);
    

    //MODAL props
    const [open, setOpen] = useState(false);
    

    const style = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    //******

    let propertiesDisplaySet = ["", "City", "Description", "Location", "State", "",
        "Longitude", "Latitude", "", "", "Media", "Picture", "Video", "Emp", "GhostBox", "Thermo", "Username", "", "Edit", "Delete"];
    
    /********************/    
    /* Subcomponents   */
    function MediaIcon (props) {
        let valid = false;
        switch(props.switcher) {
            case "Picturetrue":
               return (
                    <ImageIcon sx={{color:TZTheme.palette.primary.main}}/>
               );
               break;
            case "Videotrue":
                return (
                    <VideocamIcon sx={{color:TZTheme.palette.primary.main}}/>
                );
              break;
            case "Emptrue":
                return (
                    <TrackChangesIcon sx={{color:TZTheme.palette.primary.main}}/>
                );
              break;
            case "GhostBoxtrue":
                return (
                    <RadioIcon sx={{color:TZTheme.palette.primary.main}}/>
                );
              break;
            case "Thermotrue":
                return (
                    <ThermostatIcon sx={{color:TZTheme.palette.primary.main}}/>
                );
              break;
            case "Editundefined":
                return (
                <IconButton onClick={() =>handleOpen(props.id)}>
                    <EditIcon sx={{color:TZTheme.palette.secondary.main}}/>
                </IconButton> 
                );
                break;
            case "Deleteundefined":
                return (
                <IconButton onClick={() => deleteSighting(props.id)}>
                    <DeleteIcon sx={{color:TZTheme.palette.secondary.main}}/>
                </IconButton> 
                );
                break;
            default:
                break;
          }
    
        return (
        null
        )
    }
    
    /******************************************** */
    /* PAGE PICKER COMPONENT   */
    function PagePicker(props) {
        let pageNums = [];
        let pagePage = 10;
        let pageSetEnd = Math.min(props.maxPage, (Number(props.currentPage) + pagePage))
        
        for (var i = props.currentPage; (i < pageSetEnd); i++)
        {
        pageNums = pageNums.concat(i);
        }
        return (
        <Box  size="small">
            { props.currentPage != 1?
            <IconButton className={classes.pagebutton} onClick={() =>changePage(Math.max(1, currentPage - pagePage)) }>
            <ChevronLeftIcon />
            </IconButton>
            : null }
            {pageNums.map((pageNum) => (
            <IconButton size='small' variant='outlined'
             className={pageNum == currentPage? classes.currentpagebutton : classes.pagebutton} 
             onClick={() => changePage(pageNum)}>
                <Typography> {pageNum} </Typography>
                {/*style={(pageNum === props.currentPage)? styles.pageSelected:styles.pagetext}> {pageNum} </Text> */}
            </IconButton>
            ))}
            { props.currentPage != props.maxPage?
             <IconButton className={classes.pagebutton} onClick={() =>changePage(Math.min(pageSetEnd, maxPage)) }>
             <ChevronRightIcon />
             </IconButton>
            : null }
        </Box>
        )
    }

    function changePage(pageNum) {
        setLoaded(false);
        setCurrentPage(() =>pageNum);
    }
    
    function handleOpen(id) {
        setOpen(true);
        setSightingID(id);
    } 

    function handleClose() {   
     setOpen(false);
    }

    function handleRefresh() {
      setLoaded(false);
      setSightingsList(sightingsList.concat([]));
    }

    function BuildCell(props) {
        const classes = useStyles(TZTheme);
        const specFields = ["Edit", "Picture", "Video", "Emp", "GhostBox", "Thermo", "Delete"]
        let switcher = String(props.displayProperty) + String(props.data);
    
        return (
            <td className={(specFields.includes(props.displayProperty))?classes.tablebutton: classes.tablecellst} 
                style={{width:(props.width), maxWidth:(props.width),minWidth:(props.width) }} >
            {(specFields.includes(props.displayProperty))?
              <MediaIcon switcher={switcher} id={props.id} sighting={props.sighting} />:
              props.data
            }
            </td> 
            
    )}
    //Drews Middlewear...Using React Hooks-
    useEffect (() => {
        let tempList = [];
        let iCount = 0;
        if (loaded && propertiesSet.length === 0) {
            for ( var property in sightingsList[0] ) {
                tempList = tempList.concat(property);
                }
            setPropertiesSet(tempList);
            }
    }, [loaded]) 

    useEffect (() => {
        async function fetchSightings() {
            try {
                const quer = "?pageNum=" + String(currentPage );
                const response = await fetch('http://localhost:5000/ghostSightings' + quer, 
                {
                    method: 'GET',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    });
                const fetchedSightings= await response.json(response); 
                const cresponse = await fetch('http://localhost:5000/ghostCount', 
                {
                    method: 'GET',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    });
                const fetchedCount= await cresponse.json(cresponse); 
                setSightingsList(fetchedSightings.report);
                setMaxPage(() => Math.trunc(Number(fetchedCount.report) / 10 ));
                pageError = false;
            }
            catch (error) {
                pageError =true;
            }}
        if (!loaded) {
        fetchSightings()};
        if (sightingsList.length > 0) {
            setLoaded(true);
        }
        else {
            setLoaded(false);
            }
    }, [sightingsList, currentPage]);

    async function deleteSighting(id, sighting) {
        const proceed = window.confirm('Are you sure you want to delete this record?'+ "?_id=" + String(id) ); 
        const tempList = sightingsList;
        if (proceed) {
            try {
                const quer = "?_id=" + String(id);
                const response = await fetch('http://localhost:5000/deleteReport' + quer, 
                {
                    method: 'POST',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    });
                const fetchedSightings= await response.json(response); 
                pageError = false;
                setLoaded(false);
                setSightingsList(tempList.splice(tempList.indexOf(sighting),1));
                
            }
            catch (error) {
                alert(error);
                pageError =true;
            }
        }
    }

   const classes = useStyles(TZTheme);
   let widths = [0, 7, 60, 8, 10, 0, 9, 9, 0, 0, 5, 5, 5, 5, 5, 5, 6, 0, 5, 5];
   let pxMult = 12;
   {widths.map((cur, index) => (widths[index] = cur * pxMult))}
    return (
        <ThemeProvider theme={TZTheme}>
        <Container className={classes.page} justifyContent="flex-end" >
    {/************************** MODAL    */ }
     
      <Modal
        open={open}
        onClose={handleClose} >
      <Box className={classes.editcard} sx={{display:'flex', flexDirection: 'row'}}>
      <EditSightings sightingID={sightingID} unMount={handleClose} refresh={handleRefresh}/>
      </Box> 
      </Modal>

    {/**************** */}
        <Grid container  direction="column" spacing={5} xs={1}> 
        <Grid justify="flex-end" item>
        <TitleBox  section="sightings" noAnimate={true} maxSize={180}/>  
        </Grid>
        </Grid>
        { pageError ? <Typography color="error"> Error loading page </Typography> : "" }
        <Grid containter direction="column" >
        
        
        <Grid item alignItems="center" >    
        <table width='98%'  >
            <tr className={classes.tableheader}>
              {propertiesDisplaySet.map((column, index) => (
                 (widths[index] >= 1) ?  <th style={{width:(widths[index]),maxWidth:(widths[index]),minWidth:(widths[index]) }}>
                  {propertiesDisplaySet[index]}
                </th> : ""
              ))}
            </tr>
        </table>
        <TableContainer sx={{ width:'99%', maxHeight: 725 }}>
        <table  className={classes.table} width='100%'  >
          {sightingsList.map((curSighting) => (
              <tr className={classes.tableRow}>
                  {propertiesDisplaySet.map((curProperty,  index) => ((widths[index] >= 1) ?
                    <BuildCell 
                        sighting = {curSighting}
                        data={curSighting[propertiesSet[index]]} 
                        property={propertiesSet[index]} 
                        displayProperty={curProperty} 
                        width={widths[index]}
                        id={curSighting["_id"]}
                        />
                    : null ))} 
             </tr>
          ) )}

          </table>
        </TableContainer>
        </Grid>
        <Grid item alignItems='center'>
        <PagePicker currentPage={currentPage} maxPage={maxPage}/>
        </Grid>
        </Grid>
        </Container>
        </ThemeProvider>
    )
}

