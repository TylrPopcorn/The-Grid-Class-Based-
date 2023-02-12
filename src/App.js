import React from "react";
import { connect } from "react-redux";

import ACTIONS, { ACTION_TYPES } from "../state/action-creators"; //helpers
//----- ------  ------- ---------
//----Main function:
class App extends React.Component {
  //
  //
  //
  //EACH time the "T" needs to move:
  move = (evt) => {
    const target = evt.target; //target.
    const { GLOBAL_ACTIONS } = this.props; //Get a component that will invoke the movement.

    GLOBAL_ACTIONS(target.name);
  };

  //EACH time the input in the form gets changed:
  change = (evt) => {
    const { name, value } = evt.target; //target.
    const { GLOBAL_ACTIONS } = this.props; //Get a component that will invoke the change.

    GLOBAL_ACTIONS(name, value);
  };

  //EACH time the form get submitted:
  submit = (evt) => {
    evt.preventDefault(); //dont reload the page.

    const { formData, timesMoved } = this.props;
    const { GLOBAL_ACTIONS } = this.props; //Get a component that will invoke the submission.

    if (timesMoved <= 0) {
      //IF the user has NOT moved yet
      GLOBAL_ACTIONS("ERROR", "Press any keypad button below"); //tell them to move.
      return;
    } else if (formData.input.trim() <= 0) {
      ///IF the user has not inputted any email
      GLOBAL_ACTIONS("ERROR", "Input email"); //tell them to input an email.
      return;
    }

    if (formData.input.trim().length > 0) {
      //IF the user input has a value in it.
      const submitButton = evt.target.submit;
      submitButton.style.display = "none"; //Hide the button

      //Disable the keypad html:
      const keypad = document.getElementById("keypad"); //grab the keypad
      for (let x = 0; x < keypad.children.length; x++) {
        //loop through the children of the keypad
        const button = keypad.children[x]; //

        if (button.nodeName === "BUTTON") {
          //IF the child is a button then
          button.disabled = true; //disable this button
        }
      }

      GLOBAL_ACTIONS(ACTION_TYPES.SUBMIT); //INVOKE the submit reducer function.
      console.log("You win!"); //

      setTimeout(() => {
        //After some time,
        document.location.reload(); //reload the page for a new game
      }, 3602);
    }
  };

  render() {
    return (
      <div id="wrapper" className="App classBased">
        {/** INFO BAR **/}
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.props.coordinates[0]},{this.props.coordinates[1]}
            )
          </h3>
          <h3 id="steps">
            You moved {this.props.timesMoved}{" "}
            {this.props.timesMoved === 1 ? "time" : "times"}
          </h3>
        </div>
        {/** ------------------ **/}

        {/** The physical grid itself: **/}
        <div id="grid">
          {/*CREDIT TO: Temani Afif, (https://css-tricks.com/css-grid-and-custom-shapes-part-1/) FOR THE GRID HELP!! **/}
          {[1, 2, 3, 4, 5, 6, 7].map((idx) => {
            return (
              <div
                key={idx}
                className={`Hexagon${
                  idx === this.props.index ? " active" : ""
                }`}
              >
                {idx === this.props.index ? "T" : null}
              </div>
            );
          })}
        </div>
        {/** ------------------ **/}

        {/** Message label / Error input **/}
        <div className="info">
          <h3 id="message">{this.props.errors}</h3>
        </div>
        {/** ------------------ **/}

        {/** KEYPAD **/}
        <div id="keypad">
          <button id="left" onClick={this.move} name={`${ACTION_TYPES.LEFT}`}>
            LEFT
          </button>
          <button id="up" onClick={this.move} name={`${ACTION_TYPES.UP}`}>
            UP
          </button>
          <button id="right" onClick={this.move} name={`${ACTION_TYPES.RIGHT}`}>
            RIGHT
          </button>
          <button id="down" onClick={this.move} name={`${ACTION_TYPES.DOWN}`}>
            DOWN
          </button>
          <button id="reset" onClick={this.move} name={`${ACTION_TYPES.RESET}`}>
            reset
          </button>
        </div>
        {/** ------------------ **/}

        {/** INPUT FORM **/}
        <form onSubmit={this.submit}>
          <input
            id="email"
            type="email"
            name={`${ACTION_TYPES.INPUT}`}
            placeholder="type email" //emaiil input only
            value={this.props.formData.input} //Controlled input form
            onChange={this.change} //Each time the input changes
          ></input>
          <input
            id="submit"
            type="submit"
            name={`${ACTION_TYPES.SUBMIT}`}
          ></input>
        </form>
        {/** ------------------ **/}
      </div>
    );
  }
}

//Used for reducer:
const mapstateToProps = (stateFromStore) => {
  return stateFromStore; //Will import props.
};

export default connect(mapstateToProps, ACTIONS)(App); //Props / Reducer
