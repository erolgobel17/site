import styled from 'styled-components';
import { Card, Image, Label } from 'semantic-ui-react';
import { CATEGORY_LABEL_COLORS, Site } from './WorkingSitesInfo';
import LocationAwareLink from './LocationAwareLink';
import { AnalyticsCategory, track } from './GoogleAnalytics';
import React from 'react';

const StyledImage = styled(Image)`
  img {
    height: 100% !important;
    width: auto !important;
  }
  
  display: flex !important;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
  
  height: 12rem;
  padding: 1rem !important;
`;

const StyledCardContentNoGrow = styled(Card.Content)`
  flex-grow: 0 !important;
`;

export default function SiteCard({ site: { name, url, logo, category, description, labels } }: { site: Site }) {
  return (
    <Card
      fluid link as={LocationAwareLink} to={{ pathname: `/browse/${encodeURIComponent(url)}` }}
      onClick={() => track(AnalyticsCategory.UI, 'CLICK_WORKING_SITE_CARD', name)}>
      <StyledImage src={logo} wrapped ui={false}/>
      <StyledCardContentNoGrow>
        <Card.Header>{name}</Card.Header>
      </StyledCardContentNoGrow>
      <StyledCardContentNoGrow>
        <Card.Meta>
          <Label size="small" key="category" color={CATEGORY_LABEL_COLORS[ category ]}>{category}</Label>
          {labels.map(({ text, color }, ix) => <Label size="small" key={ix} color={color}>{text}</Label>)}
        </Card.Meta>
      </StyledCardContentNoGrow>
      <Card.Content>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}