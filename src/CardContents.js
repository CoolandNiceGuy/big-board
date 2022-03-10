import React from 'react';
import { ListItem, ListItemText, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { DICTIONARY } from './Utils/dictionary';

const CardContents = (props) => {
    const item = props.item
    const checked = props.checked

    if(item !== "isGame"){
        return <Box>
        <ListItem
          secondaryAction={
            props.listAction
         }>
        <ListItemText>{DICTIONARY[item]}</ListItemText>
        {
        //only render text field if box is checked
        (checked.indexOf(item) !== -1) &&
        props.input
      }
        </ListItem>
        <Divider component="li"/>
        </Box>
    }
    return <p></p>;
}

export { CardContents };