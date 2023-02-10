import React from "react";


class App extends React.Component {
  
   render() {
    return (
      <div id="wrapper" className="App classBased">
        {/** INFO BAR **/}
        <div className="info">
          <h3 id="coordinates">
            Coordinates (0,0)
          </h3>
          <h3 id="steps">
            You moved 0 times
          </h3>
        </div>
        {/** ------------------ **/}

        {/** The physical grid itself: **/}
        <div id="grid">
          {/*CREDIT TO: Temani Afif, https://css-tricks.com/css-grid-and-custom-shapes-part-1/ FOR THE GRID HELP!! **/}
          {[1, 2, 3, 4, 5, 6, 7].map((idx) => {
            return (
              <div
                key={idx}
                className={`Hexagon${
                  idx === this.props.index ? " active" : ""
                }`}
              >
                T
              </div>
            );
          })}
        </div>
        {/** ------------------ **/}

        {/** Message label / Error input **/}
        <div className="info">
          <h3 id="message">Error</h3>
        </div>
        {/** ------------------ **/}

        {/** KEYPAD **/}
        <div id="keypad">
          <button id="left" >
            LEFT
          </button>
          <button id="up" >
            UP
          </button>
          <button id="right" >
            RIGHT
          </button>
          <button id="down"  >
            DOWN
          </button>
          <button id="reset" >
            reset
          </button>
        </div>
        {/** ------------------ **/}

        {/** INPUT FORM **/}
        <form onSubmit={this.submit}>
          <input
            id="email"
            type="email"
            placeholder="type email" //emaiil input only
          ></input>
          <input id="submit" type="submit"></input>
        </form>
        {/** ------------------ **/}
      </div>
    );
  }
}
