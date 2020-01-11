import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  -webkit-app-region: drag;
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const TitlePane = styled.div`
  padding-top: 24px;
  display: flex;
  flex: 3;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
`;

const RecentPane = styled.div`
  flex: 2;
  background: transparent;
`;

const Logo = styled.div`
  width: 180px;
  height: 180px;
  border: 1px grey solid;
`;

const Title = styled.div`
  font-size: 48px;
`;

function WelcomeScreen() : JSX.Element {
  return (
    <Container>
      <TitlePane>
        <Logo />
        <Title>pastelight</Title>
      </TitlePane>
      <RecentPane />
    </Container>
  );
}

export default WelcomeScreen;
