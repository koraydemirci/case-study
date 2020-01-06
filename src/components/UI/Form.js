import styled from "styled-components";

export const Form = styled.form`
  width: ${props => props.width};
  border: ${props => props.border};
  padding: 2rem;
  background: ${props => props.theme.colors.formBackgroundColor};
  margin: ${props => props.margin};
`;

export const FormGroup = styled.div`
  margin-bottom: 1.6rem;
  width: ${props => props.width || "45%"};
`;

export const Label = styled.label`
  display: inline-block;
  font-size: 1.6rem;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.labelColor};
`;

export const Input = styled.input`
  type: ${props => props.type};
  placeholder: ${props => props.placeholder};
  font-size: 1.6rem;
  background: ${props => props.theme.colors.inputBackgroundColor};
  border: 1px solid #eeeeee;
  padding: 12px;
  width: 100%;
  name: ${props => props.name};
  color: ${props => props.theme.colors.inputColor};
`;

export const TextArea = styled.textarea`
  placeholder: ${props => props.placeholder};
  font-size: 1.6rem;
  background: ${props => props.theme.colors.inputBackgroundColor};
  border: 1px solid #eeeeee;
  padding: 12px;
  width: 100%;
  name: ${props => props.name};
  color: ${props => props.theme.colors.inputColor};
`;

export const Button = styled.button`
  type: ${props => props.type};
  font-size: ${props => props.fontSize};
  background: ${props =>
    props.background
      ? props.background
      : props.theme.colors.buttonBackgrounColor};
  border: ${props => (props.border ? props.border : "1px solid #ddd")};
  color: #ffffff;
  padding: ${props => props.padding || "7px"};
  width: ${props => props.width};
  border-radius: 5px;
  margin: ${props => props.margin};
  cursor: pointer;
  :focus {
    outline: 0;
  }
`;

export const IconButton = styled.button`
  margin: ${props => (props.margin ? props.margin : "0 0 0 auto")};
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: none;
  :focus {
    outline: 0;
  }
  cursor: pointer;
  background-color: ${props => props.theme.colors.iconButtonBackgroundColor};
`;
