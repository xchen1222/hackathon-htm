import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Grid, FormGroup, Box } from '@material-ui/core/';

export const Information = () => {
    const key = "ee6c292cc23401ab20400f4e10c7c5e3f6c83a90";
    const [days, setDays] = useState([])
    const [prices, setPrices] = useState([]);
    const [data, setData] = useState([])
    const [crypto, setCrypto] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        if (e.target.name == "crypto")
        setCrypto(e.target.value);
        if (e.target.name == "start")
        setStart(e.target.value);
        if (e.target.name == "end")
        setEnd(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let linkToAPI = "https://api.nomics.com/v1/currencies/sparkline?key=" + key + "&ids=" + crypto + "&start=" + start + "T00:00:00Z&end=" + end + "T00:00:00Z";
        try {
            let response = await axios.get(linkToAPI)
            console.log(response.data)
            setData(response.data)
            setDays(data[0].timestamps)
            setPrices(data[0].prices)
        } catch (error) {
            setError(error);
        }

    }
    return (
        <>
        <Typography variant="h1" align="center">CryptoGame</Typography>
        <Grid container justify="center">

            <FormGroup onSubmit={handleSubmit}>
            <Grid>
                <TextField label="Cryptocurrency" type="text" id="crypto" name="crypto" onChange={handleChange} />
            </Grid>

            <Grid>
                <TextField label="Start Date" type="text" id="start" name="start" onChange={handleChange} />
            </Grid>

            <Grid>
                <TextField label="End Date" type="text" id="end" name="end" onChange={handleChange} />
            </Grid>
            <br/>
            <Grid>
                <Box textAlign='center'>
                    <Button justify="center" type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </Grid>
            </FormGroup>
        </Grid>
        <br/>
        <Grid container justify="center">
            <Grid xs="5">
                <Typography variant="h5" align="center">Current Day: <br/> {days[days.length - 1]}</Typography>
            </Grid>
            <Grid xs="5">
                <Typography variant="h5" align="center">Current Price:  <br/> {prices[prices.length - 1]}</Typography>
            </Grid>
        </Grid>
        </>
    )
}
