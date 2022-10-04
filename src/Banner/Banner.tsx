import React from 'react';
import styled from 'styled-components/macro';
import { Button } from '../StyledElements';
import {Link} from 'react-router-dom'
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
          <Link to="/product/54">
            <Button>Shop Now</Button>
          </Link>
        </ButtonWrapper>
      </TextWrapper>
      <ProductWrapper>
        <Background>
          <Circle1 />
          <Circle2 />
        </Background>
        <ImageProductWrapper>
          <ImageProduct src="./template/sofa.png" alt="sofa" />
        </ImageProductWrapper>
      </ProductWrapper>
      <SaleTagWrapper>
        <SaleTag>50% off</SaleTag>
      </SaleTagWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  max-width: var(--max-width-full-wide);
  margin: 0 auto;
  margin-bottom: var(--margin-row);
  height: 450px;
  background-color: var(--color-fill-page);
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 var(--gutter2x);
  gap: 8px;
`;
const LampWrapper = styled.div`
  height: 387px;
  align-self: flex-start;
  flex: 1;
`;
const ImageLamp = styled.div`
  width: 200px;
  height: 100%;
  background-position: center;

  background-image: url('./template/lamp.png');
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
`;
const Description = styled.p`
  font-family: var(--font-family-lato);
  color: var(--color-sub-text);
`;
const ProductWrapper = styled.div`
  flex: 2;
  position: relative;
`;
const ImageProduct = styled.img`
  width: 100%;
  display:block;
`;
const ImageProductWrapper = styled.div`
  width: 400px;
  height:400px;
  position: relative;
`;
const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
  height: 400px;
`;
const Circle = styled.div`
  position: absolute;
  width: 90%;
  height: 90%;
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
  left: 80%;
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
