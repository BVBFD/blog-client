const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        id: action.payload.userId,
        // token: action.payload.token,
        editable: action.payload.editable,
        profilePic: action.payload.profilePic,
        email: action.payload.email,
      };

    case "LOGOUT":
      return {
        id: null,
        // token: null,
        editable: null,
        profilePic: null,
        email: null,
      };

    default:
      return state;
  }
};

export default Reducer;
