import React from "react";
import "./cookie-game.styles.scss";

class CookieGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cookies: 0,
      clickAddsNumber: 1,
      doubleClicksCounter: 0,
      clickers: [
        {
          id: 1,
          name: "Cursor",
          frequency: 10, //seconds
          cost: 10, //cookies
          desc: "Autoclicks every 10 seconds",
          numberOf: 0, //instances
          lastEntry: new Date(), //last execution
          addNumber: 0
        },
        {
          id: 2,
          name: "Grandma",
          frequency: 1, //seconds
          cost: 20, //cookies
          desc: "Grandma bakes a cookie every second",
          numberOf: 0, //instances
          lastEntry: new Date(), //last execution
          addNumber: 1
        },
        {
          id: 3,
          name: "Farm",
          frequency: 1, //seconds
          cost: 500, //cookies
          desc: "Farm crops 8 cookies every one second, cost starts at 500",
          numberOf: 0, //instances
          lastEntry: new Date(), //last execution
          addNumber: 8
        }
      ]
    };

    this.clickCookie = this.clickCookie.bind(this);
  }

  onAddClicker = (i) => {
    const clickers = this.state.clickers;
    if (clickers[i].numberOf === 0) {
      clickers[i].lastEntry = new Date();
    }
    clickers[i].numberOf = clickers[i].numberOf + 1;
    this.setState({
      cookies: this.state.cookies - clickers[i].cost,
      clickers: clickers,
    });
  };

  onAddDoubleClicks = () => {
    console.log(this.state.clickAddsNumber);
    this.setState({
      clickAddsNumber: this.state.clickAddsNumber+1,
      doubleClicksCounter: 1
    });
  };

  isClickerDisabled = (cost) => {
    return this.state.cookies < cost;
  };
  
  isDoubleClickerDisabled = () => {
    return this.state.cookies < 10 || this.state.doubleClicksCounter > 0;
  };

  clickCookie() {
    this.setState({
      cookies: this.state.cookies + this.state.clickAddsNumber,
    });
  }

  runClickers() {
    console.log("Hello " + new Date());
    const clickers = this.state.clickers;
    let newCookies = 0;
    const refDate = new Date();
    this.state.clickers.map((clicker, i) => {
      const seconds = (refDate.getTime() - clicker.lastEntry.getTime()) / 1000;
      console.log("seconds ", seconds, clicker.frequency);
      if (seconds >= clicker.frequency) {
        console.log("clicker.numberOf", clicker.numberOf);
        if(clicker.addNumber ===0){         
          newCookies = newCookies + this.state.clickAddsNumber * clicker.numberOf;
        }else{
          newCookies = newCookies + clicker.addNumber * clicker.numberOf;
        }
        clicker.lastEntry = refDate;
      }
    });

    this.setState({
      cookies: this.state.cookies + newCookies,
      clickers: clickers
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.runClickers(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //clicker defenition

  render() {
    const thatState = this.state;
    return (
      <div className="cookie-container">
        <div className={"row"}>{thatState.time}</div>
        <div className={"row"}>
          <div className={"col-xs-6 well"}>
            <div className={"col-xs-12"}>Cookies: {[thatState.cookies]}</div>
            <div className={"col-xs-12 cookie"} onClick={this.clickCookie}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Crystal_Project_cookie.png"
                className="Cookie-logo"
                alt="logo"
              />
            </div>
            <div className={"col-xs-12"}>+{this.state.clickAddsNumber}</div>
          </div>
          <div className={"col-xs-6"}>
            <div className={"col-xs-12"} className="upgrades-container">
              <h3>Upgrades</h3>

              <div className={"upgrader"} >
                  <p>
                    <b>Double Click</b>
                  </p>
                  <span>Double click, increases click production to 2, on click and autoclick.</span>
                  <p className={"upgrader-cost"}>Cost:10</p>
                  <button
                    className="btn btn-primary"
                    disabled={this.isDoubleClickerDisabled()}
                    onClick={() => this.onAddDoubleClicks()}
                  >
                    Buy for 10 Cookies ({this.state.doubleClicksCounter})
                  </button>
                </div>

            </div>
            <div className={"col-xs-12"} className="clickers-container">
              <h3>Clickers</h3>

              {this.state.clickers.map((clicker, i) => (
                <div className={"clicker"} key={clicker.id}>
                  <p>
                    <b>{clicker.name}</b>
                  </p>
                  <span>{clicker.desc}</span>
                  <p className={"clicker-cost"}>Cost:10</p>
                  <button
                    className="btn btn-primary"
                    disabled={this.isClickerDisabled(clicker.cost)}
                    onClick={() => this.onAddClicker(i)}
                  >
                    Buy for {clicker.cost} Cookies ({clicker.numberOf})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CookieGame;
