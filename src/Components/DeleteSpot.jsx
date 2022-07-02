import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useHistory, useParams, useState } from 'react-router-dom'

const DeleteSpot = ({ spots, setSpots }) => {

    const history = useHistory()
    const { id } = useParams()

    const deleteFromList = spots.filter((spot) => {
        return (spot.id === id);
    })[0];

    const HandleClick = () => {
        let helper = spots.filter((spot) => {
            return spot.id !== id
        })
        helper.sort((a, b) => a.saw - b.saw)
        const helperArr = [...helper]
        localStorage.setItem("Bongaukset", JSON.stringify(helperArr))
        setSpots(helperArr)
    }
    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    marginTop: "10px"
                }}>Etkö löytänytkään kyseistä lintua?
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    marginTop: "10px"
                }}>Haluatko varmasti poistaa kyseisen linnun:
            </Typography>
            <Typography
                variant="h4"
                align="center"
                sx={{
                    marginTop: "10px"
                }}>{deleteFromList.bird}
            </Typography>
            <Container sx={{
                display: "flex",
                marginTop: "10px"
            }}>
                <Button variant='contained'
                    fullWidth
                    sx={{
                        margin: "5px"
                    }} onClick={() => {
                        HandleClick()
                        history.push("/")
                    }}>
                    Poista
                </Button>
                <Button variant='outlined'
                    fullWidth
                    sx={{
                        margin: "5px"
                    }} onClick={() => {
                        history.push("/")
                    }}>
                    Peruuta
                </Button>
            </Container>
        </>
    )
}

export default DeleteSpot