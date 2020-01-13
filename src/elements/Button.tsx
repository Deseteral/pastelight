import styled from 'styled-components';

interface ButtonProps {
  primary?: boolean;
  onClick: () => void;
}
const Button = styled.button.attrs((props: ButtonProps) => ({
  type: 'button',
  onClick: props.onClick,
}))<ButtonProps>`
  font-size: 16px;
  ${(props) => props.primary && 'text-transform: uppercase;'}
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;

  padding: 10px;

  color: ${(props) => (props.primary ? 'var(--color-text-primary)' : 'var(--color-primary)')};
  background-color: ${(props) => (props.primary ? 'var(--color-primary)' : 'var(--color-background)')};

  border: 2px solid var(--color-primary);
  border-radius: 12px;

  box-shadow: none;
  outline: none;
  cursor: pointer;
  transition: all .3s ease-in-out;

  &:hover, &:focus {
    color: var(--color-text-primary);
    border-color: var(--color-primary-dark);
    background-color: var(--color-primary-dark);
    box-shadow: 0 5px 15px rgba(0,0,0,.05), 0 4px 10px var(--color-primary-dark);
  }
`;

export default Button;
export { ButtonProps };
