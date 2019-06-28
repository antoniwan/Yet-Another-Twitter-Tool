const authReducer = (state, action) => {
  switch (action.type) {
    case "REQUESTING_TOKEN":
      return { ...state, loading: true };
    case "TOKEN_ACCEPTED":
      return {
        ...state,
        token: action.token_info,
        authenticated: null,
        loading: false
      };
    case "LOG_OUT":
      return { ...state, token: null, authenticated: null, loading: false };
    default:
      throw new Error();
  }
};

export default authReducer;
