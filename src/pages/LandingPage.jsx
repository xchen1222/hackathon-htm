import { Box } from "@material-ui/core"
import { Link } from 'react-router-dom'

export const LandingPage = () => {
    return (
        
        <div style = {{height:"100vh" ,backgroundImage: `url("https://cdn.discordapp.com/attachments/613255044141285377/858480640500432916/E1dQ7YZVgAMBe1g.png")` }} color="black">
            <h1 style={{fontSize: 50, marginTop: 0}}align="center">About CryptoGame</h1>
            <p align="center">
            CryptoGame is meant to be used as a starting point for unexperienced 
            <br/> people to take the first step into trading Crypto Currency.
            </p>
            <Link to="/information">Click here to go to information page</Link>
        </div>
        
    )
}
