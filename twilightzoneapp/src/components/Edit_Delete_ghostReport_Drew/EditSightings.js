import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import {Grid, CardActions, Container, Checkbox, FormControlLabel, TextField} from '@material-ui/core';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import {TZTheme, useStyles} from '../../styles/TZTheme';

//integration code check Nov. 9th 2021 
export default function EditSightings() {
  let [isChecked, setIsChecked] = useState([]);
  let [tempChecked, setTempChecked] = useState([]);
  const classes = useStyles(TZTheme);
  
  function switchCheck(index) {
    let tempChecked = isChecked
    setTempChecked(tempChecked => isChecked.splice(index,1, (! isChecked[index])))
  }

  function EquipCheck(props) {
    return (
      <FormControlLabel label={props.label} justify="flex-start" control={
      <Checkbox checked={isChecked[props.index]}  onChange={() => switchCheck(props.index)} />   } />
    )
  }

  function Databox(props) {
    return (
      <TextField 
          clearButtonMode ="while-editing"
          size = "small"
          id="categorySearch"
          variant="outlined"
          label={props.label}
         
          //onChange={e => setSearchBox(e.target.value)}
          //value={searchBox} 
          />
    )
  }

  let checks = ["EMP", "Video", "Picture",  "Ghost Box", "Thermo Imaging"];
  let dataHeadings = ["City", "State", "Decription", "Date", "Location Description", "Location Coordinates"];

      return (
      <ThemeProvider theme={TZTheme}>
      <Container className={classes.page}>
      <Grid container spacing={5} > 
      <Grid item>
      <Card  raised variant="outlined">
          <CardContent justify="flex-start">
          <Typography  variant="h5" align="center" color="textPrimary" gutterBottom>
              Equipment Used
          </Typography>
          <Grid container  spacing={2} direction="column" justify="flex-start" >
           {checks.map((curCheck, index) => (
             <Grid item justify="flex-start" >
             <EquipCheck index={index} label={curCheck} />
             </Grid>
           ))}
          </Grid>
        </CardContent>
      </Card>
      </Grid>
      <Grid item>
      <Card raised variant="outlined"> 
          <CardContent>
          <Typography  variant="h5" align="center" color="textPrimary" gutterBottom>
              Data
            </Typography>
            <Grid container spacing={5} direction='column'>
           {dataHeadings.map((curDatabox, index) => (
             <Grid item spacing={50}>
             <Databox index={index} label={curDatabox} />
             </Grid>
           ))}
          </Grid>       
        </CardContent>
      </Card>
      </Grid>
      </Grid>
      </Container>
      </ThemeProvider>
      );
}