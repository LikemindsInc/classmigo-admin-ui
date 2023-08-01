import styled from 'styled-components'

export const ToMessage = ({children}:any) => {
    return (
        <Container>
          <MessageBox>
            <p>{children}</p>
          </MessageBox>
        </Container>
      );
    };
    
    const Container = styled.div`
      width: 100%;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 1rem;
    `;
    
    const MessageBox = styled.div`
      padding: 2%;
      max-width: 20rem;
      background-color: var(--dashboardBackground);
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      border-top-left-radius: 12px;
      
      p {
        font-size: 0.9rem;
        font-weight: 500;
      }
    
    `;
    