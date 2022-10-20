import React from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered } from '../StyledElements';
import { WebsiteTitle, QUERIES } from '../Constants';

function Features(): JSX.Element {
  const detail = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.';
  const title = '24/7 Support';
  return (
    <WrapperCentered>
      <Wrapper>
        <h1>What {WebsiteTitle} Offer!</h1>
        <WrapperCards>
          <Card>
            <Icon theme={{ url: '../assets/free-delivery.png' }}></Icon>
            <Text>
              <h3>{title}</h3>
              <p>{detail}</p>
            </Text>
          </Card>
          <Card>
            <Icon theme={{ url: '../assets/cashback.png' }}></Icon>
            <Text>
              <h3>{title}</h3>
              <p>{detail}</p>
            </Text>
          </Card>
          <Card>
            <Icon theme={{ url: '../assets/group.png' }}></Icon>
            <Text>
              <h3>{title}</h3>
              <p>{detail}</p>
            </Text>
          </Card>
          <Card>
            <Icon theme={{ url: '../assets/24-hours-support.png' }}></Icon>
            <Text>
              <h3>{title}</h3>
              <p>{detail}</p>
            </Text>
          </Card>
        </WrapperCards>
      </Wrapper>
    </WrapperCentered>
  );
}

const Wrapper = styled.div`
  h1 {
    color: var(--color-off-blue);
    font-weight: 700;
    text-align: center;
  }
`;

const WrapperCards = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;

  @media ${QUERIES.tabletAndSmaller} {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  min-height: 300px;
  width: 260px;
  border-radius: var(--box-radius);
  padding: 10px;
  border: 1px solid var(--color-border-gray);
`;
const Icon = styled.div`
  height: 65px;
  width: 65px;
  background-repeat: no-repeat;
  background-image: url(${props => props.theme.url});
`;
const Text = styled.div`
  text-align: center;
  h3 {
    color: var(--color-off-blue);
    font-style: italic;
  }
  p {
    color: var(--color-sub-text-darker);
  }
`;

export default Features;
