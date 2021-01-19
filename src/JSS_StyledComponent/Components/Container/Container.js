import styled from 'styled-components'; 

export const Container = styled.div`
width: 100%;
padding-right: 15px;
padding-left: 15px;
padding-top: 15px;
padding-bottom: 15px;
margin-right: auto;
margin-left: auto;
margin-top: 20px; 
margin-bottom: 20px; 
border: 3px solid ${props => props.theme.borderColor}; 
color: ${props => props.theme.color}; 
background-color: ${props => props.theme.bgColor}; 
`