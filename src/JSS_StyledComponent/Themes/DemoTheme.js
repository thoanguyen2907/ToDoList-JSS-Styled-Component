import React from 'react'
import styled, {ThemeProvider} from 'styled-components'; 
export default function DemoTheme(props) {
    const configDarkTheme = {
        bg: '#fff',
        color: "#3333CC"
    }
    const configLightTheme = {
        bg: "#6633FF", 
        color: "#fff"
    }
    const DivStyle = styled.div`
    color: ${props => props.theme.color};
    padding: 5%; 
    background-color: ${props => props.theme.bg}`
    return (
        <ThemeProvider theme={configLightTheme}>
        <DivStyle>
            Hello Thanh Thoa
        </DivStyle>
        </ThemeProvider>
    )
}
