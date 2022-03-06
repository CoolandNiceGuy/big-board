import './App.css';
import { TextField } from '@mui/material';
import React from 'react';
import { scrape } from '../node_modules/espn-box-score-scraper/app'; 
import { PlayerCard } from './PlayerCard';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Grid, Fab } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';


const FIELDS = ['td', 'rec', 'yds', 'rec_yards', 'rush_yards']
const App = () =>  {

  const [options, setOptions] = React.useState([]);
  const [playerCards, setPlayerCards] = React.useState([]);
  const [data, setData] = React.useState([]);

  const  urlChange = async (text) => {
    let output = await scrape(text, FIELDS);
    setOptions(Object.keys(output));
    setData(output);
  }

  const addCard = () => {
    const unique_id = uuidv4();
    const obj = {id: unique_id};
    setPlayerCards([...playerCards, obj]);
  }

  const deleteCard = async (id) => {
    //fence post
    if(playerCards.length === 1){
      setPlayerCards([]);
    }
    else{
      let arr = playerCards.filter((item) => item.id !== id);
      setPlayerCards(...[arr]);
    }
  }

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />

        {/* only for debugging purposes */}
        <TextField 
        required id="outlined-basic" 
        label="Link to Box Score" 
        variant="outlined" 
        onChange={ (event) => urlChange(event.target.value)}
        />

      <Grid container spacing={2} sx={{flexGrow: '1'}}>
      {playerCards.map((element, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={element.id}>
      <PlayerCard options={options} key={element.id} playerStats={data} className="playerCard">
        <IconButton aria-label="delete" onClick={() => {deleteCard(element.id)}}>
            <DeleteIcon />
         </IconButton>
      </PlayerCard> 
      </Grid>
      ))}
      </Grid>
    <Fab color="primary" onClick={() => {addCard()}} sx={{position: 'absolute', bottom: '0', right: '0'}}><AddIcon/></Fab>
    </div>
  );
}

export default App;
