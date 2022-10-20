import React from 'react';
import styled from 'styled-components/macro';
import { Button } from '../StyledElements';
import {Link} from 'react-router-dom'
import {QUERIES} from '../Constants';
;
function Banner(): JSX.Element {
  return (
    <Wrapper>
      <LampWrapper>
        <ImageLamp />
      </LampWrapper>
      <TextWrapper>
        <Title>New Furniture Collection Trends in 2022</Title>
        <Description>
          Best Home Furnishings specializes in the manufacturing of upholstered products such as sofas, recliners,
          chairs. With over 1000 fabric and leather options
        </Description>
        <ButtonWrapper>
          <Link to="/shop">
            <Button>Shop Now</Button>
          </Link>
        </ButtonWrapper>
      </TextWrapper>
      <ProductWrapper>
        <CirclesWrapper>
          <Circle1 />
          <Circle2 />
        </CirclesWrapper>
        <ImageProductWrapper>
          <ImageProduct src="../assets/sofa.png" alt="sofa" />
        </ImageProductWrapper>
      <SaleTagWrapper>
        <SaleTag>50% off</SaleTag>
      </SaleTagWrapper>
      </ProductWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  --padding-top-bottom:16px;
  max-width: var(--max-width-full-wide);
  margin: 0 auto;
  margin-bottom: var(--margin-row);
  min-height: 450px;
  background-color: var(--color-fill-page);
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--padding-top-bottom) var(--gutter2x);
  gap: 16px;

  @media ${QUERIES.phoneAndSmaller}{
    flex-direction: column;
  }
`;
const LampWrapper = styled.div`
  height: 387px;
  align-self: flex-start;
  flex: 1;

  @media ${QUERIES.phoneAndSmaller}{
    flex: auto;
    width:100%;
  }
`;
const ImageLamp = styled.div`
  width: 100%;
  height: 100%;
  background-size:contain;
  background-repeat: no-repeat;
  background-position: top;
  margin-top: calc(var(--padding-top-bottom) * -1) ;
  background-image: url('../assets/lamp.png');
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;
const Title = styled.h1`
  font-weight: 700;
  margin: 0;
  max-width: 630px;

  @media ${QUERIES.laptopAndSmaller} {
    font-size: calc(30 / 16 * 1rem);
  }
`;
const Description = styled.p`
  font-family: var(--font-family-lato);
  color: var(--color-sub-text);
`;
const ProductWrapper = styled.div`
  flex: 2;
  position: relative;
  height:100%;
`;
const ImageProduct = styled.img`
  width: 100%;
  height:100%;
  object-fit:contain;
  display:block;
`;
const ImageProductWrapper = styled.div`
  position: relative;
  height:100%;
`;
const CirclesWrapper = styled.div`
  position: absolute;
  left: var(--padding-top-bottom);
  top: var(--padding-top-bottom);
  bottom: var(--padding-top-bottom);
  right: var(--padding-top-bottom);

  @media ${QUERIES.tabletAndSmaller}{
    display:none;
  }
`;
/* padding top is the same as width in order to have
 a responsive circle with the same width and height */
const Circle = styled.div`
  position: absolute;
  width: calc(90% - var(--padding-top-bottom));
  padding-top: calc(90% - var(--padding-top-bottom));
  border-radius: 50%;
  background-color: var(--color-pink-circle);
`;
const Circle1 = styled(Circle)`
  top: 0;
  right: 0;
`;
const Circle2 = styled(Circle)`
  bottom: 0;
  left: 0;
`;

const ButtonWrapper = styled.div`
  margin-top: 50px;
`;

const SaleTagWrapper = styled.div`
  --rotate: 30deg;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background-color: var(--color-tag-blue);
  transform: rotate(var(--rotate));

  border-radius: 30% 70% 62% 38% / 40% 55% 45% 60%;
`;
const SaleTag = styled.span`
  transform: rotate(calc(var(--rotate) * -1));
  line-height: 1.7rem;
  color: white;
  font-size: 1.2rem;
  width: min-content;
  font-weight: 700;
`;

export default Banner;
