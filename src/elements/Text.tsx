import styled from 'styled-components';

interface TextProps {
  heading?: boolean;
  secondary?: boolean;
}

const Text = styled.div<TextProps>`
  color: var(--color-text);
  font-size: ${(props) => {
    if (props.heading) return '48px';
    if (props.secondary) return '15px';
    return '16px';
  }};
  opacity: ${(props) => (props.secondary ? '0.56' : '0.87')};
  transition: color .3s ease-in-out;
`;

export default Text;
export { TextProps };
