import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import React, { useRef, useState, Fragment, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Link } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { fi } from 'date-fns/locale'
import { format, parseISO } from 'date-fns'
import { v4 as uuid } from 'uuid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { InputAdornment } from '@material-ui/core';
import FlutterDashTwoToneIcon from '@mui/icons-material/FlutterDashTwoTone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';



const ModifySpot = ({ spots, setSpots }) => {

    const { id } = useParams()
    const FormInfo = useRef({})
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const chosenBird = spots.filter((spot) => {
        return (spot.id === id);
    })[0];

    const [spotted, setSpotted] = useState(chosenBird.saw)

    const handleChange = (e) => {
        e.preventDefault()
        let helper = spots.filter((spot) => {
            return spot.id !== id
        })
        if (FormInfo.current.bird) {
            chosenBird.bird = FormInfo.current.bird
        } if (FormInfo.current.place) {
            chosenBird.place = FormInfo.current.place
        } else {
            console.log(chosenBird.saw)
            chosenBird.saw = spotted !== chosenBird.saw
                ? spotted.getTime()
                : chosenBird.saw

            chosenBird.FormattedTime = format(spotted, "d.MM.yyyy H:mm")

        }
        setSpots([...helper, chosenBird])
        history.push("/")
    }

    const inputHandler = (e) => {

        FormInfo.current[e.target.name] = e.target.value

    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fi}>
            <Typography
                variant="h5"
                sx={{
                    marginTop: "10px"
                }}>Kirjasitko väärät tiedot?
            </Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FlutterDashTwoToneIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={chosenBird.bird} />
                    <ListItemAvatar>
                        <Avatar>
                            <LocationOnIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={chosenBird.place} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ScheduleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={chosenBird.FormattedTime} />
                </ListItem>
            </List>
            <form onSubmit={handleChange}>
                <Container style={{
                    display: "flex",
                    padding: "0"
                }}>
                    <TextField
                        name="bird"
                        label="Lintu"
                        fullWidth
                        onChange={inputHandler}
                        defaultValue={chosenBird.bird}
                        error={Boolean(errors.bird)}
                        helperText={errors.bird}
                        style={{
                            marginTop: "20px",
                            marginRight: "10px"
                        }} />
                    <TextField
                        name="place"
                        label="Paikka"
                        fullWidth
                        onChange={inputHandler}
                        defaultValue={chosenBird.place}
                        error={Boolean(errors.place)}
                        helperText={errors.place}
                        style={{
                            marginTop: "20px",
                            marginLeft: "10px"
                        }} />
                </Container>
                <DateTimePicker
                    label="Bongattu"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <LockOpenIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={spotted}
                    onChange={setSpotted}
                    inputVariant='outlined'
                    variant="inline"
                    ampm={false}
                    format="dd.MM.yyyy H:mm"
                    fullWidth
                    style={{
                        marginTop: "20px",
                    }} />
                <Container
                    style={{
                        padding: "0px",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px"
                    }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ marginRight: "10px" }}
                        type="submit">
                        Tallenna
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ marginLeft: "10px" }}
                        component={Link}
                        to="/">
                        Palaa
                    </Button>
                </Container >
            </form>
        </MuiPickersUtilsProvider>
    )
}
export default ModifySpot