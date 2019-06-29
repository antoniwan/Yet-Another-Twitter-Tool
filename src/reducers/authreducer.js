const authReducer = (state, action) => {
  switch (action.type) {
    case "REQUESTING_TOKEN":
      return { ...state, loading: true };
    case "TOKEN_ACCEPTED":
      return {
        ...state,
        request_token: action.token_info,
        authenticated: null,
        loading: false,
        redirecting: true
      };
    case "CONVERTING_TOKEN":
      return {
        ...state,
        loading: true
      };
    case "SAVE_ACCESS_TOKEN":
      const { screen_name, user_id } = action.token_info;
      return {
        ...state,
        access_token: action.token_info,
        loading: false,
        redirecting: false,
        authenticated: true,
        twitter: {
          screen_name,
          user_id
        }
      };
    case "LOG_OUT":
      return { authenticated: null, loading: false };
    default:
      throw new Error();
  }
};

export default authReducer;
