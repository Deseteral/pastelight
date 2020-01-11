import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  -webkit-app-region: drag;
  width: 100vw;
  height: 100vh;
`;

function WelcomeScreen() : JSX.Element {
  return (
    <Container>
      <div>welcome screen</div>
    </Container>
  );
}

export default WelcomeScreen;
