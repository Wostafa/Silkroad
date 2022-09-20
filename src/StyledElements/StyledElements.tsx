import styled from "styled-components/macro";

export const WrapperCentered = styled.div`
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  max-width: var(--max-width);
  margin: auto;
  width: 100%;
`
export const UnstyledButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
`
export const VisuallyHidden = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`
export const Button = styled.button`
  background-color: var(--color-pink);
  padding: 10px 10px;
  border:none;
  color:white;
  border-radius: var(--button-radius);
  cursor: pointer;
  font-weight: 700;
  font-size: 1.05rem;
  font-family: inherit;

  &:hover {
    opacity: 0.8;
  }
`
export const InputButton = styled.input`
  background-color: var(--color-pink);
  padding: 10px 40px;
  border:none;
  color:white;
  border-radius: var(--button-radius);
  cursor: pointer;
  font-weight: 700;
  font-size: 1.05rem;
  font-family: inherit;

  &:hover {
    opacity: 0.8;
  }
`
export const LinkButton = styled.a`
  background-color: var(--color-pink);
  padding: 15px 20px;
  text-decoration:none;
  color:white;
  border-radius: var(--button-radius);
  cursor: pointer;
  font-weight: 700;
  font-size: 1.05rem;
  font-family: inherit;

  &:hover {
    opacity: 0.8;
  }
`


export const Spacer = styled.div`
  height:${(props: {size: number}) => props.size}px;
  min-height:${(props: {size: number}) => props.size}px;
  width: 100%;
  min-width:100%;
`

