import { ReactNode } from 'react'
import { styled } from 'styled-components'
import { DashboardSidebar } from './components/DashboardSidebar'
import { DashboardNavbar } from './components/DashboardNavbar'
import { devices } from '../../utils/mediaQueryBreakPoints'

interface DashboardProp{
    children: ReactNode
}

export const DashboardLayout = ({children}:DashboardProp) => {
  return (
    <Container>
      <DashboardSidebar />
      <Main>
        <DashboardNavbar />
        {children}
      </Main>
    </Container>
  )
}



//styles

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh !important;
  height: auto;
  background-color: var(--dashboardBackground);
`
const Main = styled.main`
  max-height: 100vh;
  overflow-y: hidden;
  width: 100%;
  padding-top: 1.5rem;
  padding-left: 4rem;
  padding-right: 2rem;
  padding-bottom: 1.5rem;

  @media ${devices.tabletL}{
    padding: 1rem;
    width: 85%;
    margin-left:3rem;
  }

`