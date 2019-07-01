import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Media from "react-bootstrap/Media";
import twitter from "../libs/twitter";

export default function Dashboard(props) {
  const { authState } = props;
  const { screen_name } = authState.twitter;

  async function getTwitterProfile() {
    console.log(authState);
    const twitter_profile = await twitter.get_profile({
      oauth_token: authState.access_token.oauth_token,
      oauth_token_secret: authState.access_token.oauth_token_secret,
      screen_name: authState.access_token.screen_name,
      user_id: authState.access_token.user_id
    });
    console.log(twitter_profile);
  }

  getTwitterProfile();

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src="holder.js/64x64"
                alt={`${screen_name}'s Twitter Avatar`}
              />
              <Media.Body>
                <h5>@{screen_name}</h5>
              </Media.Body>
            </Media>
          </Col>
          <Col>2 of 2</Col>
        </Row>
      </Container>
    </div>
  );
}
