import * as React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;

  padding: 10px;

  color: white;
  background-color: var(--color-primary);

  border: none;
  border-radius: 12px;

  outline: none;
  cursor: pointer;
  transition: background-color .3s ease-in-out;

  &:hover, &:focus {
    background-color: var(--color-primary-dark);
  }
`;

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({ onClick, children }) => (
  <StyledButton type="button" onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
export { ButtonProps };
