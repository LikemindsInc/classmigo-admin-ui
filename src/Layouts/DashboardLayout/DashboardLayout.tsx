import React, { ReactNode } from 'react'
import { styled } from 'styled-components'

interface DashboardProp{
    children: ReactNode
}

export const DashboardLayout = ({children}:DashboardProp) => {
  return (
      <Container>
          
    </Container>
  )
}



//styles

const Container = styled.main`
  background-color: var(--dashboardBackground);
`
