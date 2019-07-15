import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';
import { GlobalState } from '../reducers';
import AboutPage from './AboutPage';
import AuthenticateEndpointComponent from './AuthenticateEndpointComponent';
import BrowseIFrameComponent from './BrowseIFrameComponent';
import FooterButtons from './FooterButtons';
import HomePageComponent from './HomePageComponent';
import InvalidURLPage from './InvalidURLPage';
import SignedOutComponent from './SignedOutComponent';

const StyledMain = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledContent = styled.section`
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  position: relative;
`;

const StyledContentInner = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const StyledFooter = styled.footer`
  flex-shrink: 0;
`;

export const AppBackground = connect(
  ({ ui: { sidebarOpen } }: GlobalState) => ({ sidebarOpen }),
  null
)(({ sidebarOpen }) => (
  <Sidebar.Pusher dimmed={sidebarOpen}>
    <StyledMain>
      <StyledContent>
        <StyledContentInner>
          <Switch>
            <Route
              exact
              path="/browse/:pageUrl"
              component={BrowseIFrameComponent}
            />
            <Route
              exact
              path="/authenticate"
              component={AuthenticateEndpointComponent}
            />
            <Route exact path="/logout" component={SignedOutComponent}/>
            <Route exact path="/" component={HomePageComponent}/>
            <Route exact path="/about" component={AboutPage}/>
            <Route component={InvalidURLPage}/>
          </Switch>
        </StyledContentInner>
      </StyledContent>

      <StyledFooter>
        <FooterButtons/>
      </StyledFooter>
    </StyledMain>
  </Sidebar.Pusher>
));
