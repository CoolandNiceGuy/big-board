import './App.css';
import { TextField, Button } from '@mui/material';
import React from 'react';
import { scrape } from '../node_modules/espn-box-score-scraper/app'; 
import Icon from '@mui/material/Icon';
import { PlayerCard } from './PlayerCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const App = () =>  {

  const [options, setOptions] = React.useState([]);
  const [playerCards, setPlayerCards] = React.useState([]);

  const  urlChange = async (text) => {
    let output = await scrape(text);
    setOptions(Object.keys(output));
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
      <header className="App-header">

        {/* only for debugging purposes */}
        <TextField 
        required id="outlined-basic" 
        label="Link to Box Score" 
        variant="outlined" 
        onChange={ (event) => urlChange(event.target.value)}
        />

      <Button variant="outlined" endIcon={<Icon color="primary">add_circle</Icon>} onClick={() => {addCard()}}>
        Add Card
      </Button>

      {playerCards.map((element) => (
      <PlayerCard options={options} key={element.id}>
        <IconButton aria-label="delete" onClick={() => {deleteCard(element.id)}}>
            <DeleteIcon />
         </IconButton>
      </PlayerCard> 
      ))}

      {/* <PlayerCard title={"Test"} options={options} key={10}>
      </PlayerCard> */}

      </header>
    </div>
  );
}

export default App;
