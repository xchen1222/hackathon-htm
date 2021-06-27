import { Box, AppBar,Toolbar, IconButton,Typography,Button } from "@material-ui/core"
import { Link } from 'react-router-dom'

export const LandingPage = () => {
    return (
        <div>
            <div style = {{height:"50vh" ,backgroundColor: 'beige' 
            }}color="black">
                <header>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={'classes.menuButton'} color="inherit" aria-label="menu">
                            </IconButton>
                            <Typography variant="h6" className={'classes.title'}>
                                <Link to="/home" style={{color: 'white'}}> <Button color="inherit" >Home</Button></Link>
                            </Typography>
                            <h1 style={{paddingLeft:"50px"}}color="inherit">Free to Play</h1> 
                        </Toolbar>
                    </AppBar>
                </header>
                <h1 style={{height:"5vh" ,fontSize: 50, marginTop: 0 , color:"blue"}} align="center">CryptoGame</h1>
                <p align="center">
                CryptoGame is meant to be used as a starting point for unexperienced 
                people to take the first step into trading Crypto Currency. You can buy a variety of different Cryptocurrencies all the way back to 2011.
                </p>
                <br/>
                <br/>
                <br/>
                <br/>
                <Box textAlign="center">
                    <Link to="/information">
                    <Button justify="center" type="submit" variant="contained" color="primary">
                      Start Trading
                    </Button>
                    </Link>
                </Box>
                

            </div>
            <div style = {{height:"60vh", backgroundColor: '#14e0e3'}}>
                <h1 style = {{ marginTop: 0}} align = "center" >Choose from over 1500 different types of Cryptocurrencies</h1>
                <p align = "center"> What Are Cryptocurrencies? Cryptocurrency is a form of currency that exists solely in digital form. Cryptocurrency can be used to pay for purchases online without going through an intermediary, such as a bank, or it can be held as an investment. </p>
                <div className = "center">
                    <img width= "150" src="https://cdn.discordapp.com/attachments/539683889959010318/858561134570897428/825.png" alt="T" />
                    <img width= "150" src="https://cdn.discordapp.com/attachments/539683889959010318/858561160608481330/1200px-Ethereum-icon-purple.png" alt="T" />
                    <img width= "150" src="https://cdn.discordapp.com/attachments/539683889959010318/858561182649810954/BTC_Logo.png" alt="T" />
                </div>
            </div>
        </div>
    )
}
