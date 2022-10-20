import React from 'react';
import { UnstyledButton, VisuallyHidden } from '../StyledElements';
import { X } from 'react-feather';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled, {keyframes} from 'styled-components/macro';
import { Link } from 'react-router-dom';

interface PropsType {
  isOpen: boolean | undefined;
  // onDismiss: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>)=> void;
  onDismiss: () => void;
}

export default function MobileMenu({ isOpen, onDismiss }: PropsType): JSX.Element {
  return (
    <Overlay onDismiss={onDismiss} isOpen={isOpen}>
      <Content>
        <Button onClick={onDismiss}>
          <X size={36} color='black' />
          <VisuallyHidden>Close Menu</VisuallyHidden>
        </Button>
        <WrapperNav>
          <Item>
            <Link to='/' onClick={onDismiss}>Home</Link>
          </Item>
          <Item>
            <Link to='/shop' onClick={onDismiss}>Shop</Link>
          </Item>
          <Item>
            <Link to='/about' onClick={onDismiss}>About</Link>
          </Item>
          <Item>
            <Link to='/contact' onClick={onDismiss}>Contact</Link>
          </Item>
        </WrapperNav>
      </Content>
    </Overlay>
  );
}

const OverlayAnimation =keyframes`
  from{
    opacity: 0
  },
  to {
    opacity: 1
  }
`
const MenuAnimation =keyframes`
  from{
    transform: translateX(100%)
  },
  to {
    transform: translateX(0);
  }
`

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  right: 0;
  left:0;
  bottom:0;
  background: var(--color-backdrop);
  display: flex;
  justify-content:end;
  animation: ${OverlayAnimation} 200ms;
`;
const Content = styled(DialogContent)`
  background: white;
  height: 100%;
  width: 300px;
  display:flex;
  justify-content: left;
  align-items: center;
  position: relative;
  animation: ${MenuAnimation} 300ms;
  
`;
const WrapperNav = styled.ul`
  margin-left: 32px;
`;
const Item = styled.li`
  font-size: 1.7rem;
  font-weight: 600;
  margin: 16px;

  a:hover {
    color: var(--color-pink-hover);
  }
  
`
// const Wrapper = styled(DialogOverlay)`
// `

const Button = styled(UnstyledButton)`
  width: fit-content;
  position: absolute;
  top: 16px;
  right:16px;

  &:hover {
    opacity: 0.7;
  }
`;
