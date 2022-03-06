import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './StatTarget.css'

const StatTarget = (props) => {
    // value (current stat vaule)
    //title (target stat title -> rec-yards)
    //target (desired stat value)
    return (<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <Typography color="text.secondary" className="targetTitle" sx={{width: '30%', flexWrap: 'true', wordWrap: 'break-word'}}>{props.title}</Typography>
    {/* <Box sx={{ width: '30%', mr: 1, marginLeft: '5%', marginRight: '5%'}}> */}
        <LinearProgress variant="determinate" value={(props.value / props.target) * 100} sx={{width: '30%'}}/>
    {/* </Box> */}
    
      <Typography variant="body2" color="text.secondary" sx={{width: '20%'}}>{props.value + "/" + props.target}</Typography>
  </Box>)
}

export { StatTarget };