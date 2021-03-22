import React from 'react';
import './cookie-game.styles.scss';


class CookieGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cookies: 0,
      clickers: [
        {
          name: 'Cursor',
          frequency: 10,
          cost: 10,
          desc: 'Autoclicks every 10 seconds',
          numberOf: 0,
          lastEntry: new Date()
        }
      ]
    };

    this.clickCookie = this.clickCookie.bind(this);
  }

  onAddClicker = i => {
    const clickers = this.state.clickers;
    clickers[i].numberOf = clickers[i].numberOf+1;
    clickers[i].lastEntry = new Date();

    this.setState({
      cookies: this.state.cookies - clickers[i].cost,
      clickers: clickers
    });
  };

  isClickerDisabled = cost => {
    return this.state.cookies < cost;
  }

  clickCookie(){
    this.setState({
        cookies: this.state.cookies + 1
      });
      if (this.state.cookies >= 10) {
      this.setState({
        isDisabled: false
      });
    }
  }

  cookieClicker(){
    this.setState({
        clicker: this.state.clickers + 1,
        cookie: this.state.cookies - 10
      });
    if (this.state.clicker <= 10) {
      this.setState({
         isDisabled: true
      });
    }
  }

  //clicker defenition

  render() {
    const thatState = this.state;
    return (
      <div className='cookie-container'>
      <div className={"row"}>
        <div className={"col-xs-6 well"}>
          <div className={'col-xs-12'} >Cookies: {[thatState.cookies]}</div>
          <div className={'col-xs-12 cookie'} onClick={this.clickCookie}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/e/e5/Crystal_Project_cookie.png' className="Cookie-logo" alt="logo" />
          </div>
          <div className={'col-xs-12'}>+1</div>
        </div>
        <div className={"col-xs-6"}>
          <div className={"col-xs-12"} className='clickers-container'>
            <h3>Clickers</h3>

            {this.state.clickers.map((clicker, i) => (
              <div className={"clicker"}>
                <p><b>{clicker.name}</b></p>
                <span>Autoclicks every 10 seconds</span>
                <p className={"clicker-cost"}>Cost:10</p>
                <button className="btn btn-primary" 
                disabled={this.isClickerDisabled(clicker.cost)} 
                onClick={() => this.onAddClicker(i)}
                >Buy Clicker for 10 Cookies ({clicker.numberOf})</button>
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
