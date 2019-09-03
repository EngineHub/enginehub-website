import styled from '@emotion/styled';

export const Panel = styled.div`
    margin-bottom: 23px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(221, 221, 221);
    border-radius: 4px;

    table:last-child {
        margin-bottom: 0;
    }
`;

export const PanelHeading = styled.div`
    color: rgb(51, 51, 51);
    background-color: rgb(245, 245, 245);
    border-color: rgb(221, 221, 221);
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
`;

export const PanelBody = styled.div`
    padding: 15px;
`;