import React from 'react';
import styled from 'styled-components/macro';
import { CheckSquare, AlertCircle } from 'react-feather';

export default function Result({ successful }: { successful: boolean }): JSX.Element {
  let icon = <CheckSquare size={48} color='#05bf3d' />;
  let title = 'Your Order Is Completed!';
  let description = 'Thank you for your order! Your order is being processed and will be completed within 3-6 hours.';

  if (!successful) {
    icon = <AlertCircle size={48} color='#fb2347' />;
    title = 'Your Order Has Been Canceled!';
    description = 'Something went wrong with your order. Contact support if you have any problem.';
  }

  return (
    <Wrapper>
      {icon}
      <Title>{title}</Title>
      <P>{description}</P>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 600px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: var(--box-text-padding);
  margin: auto;
  border: 1px dashed;
  border-radius: var(--box-radius);
  border-color: var(--color-border-gray-darker);
`;

const Title = styled.h3`
  color: var(--color-off-blue);
  margin: 0;
`;
const P = styled.p`
  text-align: center;
`;
