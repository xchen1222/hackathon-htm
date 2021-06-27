import { React, useState, Component, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { Typography, Button, Grid, Input, InputLabel, Box } from '@material-ui/core/';

import { InfoContext } from "../utils/InfoContext";

export const Results = () => {
    const { info, setInfo } = useContext(InfoContext);
    let total = info["amountSpent"];

    const reset = () => {
        setInfo({"currentlyOwned": {} });
        setInfo({"lastDatePurchased": ""});
        setInfo({"netWorth": 0});
        setInfo({"amountSpent": 0});
    }
    return (
        <Grid container justify="center">
            {/* display all information from infocontext before resetting */}
            <Grid item xs={12}>
                <Typography variant="h2" align="center">End Result:</Typography>
                {/* not sure how to calculate net worth with our setup */}
                <Typography variant="h4" align="center">Net Worth: </Typography>
                <Typography variant="h4" align="center">Amount Spent: {total}</Typography>
            </Grid>
            {/* reset infocontext */}
            <Grid item xs={12}>
            <Box textAlign="center" m={2}> 
                <Link to="/information" style={{ textDecoration: 'none' }}>
                    <Button type="submit" variant="contained" color="primary" onClick={reset}>
                        Play Again
                    </Button>
                </Link>
                </Box>
            </Grid>
        </Grid>
    )
}
