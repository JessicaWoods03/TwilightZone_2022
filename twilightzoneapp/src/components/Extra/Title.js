import {React, useState, useEffect} from 'react';
import { Paper } from '@material-ui/core';
import titleImage from './TWZone.png';
import starsImage from './TZStars.png';
import viewImage from './View.png';
import newImage from './New.png';
import searchImage from './Search.png';
import editImage from './Edit.png';
import { Container } from '@material-ui/core';
import sightingsImage from './Sightings.png';
import accountImage from './Account.png';
import newaccountImage from './NewAccount.png';

export function ImageBox(props) {

    const ratio = 2400/951;
    let curWidth = props.size * ratio;
    let curHeight = props.size;
    let curOpacity = 1- (props.maxSize - props.size)/props.maxSize - .10
    let imageName = "";

    switch (props.section) {
        case 'sightings':
            imageName= sightingsImage;
        break;
        case 'edit':
            imageName= editImage;
        break;
        case 'view':
            imageName= viewImage;
        break;
        case 'new':
            imageName= newImage;
        break;
        case 'search':
            imageName= searchImage;
        break;
        case 'newaccount':
            imageName= newaccountImage;
        break;
        case 'title':
            imageName = titleImage;
        break;
        case 'account':
            imageName = accountImage;
        break;
        default:
            imageName = titleImage;
        }


    return (
            <img src={imageName} alt="Title" width={curWidth} height={curHeight} 
                style={{opacity:curOpacity, zIndex:5}} />
    )
}


export function TitleBox (props) {
    var [curSize, setCurSize] = useState(0);
    var [reSize, setReSize] = useState(0);
    let maxSize = props.maxSize;
    if (!maxSize)
    {maxSize = 300}

    useEffect (() => {
        if (props.noAnimate)
        {
            setCurSize(maxSize);
        }
        let interval = null;
        if (curSize <= maxSize) {
            interval = setInterval(() => {
                setCurSize(curSize => curSize + 1)
             }, 8); }
        else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);    
    }, [curSize])

    

    return (
        <div 
        style={{backgroundImage: `url(${starsImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: maxSize * 3.8,
            display:'flex',
            height:maxSize, 
            width:"95vw", 
            padding:10, 
            alignItems:'center', 
            justifyContent:'center'}}>
        <ImageBox section={props.section} size={curSize} maxSize={maxSize}/>
        </div>
    )
}
 
