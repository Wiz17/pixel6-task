// initialState
var initialState = {
    customers: [],
  };
  
  // Action types
  const ADD = 'ADD';
  
  // Reducer function
  const changeNumber = (state = initialState, action) => {
    console.log('Action Payload:', action.payload);
    console.log('Action Type:', action.type);
    console.log('Current State:', state);
  
    switch (action.type) {
      case ADD:
        console.log("JIJ");
        return {
          ...state,
          customers: [...state.customers, action.payload],
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
  
  export default changeNumber;
  