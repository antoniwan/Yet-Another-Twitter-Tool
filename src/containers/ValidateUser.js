import React, { useContext, useEffect } from "react";
import oauth, { OauthContext } from "../libs/oauth";

export default function ValidateUser() {
  const dispatch = useContext(OauthContext);

  useEffect(() => {
    async function convertToken() {
      const url = new URL(window.location.href);
      const oauth_token = url.searchParams.get("oauth_token");
      const oauth_verifier = url.searchParams.get("oauth_verifier");
      await dispatch({ type: "CONVERTING_TOKEN" });
      const access_token_object = await oauth.convert_token(
        oauth_token,
        oauth_verifier
      );
      await dispatch({
        type: "SAVE_ACCESS_TOKEN",
        token_info: access_token_object.response
      });
    }

    convertToken();
  }, []);
  return <div>validate user!</div>;
}
