import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../../elements/Button';
import { Text } from '../../elements/Text';
import { RecentList } from './RecentList';
import { RecentLocation, getRecentLocationList } from '../services/recent-location-list';
import { loadFromPath, loadFromPicker } from '../services/catalogue-picker';
import { AppService } from '../../application/app-service';

const Container = styled.div`
  -webkit-app-region: drag;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const NoDrag = styled.div`
  -webkit-app-region: no-drag;
`;

const TitlePane = styled.div`
  padding-top: 56px;
  display: flex;
  width: 60%;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-background);

  ${(AppService.getPlatform() !== 'mac') && `
    border: solid var(--color-primary);
    border-radius: 8px 0 0 8px;
    border-width: 2px 0 2px 2px;
  `}
`;

const RecentPane = styled.div`
  width: 40%;
  background-color: ${(AppService.getPlatform() === 'mac') ? 'transparent' : 'var(--color-background)'};
  overflow: hidden;

  ${(AppService.getPlatform() !== 'mac') && `
    border: solid var(--color-primary);
    border-radius: 0 8px 8px 0;
    border-width: 2px 2px 2px 0;
  `}
`;

// https://www.flaticon.com/free-icon/camera_846799
// TODO: Add attribution for the icon or make my own
/* eslint-disable max-len */
const Logo = styled.div`
  width: 180px;
  height: 180px;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBzdHlsZT0iZmlsbDojRkY0QzY3OyIgZD0iTTI1Ny4wODYsMC41NDVDMTE2LjMsMC41NDUsMi4xNzEsMTE0LjY3NSwyLjE3MSwyNTUuNDZTMTE2LjMsNTEwLjM3NCwyNTcuMDg2LDUxMC4zNzRTNTEyLDM5Ni4yNDUsNTEyLDI1NS40NlMzOTcuODcxLDAuNTQ1LDI1Ny4wODYsMC41NDV6IE0zNTUuMjI4LDMxMi43NTFsLTk5LjIyMiw1Ny4yOTFoLTAuMDExbC05OS4yMjItNTcuMjkxVjE5OC4xNjlsOTkuMjMzLTU3LjI5MWw5OS4yMjIsNTcuMjkxVjMxMi43NTF6Ii8+PHBhdGggc3R5bGU9ImZpbGw6I0IzRDY2MjsiIGQ9Ik0zNTUuMjI4LDMxMi43NTF2MTc4Ljc1M2MtMzAuNTE0LDEyLjg1NC02NC4wNDIsMTkuOTUtOTkuMjIyLDE5Ljk1Yy01OC4xNTUsMC0xMTEuNzg0LTE5LjM4OS0xNTQuNzYzLTUyLjA3NGwxNTQuNzUzLTg5LjMzOWgwLjAxMUwzNTUuMjI4LDMxMi43NTF6Ii8+PHBhdGggc3R5bGU9ImZpbGw6I0Q5MUUzQjsiIGQ9Ik0yNTcuMDg2LDAuNTQ1Yy0wLjM2MSwwLTAuNzE5LDAuMDEyLTEuMDgsMC4wMTR2MTQwLjMxOWw5OS4yMjIsNTcuMjkxdjExNC41ODJsLTk5LjIyMiw1Ny4yOTFWNTEwLjM2YzAuMzYxLDAuMDAxLDAuNzE5LDAuMDE0LDEuMDgsMC4wMTRDMzk3Ljg3MSw1MTAuMzc0LDUxMiwzOTYuMjQ1LDUxMiwyNTUuNDZTMzk3Ljg3MSwwLjU0NSwyNTcuMDg2LDAuNTQ1eiIvPjxwYXRoIHN0eWxlPSJmaWxsOiM4QUQ4RUQ7IiBkPSJNMTU2Ljc3MiwyMS4wMjV2MjkzLjM0NkwxLjk4NywyMjVDMTMuNTEzLDEzMi43ODgsNzQuMDg3LDU1LjgxNywxNTYuNzcyLDIxLjAyNXoiLz48cGF0aCBzdHlsZT0iZmlsbDojMjdCNUQxOyIgZD0iTTI1NS45OTUsMzcwLjA0MmwtMTU0Ljc1Myw4OS4zMzlDMzkuNzE3LDQxMi42NDMsMCwzMzguNjg1LDAsMjU1LjQ2YzAtMTAuODY2LDAuNjgtMjEuNTcxLDEuOTg3LTMyLjA4bDE1NC43ODUsODkuMzcxTDI1NS45OTUsMzcwLjA0MnoiLz48cGF0aCBzdHlsZT0iZmlsbDojRkZEMDU5OyIgZD0iTTUxMC4wMTMsMjg3LjUxOWMtMTEuNTI1LDkyLjIyMy03Mi4xLDE2OS4xOTQtMTU0Ljc4NSwyMDMuOTg2VjE5OC4xNjlMNTEwLjAxMywyODcuNTE5eiIvPjxwYXRoIHN0eWxlPSJmaWxsOiNGRTg3MkI7IiBkPSJNNTEyLDI1NS40NmMwLDEwLjg1NS0wLjY4MSwyMS41Ni0xLjk4NywzMi4wNTlsLTE1NC43ODUtODkuMzVsLTk5LjIyMi01Ny4yOTFsMTU0Ljc1My04OS4zNUM0NzIuMjgzLDk4LjI2Niw1MTIsMTcyLjIyNCw1MTIsMjU1LjQ2eiIvPjxwYXRoIHN0eWxlPSJmaWxsOiM1REFEMkY7IiBkPSJNMzU1LjIyOCw0OTAuNzg0VjMxMi43NTFsLTk5LjIyMiw1Ny4yOTFWNTEwLjM2YzAuMzYxLDAuMDAxLDAuNzE5LDAuMDE0LDEuMDgsMC4wMTRDMjkxLjg2OCw1MTAuMzc0LDMyNS4wMTgsNTAzLjM5OCwzNTUuMjI4LDQ5MC43ODR6Ii8+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+); /* eslint-disable max-len */
`;
/* eslint-enable max-len */

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 32px;
`;

interface WelcomeScreenProps {
  appVersion: string,
}

function WelcomeScreen({ appVersion }: WelcomeScreenProps): JSX.Element {
  const [recentList, setRecentList] = React.useState<RecentLocation[]>([]);

  React.useEffect(() => {
    getRecentLocationList().then(setRecentList);
  }, []);

  return (
    <Container>
      <TitlePane>
        <Logo />
        <TitleContainer>
          <Text heading>pastelight</Text>
          <Text secondary>Version {appVersion}</Text>
        </TitleContainer>
        <NoDrag>
          <Button onClick={loadFromPicker}>Open photo catalogue</Button>
        </NoDrag>
      </TitlePane>
      <RecentPane>
        <NoDrag>
          <RecentList list={recentList} onSelect={((location) => loadFromPath(location.path))} />
        </NoDrag>
      </RecentPane>
    </Container>
  );
}

export { WelcomeScreen, WelcomeScreenProps };
