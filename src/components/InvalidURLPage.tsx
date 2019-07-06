import React from 'react';
import { Container, Message } from 'semantic-ui-react';
import UrlSearchInput from './UrlSearchInput';
import WorkingSiteCards from './WorkingSiteCards';

export default function InvalidURLPage() {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Message error>
        <Message.Header>Invalid URL</Message.Header>
        <Message.Content>The entered URL is not valid. Try one of the following links instead.</Message.Content>
      </Message>

      <UrlSearchInput/>

      <WorkingSiteCards/>
    </Container>
  );
}