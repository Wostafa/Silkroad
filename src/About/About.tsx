import React from 'react';
import styled from 'styled-components';
import {WrapperCentered} from '../StyledElements';

function About(): JSX.Element {
  return(
    <WrapperCentered>
      <H1>About us</H1>
      <p>
        SilkRoad is a Swedish multinational conglomerate based in the Netherlands that
        designs and sells ready-to-assemble furniture, kitchen appliances,
        home accessories, and various other goods and home services. Started in 1943 by Ingvar Kamprad,
        SildRoad has been the world&#39 largest furniture retailer since 2008
      </p>
    </WrapperCentered>
  )
}

const H1 = styled.h1`
  color: var(--color-off-blue);
`

export default About;