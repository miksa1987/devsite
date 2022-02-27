import React from "react";
import styled, {
  ThemeProvider,
  css,
  createGlobalStyle,
} from "styled-components";
import { Link as UnstyledLink } from "gatsby";
import theme from "../theme";
import Navigation from './Navigation'
import Seo from "./Seo";

const GRID_SIZE = 8;
export const MOBILE_BREAKPOINT = "480px";

export const scale = (factor) => `${factor * GRID_SIZE}px`;

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    width: calc(100vw-12px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  a {
    color: ${theme.link};
  }
`;

export const Main = styled.main`
  font-size: ${scale(2.5)};
  font-family: -apple-system, Roboto, sans-serif, serif;
  padding-top: ${scale(12)};
  padding-bottom: ${scale(12)};
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding-top: 0;
  }
`;

export const Image = styled.img`
  max-width: ${scale(100)};
  max-height: auto;
  width: ${(props) => props.width ?? "auto"};
  height: ${(props) => props.height ?? "auto"};
  margin-top: ${(props) => props.marginTop ?? scale(1)};
`;

export const FullWidth = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const CodeFullWidth = styled(FullWidth)`
  background: ${props => props.theme.codeBackground};
  color: ${props => props.theme.codeText};
  padding: ${scale(1)};
`;

export const AvatarImage = ({ src, alt, marginTop }) => (
  <Image
    src={src}
    alt={alt}
    width={scale(15)}
    marginTop={marginTop ?? scale(5)}
  />
);

export const List = styled.ul`
  margin: ${scale(-1.5)};
  list-style-type: none;
  margin: none;
`;

export const ListItem = styled.li`
  margin: ${scale(-2)};
  margin-left: ${scale(-12)};
  font-weight: bold;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CenteredColumn = styled(Column)`
  align-items: center;
`;

const MaxWidthColumn = styled(CenteredColumn)`
  width: 100%;
  max-width: ${scale(100)};
`;

export const Page = ({ children }) => (
  <>
    <Seo />
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <Navigation />
        <CenteredColumn>
          <MaxWidthColumn>{children}</MaxWidthColumn>
        </CenteredColumn>
      </Main>
    </ThemeProvider>
  </>
);

export const ResponsiveGrid = styled.div`
  max-width: ${scale(100)};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${scale(5)};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
  }
`;

export const ResponsiveRow = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Link = styled(UnstyledLink)`
  background: ${(props) => props.theme.link};
  width: ${scale(15)};
  color: ${props => props.theme.background};
  padding: ${scale(2)} ${scale(4)};
  margin: ${scale(2)};
  max-height: ${scale(3)};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  border-radius: ${scale(1)};

  &:hover {
    text-decoration: underline;
  }
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: calc(100% - ${scale(10)});
    margin: ${scale(1)};
  }
`;

export const TextLink = styled(UnstyledLink)`
  color: ${(props) => props.theme.link};
`;

const textStyle = css`
  margin: ${scale(1)};
  color: ${(props) => props.theme.text};
`;

export const Title = styled.h1`
  ${(props) => props.compact && textStyle}
`;
export const SubTitle = styled.h3.attrs({ as: "h2" })`
  ${(props) => props.compact && textStyle}
`;
export const SubSubTitle = styled.h5.attrs({ as: "h3" })`
  ${(props) => props.compact && textStyle}
`;
export const Body = styled.p`
  ${(props) => props.compact && textStyle}
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  font-style: ${(props) => (props.italic ? "italic" : "normal")};
  text-decoration: ${(props) => (props.underline ? "underline" : "none")};
`;
export const Code = styled.code`
  margin: ${scale(-0.5)} 0;
`;

export const DottedContainer = styled.div`
  width: 100%;
  border-top: 1px dotted black;

  &:last-child {
    border-bottom: 1px dotted black;
  }
`;

export const TitleLink = styled(Link)`
  max-height: ${scale(5)};
  margin: ${scale(2)} ${scale(1)};
  padding: ${scale(0.5)} ${scale(3)};
`;

export const SpaceBetween = styled(Row)`
  justify-content: space-between;
  align-items: center;

  ${TitleLink} {
    word-wrap: break-word;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  padding: ${scale(1)};
  margin-right: ${scale(1)};
  border: 1px solid ${(props) => props.theme.primary};
`;

export const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template: ${scale(5)} / 1fr ${scale(15)};
  margin-bottom: ${scale(3)};
`;

export const Button = styled.button`
  padding: ${scale(1)} ${scale(3)};
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 0;
  font-size: 90%;
`;
