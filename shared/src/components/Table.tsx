import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    max-width: 100%;
    margin-bottom: 23px;
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(221, 221, 221);
    color: rgb(51, 51, 51);
    word-break: break-word;

    tbody {
        tr {
            th,
            td {
                line-height: 1.7;
                vertical-align: top;
                padding: 8px;
            }
        }

        tr:nth-of-type(2n + 1) {
            th,
            td {
                background-color: rgb(249, 249, 249);
            }
        }

        tr.danger {
            th,
            td {
                background-color: #f2dede;
            }
        }
    }
`;

export const BorderedTable = styled(Table)`
    tbody {
        tr {
            th,
            td {
                border-width: 1px;
                border-style: solid;
                border-color: rgb(221, 221, 221);
            }
        }
    }
`;
