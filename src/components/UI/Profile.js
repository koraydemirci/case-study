import styled from "styled-components";

export const Card = styled.section`
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
  margin: 16px 0;
  padding: 0 0 24px;
  position: relative;
`;

export const BackgroundImageContainer = styled.div`
  height: 200px;
`;

export const BackgroundImage = styled.img.attrs(props => ({
  src: props.src
}))`
  height: 100%;
  width: 100%;
`;

export const Intro = styled.div`
  display: flex;
  margin-top: 60px;
  justify-content: space-between;
  padding: 0 20px;
`;

export const ProfileImageContainer = styled.div`
  position: absolute;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  overflow: hidden;
  top: 30%;
  left: 30px;
`;

export const ProfileImage = styled.img.attrs(props => ({
  src: props.src
}))`
  height: 100%;
  width: 100%;
`;

export const CardSection = styled.section`
  border-bottom: ${props => props.borderBottom};
  margin: 0;
  padding: ${props => props.padding};
  &:last-child {
    border-bottom: none;
  }
`;

export const CardHeader = styled.header`
  padding: ${props => props.padding};
  display: flex;
  margin: ${props => props.margin};
  align-items: center;
`;

export const CardHeaderText = styled.h2`
  font-size: 2rem;
  line-height: 1.4;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);
  flex: 1;
  margin: 0;
  padding: 0;
`;

export const CardList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: ${props => props.maxWidth};
  width: ${props => props.width};
`;

export const FlexCardList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  flex-flow: row wrap;
`;

export const CardListItem = styled.li`
  width: ${props => props.width};
  display: flex;
  padding: 20px 24px 0 24px;
  margin: 0;
  justify-content: space-between;
  border-bottom: ${props => (props.noBorder ? "none" : "1px solid #e6e9ec")};
  flex-direction: ${props => (props.column ? "column" : "row")}
  &:last-child {
    border-bottom: none;
  }
`;

export const CardListItemContent = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
`;

export const TextContainer = styled.div`
  margin-left: 24px;
`;
