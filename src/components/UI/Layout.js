import styled from "styled-components";

export const AppThemeContainer = styled.div`
  padding-bottom: 30px;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.appThemeContainerBackground};
`;

export const Container = styled.div`
  width: ${props => props.width};
  max-width: ${props => props.maxWidth};
  margin: 0 auto;
  background: ${props =>
    props.theme.isDarkMode
      ? props.theme.colors.containerBackground
      : props.backgroundColor};
`;

export const FlexContainer = styled.div`
  width: ${props => props.width};
  max-width: ${props => props.maxWidth};
  height: ${props => props.height};
  display: flex;
  justify-content: ${props => props.justifyContent}
  align-items: center;
  margin: ${props => props.margin};
  flex-wrap: ${props => props.flexWrap};
  background : ${props => props.background};
`;

export const List = styled.ul`
  display: ${props => (props.flex ? "flex" : "inline-block")}
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItemContainer = styled.li`
  font-weight: 600;
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
  color: ${props => props.theme.colors.listItemTextColor};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

export const Span = styled.span`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  padding: ${props => props.padding};
`;

export const Link = styled.a.attrs(props => ({
  href: props.href
}))`
  text-decoration: none;
  color: ${props => props.theme.colors.linkTextColor};
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
  color: ${props => (props.color ? props.color : props.theme.colors.iconColor)};
`;

export const Text = styled.p`
  font-size: ${props => props.fontSize};
  line-height: ${props => props.lineHeight};
  font-weight: ${props => props.fontWeight};
  color: ${props =>
    props.theme.isDarkMode ? props.theme.colors.textColor : props.color};
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
  background-color: ${props => props.theme.colors.modalBackgroundColor};
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

export const NavContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  background: ${props => props.theme.colors.navContainerBackgroundColor};
`;
