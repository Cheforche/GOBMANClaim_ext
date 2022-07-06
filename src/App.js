import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";


// Global variables for the token IDs, reassigned upon each init. Feel free to
// move as needed
let parsedGobmanTokenIds = [];
let parsedGodPanelTokenIds = [];

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;
  

export const StyledButton = styled.button`

  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 140px;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.9);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;

  flex-wrap: wrap;
  flex: 1;
  flex-direction: column;
  height: 70vh;
  justify-content: left;
  align-items: flex-start;

  @media (min-width: 400px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 400px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  
  
 
  background-size: cover;
background-repeat: no-repeat;
  border-radius: 0%;

    align-items: center;
  @media (min-width: 300px) {
    width: 150px;
  }
  @media (min-width: 300px) {
    width: 150px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingGodpanel, setClaimingGodPanel] = useState(false);
  const [claimingGobMan, setClaimingGobMan] = useState(false);
  const [feedback, setFeedback] = useState(`ClAiMz GoBMaN.`);

  const [CONFIG, SET_CONFIG] = useState({
       
    GOBMAN_ADDRESS: "",
    GODPANEL_ADDRESS: "",
    GOBMAN_CLAIM_ADDRESS:"",
    MINT_MODULE_ADDRESS:"",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: true,
  });






  const claimGobman = () => {

    
    
    //let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    //let totalCostWei = String(cost * parsedGobmanTokenIds.length);
    let totalGasLimit = String(gasLimit * parsedGobmanTokenIds.length);
    //console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    
    setFeedback(`GoBMaN Mntng ${CONFIG.NFT_NAME}...`);
    setClaimingGobMan(true);
   
   
    blockchain.smartContract.methods
    
        .redeemMany(CONFIG.GOBMAN_CLAIM_ADDRESS,CONFIG.GOBMAN_ADDRESS, parsedGobmanTokenIds)
        .send({
          gasLimit: String(totalGasLimit),
        to: CONFIG.MINT_MODULE_ADDRESS,
        from: blockchain.account,
        //value: totalCostWei,
        
       
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Oh NoZe, U BrOk SuMtHeNg: You either dont own the required token or You dont have enough to pay for gas");
        setClaimingGobMan(false);
      
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingGobMan(false);
       
        dispatch(fetchData(blockchain.account));
      });
  };
  const claimGodPanel = () => {

    
    //let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    //let totalCostWei = String(cost * parsedGodPanelTokenIds.length);
    let totalGasLimit = String(gasLimit * parsedGodPanelTokenIds.length);
    //console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    
    setFeedback(`GoBMaN Mntng ${CONFIG.NFT_NAME}...`);
    setClaimingGodPanel(true);
   
   
    blockchain.smartContract.methods
    
        .redeemMany(CONFIG.GOBMAN_CLAIM_ADDRESS,CONFIG.GODPANEL_ADDRESS, parsedGodPanelTokenIds)
        .send({
          gasLimit: String(totalGasLimit),
        to: CONFIG.MINT_MODULE_ADDRESS,
        from: blockchain.account,
        //value: totalCostWei,
        
       
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Oh NoZe, U BrOk SuMtHeNg: You either dont own the required token or You dont have enough to pay for gas");
        setClaimingGodPanel(false);
      
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingGodPanel(false);
       
        dispatch(fetchData(blockchain.account));
      });
  };
/*
  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 5) {gif
      newMintAmount = 5;
    }
    setMintAmount(newMintAmount);
  };
*/
async function onInit() {
  console.log(onInit);
 
  // Change from eth-rinkeby to eth-mainnet when ready to go live
  const web3 = AlchemyWeb3.createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/v2/fJQTi3ul71bQ7vKzzbwdQlgc4eDGE6vH");
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  const gobManNFTs = await web3.alchemy.getNfts({owner: account, contractAddresses: ["0xF0eDb09401Ddf2bc56a93a3a1E23fe174b9bF152"]});
  parsedGobmanTokenIds = [];
  
  for (let i = 0; i < gobManNFTs.ownedNfts.length; i++) {
    parsedGobmanTokenIds[i] = parseInt(gobManNFTs.ownedNfts[i].id.tokenId,16);
  }

  const godPanelNFTs = await web3.alchemy.getNfts({owner: account, contractAddresses: ["0x66C687C73a1fb42FDF2391fc9Da90048189dD97d"]});
  parsedGodPanelTokenIds = [];

  for (let i = 0; i < godPanelNFTs.ownedNfts.length; i++) {
    parsedGodPanelTokenIds[i] = parseInt(godPanelNFTs.ownedNfts[i].id.tokenId,16);
  }

  console.log("parsedGobmanTokenIds");
  console.log(parsedGobmanTokenIds.length);
  console.log(parsedGobmanTokenIds);
  console.log("parsedGodPanelTokenIds");
  console.log(parsedGodPanelTokenIds);
  console.log(parsedGodPanelTokenIds.length);

  // Filter the Redeemed tokens

  // console.log("Filtering redeemed tokens")
  // blockchain.smartContract.methods
  //       .tokenRedeemed(CONFIG.COLLECTIVE_ADDRESS, CONFIG.GOBMAN_ADDRESS, 32)
  //       .call({
  //       to: CONFIG.MINT_MODULE_ADDRESS,
  //       from: blockchain.account,
  //     })
  //     .then((receipt) => {
  //       console.log(receipt);
  //     });
  
}



  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);
 
  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 80, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/IMG_0629.jpg" : null}
      >
        
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 1}} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 80,
              borderRadius: 1,
              border: "3px solid var(--secondary)",
              
            }}
          >
            
            <StyledImg alt={"example"} src={"/config/images/GobMan-ICON_Gif.gif"} style={{ padding:1, }} />
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 25,
                
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
             
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                
              </StyledLink>
            </s.TextDescription>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)", size:"45px" }}
                >
                 U ClAiMz Ur GoBMaN HeReZ {" "}
                  
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  GoBMaN CaN'T  CoNtRoLz  GaZ 
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        onInit();            
                        getData();
                      }}
                    >
                     CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                 
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />

                    
                    
                    
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingGobMan ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimGobman();
                          getData();
                        }}
                      >
                        {claimingGobMan ? "BiZy" : "ClAiMz  GoBmAn"}
                      </StyledButton>
                    </s.Container>


                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingGodpanel ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimGodPanel();
                          getData();
                        }}
                      >
                        {claimingGodpanel ? "BiZy" : "ClAiMz GodPanel"}
                      </StyledButton>
                    </s.Container>
                    
                   


                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
           
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerMedium />
        
      </s.Container>
    </s.Screen>
  );
}

export default App;
