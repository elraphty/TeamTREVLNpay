import styled from "styled-components";

export const Button = styled.button`
    color: ${(props) => props.color || props.theme.colors.white};
    background-color: ${(props) => props.bg || props.theme.colors.blue700};
    font-size: ${(props) => props.fontSize || ".85rem"};
    font-weight: ${(props) => props.fontWeight || "500"};
    border: ${(props) => props.border || props.theme.border.style};
    border-radius: ${(props) => props.theme.border.radius};
    padding: ${(props) => props.padding || "0.5rem 1rem"};
    width: ${(props) => props.width};
    cursor: pointer;

    @media (min-width: 600px) {
        font-size: ${(props) => props.fontSize || "1rem"};
    }
`