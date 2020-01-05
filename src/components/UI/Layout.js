import styled from "styled-components";

export const Container = styled.div`
  width: 960px;
  max-width: 960px;
  margin: 0 auto;
`;

export const FlexContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(93, 119, 144, 1) 0%,
    rgba(8, 138, 238, 1) 100%,
    rgba(0, 212, 255, 1) 100%
  );
`;

export const FlexContainer1 = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: center;
  flex-wrap: wrap;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItemContainer = styled.li`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.9);
  font-size: 1.4rem;
  line-height: 1.42857;
  margin-left: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ListItem = styled.li`
  font-size: ${props => props.fontSize};
  line-height: ${props => props.lineHeight};
  color: ${props => props.color};
  margin-top: ${props => props.marginTop};
`;

export const Span = styled.span``;

export const Link = styled.a.attrs(props => ({
  href: props.href
}))`
  text-decoration: none;
  color: ${props => props.color};
  margin-left: ${props => props.marginLeft};
  margin: ${props => props.margin};
`;

export const Image = styled.img.attrs(props => ({
  src: props.src
}))`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props => props.borderRadius};
  margin: ${props => props.margin};
`;

export const Icon = styled.i`
  color: ${props => props.color};
`;

export const Text = styled.p`
  font-size: ${props => props.fontSize};
  line-height: ${props => props.lineHeight};
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding};
  text-align: ${props => props.textAlign};
`;

export const Modal = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 50%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 25%;
  top: 10%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
`;

export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
