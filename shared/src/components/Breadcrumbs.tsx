import styled from 'styled-components';

export const Breadcrumb = styled.li`
    display: inline-block;
`;

export const ActiveBreadcrumb = styled(Breadcrumb)`
    color: rgb(119, 119, 119);
`;

export const BreadcrumbWrapper = styled.ol`
    margin-bottom: 23px;
    margin-left: 0;
    background-color: rgb(245, 245, 245);
    padding: 8px 15px;
    list-style: none;
    border-radius: 4px;

    li + li::before {
        content: '/ ';
        color: rgb(204, 204, 204);
        padding: 0px 5px;
    }
`;
