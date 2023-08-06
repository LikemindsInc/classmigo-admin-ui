import React from 'react'
import { styled } from 'styled-components';
import { Tooltip } from 'antd';

export const ToolTipElement = ({ children }) => {
    const Details = () => (
        <Container>
            <h6>Subscription Details</h6>
            <h6>SS1 <span>3 Months</span></h6>
            <p>Subscription Started: 01/08/2023</p>
            <p>Subscription End: 32/10/2023</p>
        </Container>
    );

    return (
        <ToolContainer>
            <Tooltip
                placement="bottom"
                title={<Details/>}
                autoAdjustOverflow={true}
                destroyTooltipOnHide={true}
                overlayStyle={{
                    backgroundColor: 'transparent',
                    background: '#7B31B2',

                    borderRadius: '14px',
                    padding: 0, 
                    color: 'white',
                    borderColor: "#7B31B2",
                    outline:"none"
                }}
            >
                <DataInfo>{children}</DataInfo>
            </Tooltip>
        </ToolContainer>

    );
};

const Container = styled.div`
    background-color: var(--primary-color);
    padding: 1rem;

    h6{
        font-size: 0.9rem;
        color: white;
        font-weight: 700;
        margin-bottom: 2px;
    }

    p,span{
        color: white;
        font-weight: 600;
        font-size: 0.8rem;
    }
`
const DataInfo = styled.p`
    cursor: pointer;
`
const ToolContainer = styled.div`
  .ant-tooltip-inner {
    background-color: transparent !important;
    border-color: #7B31B2 !important;
    padding: 0 !important;
    color: white;
  }

  .ant-tooltip-arrow {
    border-top-color: #7B31B2 !important;
  }
`;