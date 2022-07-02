import { Button, Container, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Typography, Menu, MenuItem, Fade } from '@mui/material'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { format, formatDistanceStrict } from 'date-fns'
import { set } from 'date-fns/esm';

const Listspots = ({ spots }) => {
    spots.sort((a, b) => b.saw - a.saw)
    console.log(spots)
    return (
        <>
            <List>
                {spots.map((spot, idx) => {
                    const id = spot.id

                    return (
                        <ListItem key={idx}>
                            <FlutterDashIcon
                                fontSize='large'
                                color="info"
                                sx={{
                                    marginRight: "10px"
                                }} />
                            <ListItemText primary={
                                <Fragment>
                                    <Typography
                                        variant='h6'>
                                        {spots[idx].bird}
                                    </Typography>
                                </Fragment>
                            }
                                secondary={
                                    <Fragment>
                                        <Typography
                                            variant='caption'
                                            component="div"
                                            style={{
                                                maxWidth: "60%"
                                            }}>{`Havaittu ${spot.FormattedTime} paikassa ${spot.place}`}
                                        </Typography>
                                    </Fragment>
                                }>
                            </ListItemText>
                            <Container
                                style={{
                                    width: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "0",
                                    margin: "0"
                                }}>
                                <IconButton
                                    to={`/delete/${spot.id}`}
                                    component={Link}
                                    variant='outlined'
                                    sx={{ marginRight: "15px" }}
                                >
                                    <ClearIcon />
                                </IconButton>
                                <IconButton
                                    to={`/modify/${spot.id}`}
                                    component={Link}
                                    variant='outlined'
                                    sx={{ marginRight: "15px" }}
                                >
                                    <SettingsIcon />
                                </IconButton>
                            </Container>

                        </ListItem>
                    );
                })}
            </List>
        </>
    )
}

export default Listspots