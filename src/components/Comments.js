import React from "react";
import styled from "styled-components";
import {
  scale,
  DottedContainer,
  Column,
  Row,
  SpaceBetween as DefaultSpaceBetween,
  SubTitle,
  SubSubTitle,
  Body,
  Input,
  Button,
  Form,
  FullWidth,
} from "./general";
import { texts } from "../config";
import { addComment } from "../util/firebase";

const SpaceBetween = styled(DefaultSpaceBetween)`
  margin-bottom: ${scale(-4)};
  width: 100%;
`;

const NoMarginSpaceBetween = styled(SpaceBetween)`
  margin-bottom: 0;
`;

const MarginButton = styled(Button)`
  margin: ${scale(1)};
  margin-right: 0;
`;

const Comment = ({ comment }) => (
  <DottedContainer>
    <Column>
      <SpaceBetween>
        <SubSubTitle>{comment.by}</SubSubTitle>
        <Body>{new Date(comment.created).toLocaleString()}</Body>
      </SpaceBetween>
      <Body>{comment.comment}</Body>
    </Column>
  </DottedContainer>
);

const AddComment = ({ onSubmit, value, onChange }) => (
  <Form onSubmit={onSubmit}>
    <Input onChange={onChange} value={value} id="new-comment" />
    <Button type="submit">Send</Button>
  </Form>
);

const SignIn = ({ signIn }) => (
  <FullWidth>
    <NoMarginSpaceBetween>
      <Body>{texts.blogPost.signInDescription}</Body>
      <Button onClick={() => signIn("google")}>{texts.blogPost.signIn}</Button>
    </NoMarginSpaceBetween>
  </FullWidth>
);

const TitleContainer = styled(DottedContainer)`
  margin-top: ${scale(10)};
  border-top: 2px solid ${(props) => props.theme.primary};
`;

const Title = ({ signOut, user }) => (
  <TitleContainer>
    <NoMarginSpaceBetween>
      <SubTitle>{texts.blogPost.commentsTitle}</SubTitle>
      {user ? (
        <Row>
          <Body>
            {texts.blogPost.signedInAs} {user}
          </Body>
          <MarginButton onClick={signOut}>
            {texts.blogPost.signOut}
          </MarginButton>
        </Row>
      ) : (
        <div />
      )}
    </NoMarginSpaceBetween>
  </TitleContainer>
);

const NoComments = () => (
  <DottedContainer>
    <SubSubTitle>{texts.blogPost.noComments}</SubSubTitle>
  </DottedContainer>
);

const Comments = ({ comments, postId, getComments, user, signIn, signOut }) => {
  const [newComment, setNewComment] = React.useState("");

  const onChange = React.useCallback((event) => {
    setNewComment(event.target.value);
  }, []);

  const onSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      await addComment(postId, user, newComment);
      setNewComment("");
      getComments();
    },
    [newComment]
  );

  return (
    <>
      <Title user={user} signOut={signOut} />
      {user ? (
        <AddComment
          onSubmit={onSubmit}
          value={newComment}
          onChange={onChange}
        />
      ) : (
        <SignIn signIn={signIn} />
      )}
      {comments?.length > 0 ? (
        comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))
      ) : (
        <NoComments />
      )}
    </>
  );
};

export default Comments;
