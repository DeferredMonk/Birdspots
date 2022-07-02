import { Button, Container, IconButton, TextField, Typography } from '@mui/material'
import React, { useRef, useState, Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Link } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { fi } from 'date-fns/locale'
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid';
import LockIcon from '@mui/icons-material/Lock';
import { InputAdornment } from '@material-ui/core';


const Addspot = ({ spots, setSpots }) => {


    const FormInfo = useRef({})
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const HandleAdd = (e) => {
        e.preventDefault();
        let helper = [...spots]
        let virheet = {}

        if (!FormInfo.current.bird) {
            virheet = { ...virheet, bird: "Lintu on syötettävä jatkaksesi" }
        } if (!FormInfo.current.place) {
            virheet = { ...virheet, place: "Sijainti on syötettävä jatkaksesi" }
        }
        if (Object.entries(virheet).length > 0) {
            setErrors({ ...virheet })
        } else {

            setErrors({})
            setSpots([...helper, FormInfo.current])
            console.log(FormInfo.current)
            history.push("/")
        }
    }

    const inputHandler = (e) => {
        FormInfo.current.saw = new Date().getTime()
        FormInfo.current[e.target.name] = e.target.value
        FormInfo.current.FormattedTime = format(FormInfo.current.saw, "d.MM.yyyy H:mm")
        FormInfo.current.id = uuid()
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fi}>
            <Typography
                variant="h5"
                sx={{
                    marginTop: "10px"
                }}>Minkä linnun bongasit?
            </Typography>
            <form onSubmit={HandleAdd}>
                <Container style={{
                    display: "flex",
                    padding: "0"
                }}>
                    <TextField
                        name="bird"
                        label="Lintu"
                        fullWidth
                        onChange={inputHandler}
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
                        error={Boolean(errors.place)}
                        helperText={errors.place}
                        style={{
                            marginTop: "20px",
                            marginLeft: "10px"
                        }} />
                </Container>
                <DateTimePicker
                    name="saw"
                    label="Bongattu"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={new Date}
                    onChange={inputHandler}
                    inputVariant='outlined'
                    variant="inline"
                    ampm={false}
                    format="dd.MM.yyyy H:mm"
                    readOnly
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
                        Lisää
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

export default Addspot