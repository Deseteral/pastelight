import styled, { css } from 'styled-components';
import TabsStripeContainer from './TabsStripeContainer';

const TabItem = styled.div`
  cursor: pointer;
  max-width: 100px;
  margin: 0 8px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ active }) => (active ? '#FFB300' : 'white')};
  opacity: 1;
  transition: max-width 0.4s, margin 0.4s, opacity 0.3s, color 0.4s;
  ${TabsStripeContainer}:not(:hover) & {
    ${({ active, shouldHide }) => (!active && shouldHide) && css`
      max-width: 0;
      margin: 0;
      opacity: 0;
    }
  `}
  }
`;

export default TabItem;
