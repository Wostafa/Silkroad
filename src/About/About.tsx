import React from 'react';
import {WrapperCentered, Spacer} from '../StyledElements';

function About(): JSX.Element {
  return(
    <WrapperCentered>
      <p>
        SilkRoad is a Swedish multinational conglomerate based in the Netherlands that
        designs and sells ready-to-assemble furniture, kitchen appliances,
        home accessories, and various other goods and home services. Started in 1943 by Ingvar Kamprad,
        SildRoad has been the world&#39 largest furniture retailer since 2008
      </p>
      <Spacer size={32} />
    </WrapperCentered>
  )
}


export default About;