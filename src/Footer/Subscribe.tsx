import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Button, Notify } from '../StyledElements';
import { db } from '../Firebase/Database';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { QUERIES } from '../Constants';


export default function Subscribe(): JSX.Element {
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState<boolean>();
  // ----------------
  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    const _email = e.target.value;
    setEmail(_email);

    const emailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (_email.match(emailFormat) === null) setIsDisabled(true);
    else setIsDisabled(false);
  };
  // -----------------
  const onSubscribeClick = (): void => {
    if (email === '') return;
    const subscribe = async (): Promise<void> => {
      const docRef = doc(db, 'subscribers', 'emails');
      await updateDoc(docRef, { list: arrayUnion(email) });
    };
    subscribe()
      .then(() => {
        Notify.Show.success('Your email added!');
      })
      .catch(e => {
        console.log('Failed to add email: ', e);
      });
  };

  return (
    <SignUpWrapper>
      <SignUpInput
        type={'email'}
        placeholder={'Enter Email Address'}
        value={email}
        onChange={onEmailChange}
      ></SignUpInput>
      <Button onClick={onSubscribeClick} disabled={isDisabled ?? false}>
        Subscribe
      </Button>
      <Notify.Layout />
    </SignUpWrapper>
  );
}

const SignUpWrapper = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  @media ${QUERIES.phoneAndSmaller} {
    justify-content: center;
  }
`;

const SignUpInput = styled.input`
  border: 2px solid var(--color-soft-gray);
  font-size: 1rem;
  padding: 0 8px;
  color: var(--color-sub-text);
  flex: 1;
  max-width: 250px;
  min-width: 200px;
  height: 46px;
`;
