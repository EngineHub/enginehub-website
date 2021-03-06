import styled from 'styled-components';

export const HorizontalNav = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    overflow-x: auto;
    margin-bottom: 1rem;

    .hideSmall {
        display: none;
    }

    @media (min-width: 768px) {
        .hideSmall {
            display: unset;
        }
    }
`;

export const HorizontalNavItem = styled.li`
    margin: 0 0.5rem;
    text-align: center;
`;
