//
// 02/07
//
//All of the corresponding action types to help with the action-creators:
export const ACTION_TYPES = {
  //Note: reducer names must match the corresponding name in order to work.
  //EX: Red: "RedCircle" -> Reducer name must be "RedCircle".
  LEFT: "LEFT-button",
  UP: "UP-button",
  RIGHT: "RIGHT-button",
  DOWN: "DOWN-button",

  RESET: "RESET-button",
  INPUT: "INPUT-label",
  SUBMIT: "SUBMIT-button",
  ERROR: "ERROR",
};

//All of the action-creators used to help regulate state:
const ACTIONS = {
  //Search for an action: (This will start the reducer process)
  GLOBAL_ACTIONS: function (targetName, data) {
    switch (targetName) {
      //All of the possible UI interactions available.
      //This function will search for any action needed. If found, the reducer will activate and do what must be done.
      //IF not found, the function will return an error on screen.

      case ACTION_TYPES.LEFT: //Left button
        return { type: ACTION_TYPES.LEFT }; //Invoke the left button reducer.

      case ACTION_TYPES.RIGHT: //Right button
        return { type: ACTION_TYPES.RIGHT }; //Invoke the right button reducer.

      case ACTION_TYPES.DOWN: //Down button
        return { type: ACTION_TYPES.DOWN }; //Invoke the down button redcer.

      case ACTION_TYPES.UP: //Up button
        return { type: ACTION_TYPES.UP }; //Invoke the up button reducer.

      case ACTION_TYPES.RESET: //Reset button
        return { type: ACTION_TYPES.RESET };

      case ACTION_TYPES.INPUT: //Input
        return { type: ACTION_TYPES.INPUT, payload: data };

      case ACTION_TYPES.SUBMIT: //Submit
        return { type: ACTION_TYPES.SUBMIT };

      case ACTION_TYPES.ERROR: //Error
        return { type: ACTION_TYPES.ERROR, payload: data };

      default: //return error saying "action not found"
        //NOTE: By DEFAULT, an error should be returned. This function is to only be used for things that need it. Anything else will proceed an error.
        //This shouldn't happen.
        console.error(
          "error - no corresponding action-creator found. Cannot proceed to next task."
        );
        return {
          type: ACTION_TYPES.ERROR,
          payload: `CANNOT Find Action Creator: ${targetName}`,
        };
    }
  },
};

export default ACTIONS; //Export by default (ACTIONS).
