//Reducer to help regulate Articles state
//-----
const Functions = {}; //Any functions that help the reducer below.
const initialData = {
  coordinates: [2, 2], //The 'coordinates' of T. DEFAULT = [2,2]
  index: 4, //The 'index' that 'T' is at. DEFAULT = 4
  errors: "", //Any errors that need to be shown to the user. DEFAULT = ""
  timesMoved: 0, //The amount of times the user has moved. DEFAULT = 0

  formData: {
    input: "", //input of the form.
  },
};
//
//------    ---------   ----------------    ---------   ----------
//------    ---------   ----------
//----Main Component:
const Reducer = (state = initialData, action) => {
  //Switch statement
  switch (action.type) {
    //-----               -------
    //When the left buton is clicked on
    //-----               -------
    case "LEFT-button": {
      //When the letter needs to go left.
      //console.log("LEFT-button");
      const { index } = state;
      let data; //Used while caluclating data.
      const INDEXES = {
        //USED TO HELP CALCULATE THE NEXT PLACE ON THE GRID
        //INDEX: {#NeededToGetToNextSquare, [coordinates to **add**]}
        1: { addOn: 2, coordinates: [0, 1] },
        6: { addOn: -3, coordinates: [0, -1] },
      };

      data = Functions.Calculate(state, INDEXES, false); //Calculate the next move.
      if (data !== false) {
        //IF there is data for the next spot then
        return data; //return new state data.
      }

      if (index !== 3) {
        //IF the next spot is located inside of the grid then
        INDEXES[index] = { addOn: -1, coordinates: [-1, 0] }; //Add the new index to the index
        data = Functions.Calculate(state, INDEXES, false); //Calculate the next move.
        if (data !== false) {
          //IF there is data for the next spot then
          return data; //return new state data.
        }
      }

      //ELSE, the next idx is not in the square
      return {
        //Update the slice of state
        ...state,
        errors: "You can't go left",
      };
    }
    //--------------       ---------------

    //-----               -------
    //When the right buton is clicked on
    //-----               -------
    case "RIGHT-button": {
      //When the letter needs to go right.
      //console.log("RIGHT-button");
      const { index } = state;
      let data;
      const INDEXES = {
        //USED TO HELP CALCULATE THE NEXT PLACE ON THE GRID
        //INDEX: {#NeededToGetToNextSquare, [coordinates to **add**]}
        2: { addOn: 3, coordinates: [1, 1] },
        7: { addOn: -2, coordinates: [1, -1] },
      };

      data = Functions.Calculate(state, INDEXES, false); //Calculate the next move.
      if (data !== false) {
        //IF there is data for the next spot then
        return data; //return new state data.
      }

      if (index !== 5) {
        //IF the next spot is located inside of the square then
        INDEXES[index] = { addOn: 1, coordinates: [1, 0] }; //Add the new index to the index
        data = Functions.Calculate(state, INDEXES, false); //Calculate the next move.
        if (data !== false) {
          //IF there is data for the next spot then
          return data; //return new state data.
        }
      }

      //ELSE, the next idx is not in the square
      return {
        ...state,
        errors: "You can't go right",
      };
    }
    //--------------       ---------------

    //-----               -------
    //When the down buton is clicked on
    //-----               -------
    case "DOWN-button": {
      //When the letter needs to go down.
      //console.log("DOWN-button");
      const nxtVal = Math.floor(Math.random() * (3 - 2 + 1) + 2); //choose a random number between 2 and 3.
      const INDEXES = {
        //USED TO HELP CALCULATE THE NEXT PLACE ON THE GRID
        //INDEX: {#NeededToGetToNextSquare, [coordinates to **add**]}
        1: { addOn: nxtVal, coordinates: [nxtVal === 3 ? 1 : 0, 1] },
        2: { addOn: nxtVal, coordinates: [nxtVal === 3 ? 1 : 0, 1] },
        3: { addOn: 3, coordinates: [0, 1] },
        4: { addOn: nxtVal, coordinates: [nxtVal === 2 ? -1 : 0, 1] },
        5: { addOn: 2, coordinates: [-1, 1] },
      };

      const data = Functions.Calculate(state, INDEXES, false); //Calculate the next move.
      if (data !== false) {
        //IF there is data for the next spot then
        return data; //return new state data.
      }

      //ELSE, the next idx is not in the square
      return {
        ...state,
        errors: "You can't go down",
      };
    }
    //--------------       ---------------

    //-----               -------
    //When the up buton is clicked on
    //-----               -------
    case "UP-button": {
      //When the letter needs to go up.
      //console.log("UP-button");
      const nxtVal = Math.floor(Math.random() * (3 - 2 + 1) + 2);
      const INDEXES = {
        //USED TO HELP CALCULATE THE NEXT PLACE ON THE GRID
        //INDEX: {#NeededToGetToNextSquare, [coordinates to **add**]}
        3: { addOn: 2, coordinates: [0, 1] },
        4: { addOn: nxtVal, coordinates: [nxtVal === 3 ? 1 : 0, 1] },
        5: { addOn: 3, coordinates: [1, 1] },
        6: { addOn: nxtVal, coordinates: [nxtVal === 2 ? -1 : 0, 1] },
        7: { addOn: nxtVal, coordinates: [nxtVal === 2 ? -1 : 0, 1] },
      };

      const data = Functions.Calculate(state, INDEXES, true); //Calculate the next move.
      if (data !== false) {
        //IF there is data for the next spot then
        return data; //return new state data.
      }

      //ELSE, the next idx is not in the square
      return {
        ...state,
        errors: "You can't go up",
      };
    }
    //---------     ---------
    //---------     ---------
    //---------     ---------

    //-----               -------
    //When the reset buton is clicked on
    //-----               -------
    case "RESET-button": {
      //console.log("RESET-button")
      return {
        ...state,
        index: 4, //reset index to middle.
        coordinates: [2, 2], //reset coord.
        timesMoved: 0, //reset times moved.
        errors: "", //clear errors
      };
    }
    //--------------       ---------------

    //-----               -------
    //When the input form is changed
    //-----               -------
    case "INPUT-label": {
      //console.log("INPUT-label")
      return {
        //Update state
        ...state,
        errors: "", //clear any errors:
        formData: {
          input: action.payload, //Update the input form
        },
      };
    }
    //--------------       ---------------

    //-----               -------
    //When the form is ready to be SUBMITTED
    //-----               -------
    case "SUBMIT-button": {
      //console.log("SUBMIT-button")
      const payload = {
        //the payload that will be used to submit
        x: state.coordinates[0],
        y: state.coordinates[1],
        steps: state.timesMoved,
        email: state.formData.input,
        name: state.formData.input.split("@")[0],
      };
      payload.code =
        (payload.x + 1) * (payload.y + 2) * (payload.steps + 1) +
        payload.email.length;

      return {
        //Update the slice of state.
        ...state,
        errors: `${payload.name} win #${payload.code}`, //Update the message label.
        formData: {
          ...state.formData,
          input: "", //clear the form input.
        },
      };
    }

    //-----               -------
    //When there is an error needed to be shown
    //-----               -------
    case "ERROR": {
      return {
        //Update the slice of state
        ...state,
        errors: action.payload,
      };
    }
    //
    //DEFAULT------
    default: {
      if (action.type !== "@@INIT") {
        //On the first instance, skip over and return regular state. This only involves UI that is on the screen.
        //(This should not occur).
        console.log(`${action.type} REDUCER CANNOT BE FOUND.`); //tell the developer
        //This will only occur if a(n) reducer cannot be found for a corresponding action-creator
        return {
          //Update the slice of state
          ...state,
          errors: `ERROR: ${action.type} not found`,
        };
      } else {
        return state;
      }
    }
  }
};
//--------------
// EXTRA FUNCTIONS:
//
//This function should calculate the next available spot to move to:
Functions.Calculate = function (state, INDEXES, Add) {
  //state, Index data, (subtract or addition)
  const { index } = state;

  for (let [nam, val] of Object.entries(INDEXES)) {
    //[name, value] in pairs (INDEXES) getChildren
    //Loop
    if (index.toString() === nam.toString()) {
      //IF the index has a cooresponding item found in the 'INDEXES' then
      return {
        //Update the slice of state
        ...state,
        index: Add ? state.index - val.addOn : state.index + val.addOn, //Allow the block to move
        errors: "",
        coordinates: [
          //update coordinates based on corresponding values.
          Add //IF 'add' is true then
            ? state.coordinates[0] - val.coordinates[0] //subtract the values
            : state.coordinates[0] + val.coordinates[0], //ELSE, add the values
          Add
            ? state.coordinates[1] - val.coordinates[1]
            : state.coordinates[1] + val.coordinates[1],
        ],
        timesMoved: state.timesMoved + 1,
      };
    }
  }

  return false; //return 'false' indicating that nothing was found.
};

//---Exports:
export default Reducer;
