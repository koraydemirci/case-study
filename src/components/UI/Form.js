import styled from "styled-components";

export const Form = styled.form`
  width: ${props => props.width};
  border: ${props => props.border};
  padding: 2rem;
  background: #ffffff;
  margin-right: 50px;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.6rem;
  width: ${props => props.width || "45%"};
`;

export const Label = styled.label`
  display: inline-block;
  font-size: 1.6rem;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  type: ${props => props.type};
  placeholder: ${props => props.placeholder};
  font-size: 1.6rem;
  background: #fafafa;
  border: 1px solid #eeeeee;
  padding: 12px;
  width: 100%;
  name: ${props => props.name};
`;

export const Button = styled.button`
  type: ${props => props.type};
  font-size: ${props => props.fontSize};
  background: ${props => props.background};
  border: 1px solid #ddd;
  color: #ffffff;
  padding: ${props => props.padding || "7px"};
  width: ${props => props.width};
  text-transform: uppercase;
  border-radius: 5px;
  margin: ${props => props.margin};
  :focus {
    outline: 0;
  }
`;

export const IconButton = styled.button`
  margin: 10px 0 0 auto;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: none;
  :focus {
    outline: 0;
  }
  cursor: pointer;
`;
