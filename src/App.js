import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Homepage from "./Components/Homepage.js";
import Products from "./Components/Products.js";
import { ethers } from "ethers";
import { useState, useEffect } from "react";


function App() {

    const [currentAccount, setCurrentAccount] = useState(null);
    const [chainName, setChainName] = useState(null);

    const getWalletAddress = async () => {

        if (window.ethereum && window.ethereum.isMetaMask) {
            //este if simplemente checkea si tienes metaMask, y si lo tienes corre la funcion.

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            await provider.send("eth_requestAccounts");
            const currentAddress = await provider.getSigner().getAddress();

            setCurrentAccount(currentAddress);


            const chain = await provider.getNetwork();
            setChainName(chain.name);
            console.log(provider)

            const accounts = await provider.send("eth_requestAccounts");
            console.log(accounts);
            provider.getSigner(accounts[0])

        }
    }

  return (
    <div className="App">
          <header>
              <nav>
                  <div className="logo">
                      <h1> <a href=""> Matiu's Toolbox </a></h1>
                  </div>

                  <ul>
                      <li> <a href="./"> Home </a> </li>
                      <li> <a href="/Products"> Products </a> </li>
                      
                      <li className="nav-cta" onClick={getWalletAddress()}><a href=""> Connect </a></li>

                  </ul>


              </nav>
          </header>

          <Router>
              <Routes>
                  <Route path="/" element={ <Homepage /> } />
                  <Route path="/Products" element={<Products />} />
              </Routes>
          </Router>
          
    </div>
  );
}

export default App;
