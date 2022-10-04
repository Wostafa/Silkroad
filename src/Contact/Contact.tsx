import React from 'react';
import styled from 'styled-components/macro';
import {WrapperCentered} from '../StyledElements';

function Contact(): JSX.Element {
  return(
    <WrapperCentered>
      <h4>Hours of Operation:</h4>
      <p>
        Sunday - Saturday 9:00am - 10:00pm (ET)<br/>
        Tel: 877-67-88-99<br/>
        Email: Silkroad@store.com
      </p>
    </WrapperCentered>
  )
}

export default Contact;