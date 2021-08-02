import styled from 'styled-components';

export const Wrapper = styled.aside`
    font-family: Arial, Helvetica, sans-serif;
    width: 500px;
    padding: 20px;

    .checkout {
        border-radius: 0 0 20px 20px;
        width: 100% !important;
    }

    .unavailable {
        opacity: 0.5;
        cursor: not-allowed
    }
`;