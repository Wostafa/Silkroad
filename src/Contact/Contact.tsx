import React from 'react';
import {WrapperCentered, Spacer} from '../StyledElements';

function Contact(): JSX.Element {
  return(
    <WrapperCentered>
      <h4>Hours of Operation:</h4>
      <p>
        Sunday - Saturday 9:00am - 10:00pm (ET)<br/>
        Tel: 877-67-88-99<br/>
        Email: Silkroad@store.com
      </p>
      <Spacer size={32} />
    </WrapperCentered>
  )
}

export default Contact;