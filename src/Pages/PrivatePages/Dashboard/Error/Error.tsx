import React from 'react'
import styled from 'styled-components'
import { Disconnected } from '../../../../Assets/Svgs'
import { ButtonElement } from '../../../../Ui_elements'
import error from "../../../../Assets/Error_404.png"

const Error = () => {
  return (
      <Container>
          <div>
              <img src={error} alt='error' />
              <h3>Oops! Something went wrong</h3>
              <p>Ypu have either clicked a bad link or the URL you entered is incorrect.</p>
              <ButtonElement label="Go Home"/>
          </div>
      </Container>
  )
}

export default Error

const Container = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items:center;
    justify-content: center;
    text-align:center;
    button{
        width:200px;
        margin:0 auto;

    }

    h3{
        font-size:2rem;
    }
    h3,p{
        margin-bottom: 1rem;
        text-align:center;
    }
`