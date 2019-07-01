const twitter = (function() {
  async function get_profile(oauth_info) {
    const {
      oauth_token,
      oauth_token_secret,
      screen_name,
      user_id
    } = oauth_info;
    let response = await fetch(
      `api/twitter/get_profile?screen_name=${screen_name}&oauth_token=${oauth_token}`
    );
    if (response.ok) {
      return response.json();
    }
    return false;
  }

  return {
    get_profile
  };
})();

export default twitter;
