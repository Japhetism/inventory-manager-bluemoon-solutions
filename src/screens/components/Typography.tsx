import styled from 'styled-components/native';

interface TypographyProps {
  fontWeight: string;
  fontSize: number;
  fontStyle: string;
  lineHeight: number;
  color: string;
}

const Typography = styled.Text<TypographyProps>`
  ${(props) => `
    color: ${props.color};
    font-weight: ${props.fontWeight};
    font-size: ${props.fontSize};
    font-style: ${props.fontStyle};
    line-height: ${props.lineHeight}px;
  `}
`;

export default Typography;
