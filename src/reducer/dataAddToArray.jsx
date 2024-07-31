// initialState
var initialState = {
  customers: [],
};

// Action types
const ADD = "ADD";
const DELETE = "DELETE";
// Reducer function
const changeNumber = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      console.log("JIJ");
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };

    case DELETE:
      console.log("Action Payload:", action.payload);
      console.log("Action Type:", action.type);
      console.log("Current State:", state);
      return {
        ...state,
        customers: state.customers.filter(
          (_, index) => index != action.payload
        ),
        
      };

    default:
      return state;
  }
};

// Action creator
export const addCustomer = (customer) => ({
  type: ADD,
  payload: customer,
});

export const deleteCustomer = (id) => ({
  type: DELETE,
  payload: id,
});
export default changeNumber;
