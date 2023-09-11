import React from 'react'
import styled from 'styled-components'

export const Tag = ({children}:any) => {
  return (
      <Container>
          {children}
      </Container>
  )
}

const Container = styled.div`
    text-align: center;
    padding: 5px 8px;
    font-size: 0.7vw;
    font-weight: 600;
    width: fit-content;
    border-radius: 12px;
    background-color: var(--hover-color);
`