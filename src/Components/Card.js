import css from "./Card.css";
import { ethers } from "ethers";
import ABI from "./ABI.json";
import { useState, useEffect } from "react";
import tokenABI from "./tokenABI.json";





function Card(props) {

    const [Bought, setBought] = useState(false);

    const checkBought = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const currentAddress = await provider.getSigner().getAddress();


        const marketplaceContract = new ethers.Contract("0x01Da2ad17f04B28f6CB4953980d8a8162487B084", ABI, signer); 
        const bought = await marketplaceContract.alreadyBought(currentAddress);
        setBought(bought);
        console.log(Bought);



    }


    const Connect = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts");
        console.log("Trying to connect");
    }


    const payInETH = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const currentAddress = await provider.getSigner().getAddress();


        const marketplaceAddress = "0x01Da2ad17f04B28f6CB4953980d8a8162487B084";
        const marketplaceContract = new ethers.Contract(marketplaceAddress, ABI, signer);
        const amount = await provider.getBalance(currentAddress);
        const formatted = ethers.utils.formatEther(amount);
        console.log(formatted)


        const price = await marketplaceContract.getPriceOnETH();
        console.log(ethers.utils.formatEther(price));
        console.log(ethers.utils.formatEther(amount));

        if (ethers.utils.formatEther(amount) >= ethers.utils.formatEther(price)) {
            //they can buy
            console.log("trying to buy")
            const pay = await marketplaceContract.payItemInETH({ value: price })
            console.log(pay);
            const receipt = await pay.wait();
            if (receipt.confirmations > 0) {
                
                console.log(pay);
                checkBought();

            }
        } else {
            console.log("Not enough Eth")
            //they can't buy 
        }

    }


    const payInUSDC = async () => {
        Connect();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const currentAddress = await provider.getSigner().getAddress();
        const marketplaceAddress = "0x01Da2ad17f04B28f6CB4953980d8a8162487B084";
        const marketplaceContract = new ethers.Contract(marketplaceAddress, ABI, signer); 
        const token = new ethers.Contract("0x1AB3d68a8E11db49f3B7020417cBd65dDFe79818", tokenABI, signer);

        const totalAmount = await token.balanceOf(currentAddress);
        const totalAllowed = await token.allowance(currentAddress, marketplaceAddress)
        const price = await marketplaceContract.price(); 

        console.log("Total: " + totalAmount)
        console.log("Allowed: " + totalAllowed)
        console.log("Price: " + price)

        if (price <= totalAmount) {
            //they have enough to buy
            if (price <= totalAllowed) {
                const purchase = await marketplaceContract.payInUSDC();
                setBought(purchase);

            } else {
                //they have enough money but they need to allow it
                const approve = await token.approve(marketplaceAddress, price);
                const receipt = await approve.wait();
                if (receipt.confirmations > 0) {
                    const purchase = await marketplaceContract.payInUSDC();
                    setBought(purchase);
                }
            }
        } else {
            //they dont have enough to buy
        }

    }

    useEffect(() => {
        checkBought();
    }, []);
    


    return (

        <div className="card">

            

            <div class="card__image-container">
                <img
                    src={props.imageURL}
                    width="400"
                />

            </div>
            <div class="card__content">
                <p class="card__title text--medium">
                    {props.name + props.id}
                </p>
                <div class="card__info">
                    <p class="text--medium">{props.description} </p>

                </div>
                
                {Bought == true ?

                    ///
                    <div>
                        <p class="card__price text__price">
                            <a href="/Item1"> View your product</a> </p>

                    </div>

                    :

                    <div>
                    <div>
                    <img onClick={payInUSDC} class="buyIcon" src="https://imgur.com/MQHRBrg.png" ></img>
                    <img onClick={payInUSDC} class="buyIcon" src="https://imgur.com/wndKTZS.png" ></img>
                    <img onClick={payInETH} class="buyIcon" src="https://imgur.com/sQsv7UD.png" ></img>
                </div>
               
                

                <div>
                    <p class="card__price text__price"> $10</p>
                        </div>
                        </div>
                                    
                    }


            </div>
        </div>


    );
}

export default Card;