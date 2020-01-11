import * as React from 'react';
import styled from 'styled-components';

const StyledText = styled.div<{heading?: boolean, secondary?: boolean}>`
  font-size: ${(props) => {
    if (props.heading) return '48px';
    if (props.secondary) return '13px';
    return '16px';
  }};
  opacity: ${(props) => (props.secondary ? '0.56' : '0.87')};
`;

interface TextProps {
  heading?: boolean;
  secondary?: boolean;
}

const Text: React.FunctionComponent<TextProps> = ({ heading, secondary, children }) => (
  <StyledText heading={heading} secondary={secondary}>
    {children}
  </StyledText>
);

export default Text;
export { TextProps };
