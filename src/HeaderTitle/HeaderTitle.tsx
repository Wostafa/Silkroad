import React from 'react';
import styled from 'styled-components/macro';
import {WrapperCentered} from '../StyledElements';

function HeaderTitle({title}: {title: string}): JSX.Element {
  return(
    <Wrapper>
      <WrapperTitle>
        <Title>{title}</Title>
      </WrapperTitle>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--color-title-header-background);
  max-width: var(--max-width-full-wide);
  margin: 0 auto;
  margin-bottom: var(--margin-row);
  height: 200px;
  width: 100%;
`
const WrapperTitle = styled(WrapperCentered)`
  display:flex;
  justify-content: flex-start;
  align-items:center;
  height:100%;
`
const Title = styled.h2`
  color: var(--color-title-header-foreground);
`
export default HeaderTitle;