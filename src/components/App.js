import "../css//App.css";
import "../css/header.css";
import React from "react";
import gameAbi from "../ABIs/revolver";
import linkAbi from "../ABIs/linkToken";
import { signer, provider } from "../web3";
import { ethers } from "ethers";
import Header from "./Header";
import { Container } from "semantic-ui-react";
import StartGame from "./StartGame";
import Game from "./Game";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameContract: null,
      linkContract: null,
      sessionId: null,
    };
  }

  async componentDidMount() {
    let gameContract = new ethers.Contract(
      "0x056545aaab7817fe175f22f2aB49DBcA47E140e3",
      gameAbi,
      signer
    );
    let linkContract = new ethers.Contract(
      "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
      linkAbi,
      signer
    );
    this.setState({ gameContract, linkContract });
  }

  handleDataFromChild = (data) => {
    this.setState({ sessionId: data });
  };

  render() {
    return (
      <div className="app-container">
        <Container className="box">
          <Header />
          {console.log(this.state.gameContract)}
          <StartGame
            gameContract={this.state.gameContract}
            linkContract={this.state.linkContract}
            sessionId={this.handleDataFromChild}
          />
          {console.log(this.state.sessionId)}

          <Game
            gameContract={this.state.gameContract}
            linkContract={this.state.linkContract}
            sessionId={this.state.sessionId}
          />
        </Container>
      </div>
    );
  }
}
export default App;
