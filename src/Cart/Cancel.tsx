import React from 'react';
import { WrapperCentered, Spacer } from '../StyledElements';
import Result from './Result';

export default function Success(): JSX.Element {
  return (
    <WrapperCentered>
      <Spacer size={32} />
      <Result successful={false} />
      <Spacer size={32} />
    </WrapperCentered>
  );
}
