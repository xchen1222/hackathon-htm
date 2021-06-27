import { React, useState, Component, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Typography, Button, Grid, Input, InputLabel, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { CURRENCIES_NAME } from '../utils/constants';
import Select, { createFilter } from 'react-select'
import { FixedSizeList as List } from "react-window";
import { InfoContext } from "../utils/InfoContext";

const height = 35;
class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

export const Information = () => {
    const key = "ee6c292cc23401ab20400f4e10c7c5e3f6c83a90";
    const [days, setDays] = useState("")
    const [prices, setPrices] = useState("0");
    const [data, setData] = useState([])
    const [crypto, setCrypto] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState(-1);

    const { info, setInfo } = useContext(InfoContext);

    useEffect(() => {
        if (data.length !== 0) {
            setDays(data[0].timestamps[0]);
            setPrices(data[0].prices[0]);
        }
        else {
            setDays("");
            setPrices("0");
        }
    }, [data])

    const handleChange = (e) => {
        if (e.target.name === "date")
          setDate(e.target.value);
        if (e.target.name === "amount")
          setAmount(e.target.value);
    }

    const handleSelectChange = (e) => {
      setCrypto(e.label);
      setData([]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let currDate = info["lastDatePurchased"];
        if (currDate > date) { //going into the past, throw alert(?)
          alert("Can't go into the past");
        }
        else {
          let linkToAPI = "https://api.nomics.com/v1/currencies/sparkline?key=" + key + "&ids=" + crypto + "&start=" + date + "T00:00:00Z&end=" + date + "T00:00:00Z";
          try {
              let response = await axios.get(linkToAPI);
              if (response.data.length === 0) {
                console.log("NO RESULTS");
                linkToAPI = "https://api.nomics.com/v1/currencies/sparkline?key=" + key + "&ids=" + crypto + "&start=" + date + "T00:00:00Z";
                try {
                  setTimeout(async function() {
                    response = await axios.get(linkToAPI);
                    console.log("new response: ", response.data);
                    setData(response.data);
                  }, 1000);
                  
                } catch (error) {
                  console.log(error);
                }
              }
              else {
                setData(response.data);
              }
          } catch (error) {
              console.log(error);
          }
        }
    }

    const handleBuy = async (e) => {
        e.preventDefault();
        let total = info["amountSpent"];
        let temp = info["currentlyOwned"];
 
        if (crypto in temp) { //already own some
            temp[crypto] += parseInt(amount);
        }
        else { //first time purchasing
            temp[crypto] = parseInt(amount);
        }
        
        total += amount * prices;

        setInfo({"currentlyOwned": temp });
        setInfo({"lastDatePurchased": days});
        setInfo({"amountSpent": total});
    }

    const handleSell = async (e) => {
        e.preventDefault();
        let total = info["amountSpent"];
        let temp = info["currentlyOwned"];

        if (crypto in temp) { //already own some
            if (amount > temp[crypto]) {
                alert("You don't own enough of this cryptocurrency, buy some more first.");
            }
            else { // successfully sell
                temp[crypto] -= parseInt(amount);
            }
        }
        else { //don't own any
            alert("You don't own any of this cryptocurrency, buy some first.");
        }

        total -= amount * prices;

        setInfo({"currentlyOwned": temp });
        setInfo({"lastDatePurchased": date});
        setInfo({"amountSpent": total});
      
    }

    const handleReset = async (e) => {
        e.preventDefault();
        setInfo({"currentlyOwned": {} });
        setInfo({"lastDatePurchased": ""});
        setInfo({"netWorth": 0});
        setInfo({"amountSpent": 0});
    }

    const generateTable = () => {
      return (
        <TableContainer component={Paper} >
          <Table style={{minWidth: 650,}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Cryptocurrency</TableCell>
                <TableCell align="center">Amount Owned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { Object.keys(info["currentlyOwned"]).map((key) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row"  align="center">
                    {key}
                  </TableCell>
                  <TableCell align="center">{info["currentlyOwned"][key]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    return (
        <>
        <Typography variant="h1" align="center">CryptoGame</Typography> <br/>
        <Grid container justify="center">

            <form onSubmit={handleSubmit}>
              <Grid>
                  <InputLabel>Cryptocurrency</InputLabel>
                  <Select filterOption={createFilter({ ignoreAccents: false })} components={{ MenuList }} options={CURRENCIES_NAME} onChange={handleSelectChange}/>
              </Grid> <br/>

              <Grid>
                  <InputLabel>Date</InputLabel>
                  <Input placeholder="yyyy-mm-dd" id="date" name="date" onChange={handleChange} />
              </Grid>
              <br/>
              <Grid>
                  <Box textAlign="center">
                  <Button justify="center" type="submit" variant="contained" color="primary">
                        Search
                  </Button>
                  </Box>
              </Grid>
            </form>
            
        </Grid>
        <br/>
        <Grid container justify="center">
            <Grid item xs={3}>
                <Typography variant="h5" align="center">Last Updated Date: <br/> {info["lastDatePurchased"].substring(0, 10)}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h5" align="center">Searched Date: <br/> {days.substring(0, 10)}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h5" align="center">Current Price:  <br/> ${parseFloat(prices).toFixed(2)}</Typography>
            </Grid>
        </Grid>
        

        {
            prices.length !== 0 ? 
            <Grid container justify="center">
                <form>
                <Grid>
                    <InputLabel>Select Amount</InputLabel>
                    <Input id="amount" name="amount" onChange={handleChange} />
                </Grid> <br/>

                <Grid container justify="center">
                    <Grid item xs={6}>
                        <Box textAlign="center" >
                            <Button type="submit" variant="contained" color="primary" onClick={handleBuy}>
                                Buy
                            </Button>
                        </Box>
                    </Grid>   
                    <Grid item xs={6}>   
                        <Box textAlign="center">
                            <Button type="submit" variant="contained" color="primary" onClick={handleSell}>
                                Sell
                            </Button>
                        </Box>
                    </Grid>   
                </Grid>
                </form>

                <br/>
                <Grid item xs={12}>
                    <Box textAlign="center" m={3}>
                        <Button variant="contained" color="primary" onClick={handleReset}>
                            Reset
                        </Button>
                    </Box>
                </Grid>
                
            </Grid>
          :
          <> </>
        }
        
          <Grid container justify="center">
            {generateTable()}
          </Grid>

          <Grid>
          {/* send to results page, and results page pulls networth from info context for a summary/etc */}
            <Box textAlign="center" m={2}> 
            <Link to="/results" style={{ textDecoration: 'none' }}>
              <Button type="submit" variant="contained" color="primary">
                End Game
              </Button>
            </Link>
            </Box>
          </Grid>

          <Grid>
          {/* send to results page, and results page pulls networth from info context for a summary/etc */}
            <Box textAlign="center" m={2}> 
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button type="submit" variant="contained" color="primary">
                Home page
              </Button>
            </Link>
            </Box>
          </Grid>
        </>
        
        
    )
}
