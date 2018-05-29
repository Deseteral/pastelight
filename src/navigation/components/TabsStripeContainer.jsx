import styled from 'styled-components';

const TabsStripeContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.navigationBar};
  padding: 16px;
  border-radius: 4px;
`;

export default TabsStripeContainer;
