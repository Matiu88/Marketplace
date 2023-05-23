import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Homepage from "./Components/Homepage.js";
import Products from "./Components/Products.js";
import AboutUs from "./Components/AboutUs.js";
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
                      <h1> <a href=""> Las Cripto Para Todos  </a></h1>
                  </div>

                  <ul>
                      <li> <a href="/"> Inicio </a> </li>
                      <li> <a href="/Products"> Cursos </a> </li>
                      
                      <li className="nav-cta" onClick={getWalletAddress}><a href=""> Conectar </a></li>

                  </ul>


              </nav>
          </header>

          <Router>
              <Routes>
                  <Route path="/" element={ <Homepage /> } />
                  <Route path="/Products" element={<Products />} />
                  <Route path="/AboutUs" element={<AboutUs />} />

              </Routes>
          </Router>
          
    </div>
  );
}

export default App;
