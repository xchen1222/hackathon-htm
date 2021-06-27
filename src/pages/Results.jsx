import { React, useState, Component, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { Typography, Button, Grid, Input, InputLabel, Box } from '@material-ui/core/';
import axios from 'axios';

import { InfoContext } from "../utils/InfoContext";

export const Results = () => {
    const { info, setInfo } = useContext(InfoContext);
    const [netWorth, setNetWorth] = useState(-1);
    const [difference, setDifference] = useState(-1);
    let total = info["amountSpent"];

    useEffect(() => {
      const calculateNetWorth = async () => {
        let calculatedWorth = 0;
        let cryptos = [];
        let cryptosString = "";
        Object.keys(info["currentlyOwned"]).forEach((key) => {
          cryptos.push(key);
          cryptosString += key + ",";
        });
        console.log(cryptos);
        console.log(cryptosString);

        let linkToAPI = "https://api.nomics.com/v1/currencies/sparkline?key=ee6c292cc23401ab20400f4e10c7c5e3f6c83a90&ids=" + cryptosString + "&start=" + info["lastDatePurchased"] + "&end=" + info["lastDatePurchased"];
        let response = await axios.get(linkToAPI);
        console.log(response.data);

        response.data.forEach((element) => {
          let crypto = element["currency"];
          calculatedWorth += info["currentlyOwned"][crypto] * element["prices"][0];
        });
        
        setNetWorth(calculatedWorth);
      }

      if (netWorth === -1) { //initializing 
        calculateNetWorth();
      }
      else {
        setDifference(netWorth - total);
      }
    }, [netWorth])

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
                {
                  netWorth === -1 ? 
                  <Typography variant="h4" align="center">Net Worth: calculating </Typography>
                  :
                  <Typography variant="h4" align="center">Net Worth: ${parseFloat(netWorth).toFixed(2)}</Typography>
                }
                
                <Typography variant="h4" align="center">Amount Spent: ${parseFloat(total).toFixed(2)} </Typography>

                {
                  difference === -1 ? 
                  <Typography variant="h4" align="center">Net Gain: calculating </Typography>
                  :
                  <Typography variant="h4" align="center">Net Gain: ${parseFloat(difference).toFixed(2)}</Typography>
                }
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
