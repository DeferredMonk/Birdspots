import { Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListSpots from './Components/ListSpots';
import DeleteSpot from './Components/DeleteSpot';
import AddSpot from './Components/AddSpot';
import { Link } from 'react-router-dom';
import ModifySpot from './Components/ModifySpot';

function App() {

  const [spots, setSpots] = useState([])

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("Bongaukset"))) {
      setSpots([])
    }
    else {
      setSpots(JSON.parse(localStorage.getItem("Bongaukset")))
    }
    console.log(spots)
  }, [])
  useEffect(() => {
    localStorage.setItem("Bongaukset", JSON.stringify(spots))
    console.log("toimii")
  }, [spots])

  return (
    <Container maxWidth="xs">
      <Router>
        <Typography variant="h4" component="div">Lintubongaus kirjanpito</Typography>
        <Route path="/add">
          <AddSpot
            spots={spots}
            setSpots={setSpots} />
        </Route>
        <Route path="/" exact>
          <Button
            variant='outlined'
            fullWidth
            sx={{
              marginTop: "15px"
            }}
            component={Link}
            to="/add">
            Lisää bongaus!
          </Button>
          <ListSpots
            spots={spots}
            setSpots={setSpots} />
        </Route>
        <Route path="/delete/:id">
          <DeleteSpot
            spots={spots}
            setSpots={setSpots}
          />
        </Route>
        <Route path="/modify/:id">
          <ModifySpot
            spots={spots}
            setSpots={setSpots}
          />
        </Route>
      </Router>
    </Container>
  );
}

export default App;
