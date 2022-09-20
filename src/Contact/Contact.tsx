import React from 'react';
import styled from 'styled-components/macro';
import {WrapperCentered} from '../StyledElements';

function Contact(): JSX.Element {
  return(
    <WrapperCentered>
      <H1>Contact us</H1>
      <h4>Hours of Operation:</h4>
      <p>
        Sunday - Saturday 9:00am - 10:00pm (ET)<br/>
        Tel: 877-67-88-99<br/>
        Email: Silkroad@store.com
      </p>
    </WrapperCentered>
  )
}

const H1 = styled.h1`
  color: var(--color-off-blue);
`

export default Contact;