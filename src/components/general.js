import React from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { Link as UnstyledLink } from "gatsby";
import theme from "../theme";

const GRID_SIZE = 8;
export const MOBILE_BREAKPOINT = "480px";

export const scale = (factor) => `${factor * GRID_SIZE}px`;

export const Main = styled.main`
  font-size: ${scale(2.5)};
  font-family: -apple-system, Roboto, sans-serif, serif;
  padding-top: ${scale(12)};
  padding-bottom: ${scale(12)};
  min-width: calc(100vw - 12px);
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
  <ThemeProvider theme={theme}>
    <Main>
      <CenteredColumn>
        <MaxWidthColumn>{children}</MaxWidthColumn>
      </CenteredColumn>
    </Main>
  </ThemeProvider>
);

export const ResponsiveGrid = styled.div`
  max-width: ${scale(100)};
  width: 100%;
  display: grid;
  grid-template: ${scale(5)} / 33% 33% 33%;
  margin-bottom: ${scale(5)};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
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
  background: ${(props) => props.theme.light.primary};
  padding: ${scale(3)};
  margin: ${scale(2)};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.light.textSecondary};
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: calc(100% - ${scale(10)});
    margin: ${scale(1)};
  }
`;

const textStyle = css`
  margin: ${scale(1)};
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
export const Code = styled.code``;
