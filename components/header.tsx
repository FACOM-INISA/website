import React from 'react';
import Image from 'next/image'
import Link from "next/link";
import Elements from '../utils/homeinterface';
import logo from '../public/images/ufms.png';
import divider from '../public/images/dividerWhite.svg';
import { Box, createTheme, Grid, ThemeProvider, Typography } from '@mui/material'; 

const theme = createTheme({
    typography: {
        fontFamily: 'Lato',
        h4: {
            fontWeigth: 900,
        }
    }
})

export interface ElementProps {
    elements: Elements[];
}

export const HeaderComponent: React.FC<ElementProps> = ({elements}: ElementProps) => {
    const element = elements

    return (
        <ThemeProvider theme={theme}>
            <Box 
                sx={{
                    paddingRight: '10rem',
                    paddingLeft: '10rem',
                    height: '25vh', 
                    display: 'flex', 
                    flexDirection: 'row',
                    backgroundColor: '#077FA8', 
                    color: '#FEFEFE'
                }}>
                {/* container esquerdo */}
                <Grid container spacing={2} alignItems='center'>
                    <Grid item>
                        <Link href="/">
                            <a><Image src={logo} alt="UFMS Logo" width={68} height={90}/></a>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Image src={divider} height={100} />
                    </Grid>
                    <Grid item>
                            <Typography variant='h4'>INISA</Typography>
                            <Typography>Instituto Integrado de Saúde</Typography>
                    </Grid>
                </Grid>

                {/* container direito */}
                <Grid container alignItems='center' justifyContent='right' spacing={2}>
                    {element.map((item) => {
                            return (
                                <Grid item key={item.id}>
                                    <Link key={item.id} href={item.path}>{item.name}</Link>
                                </Grid>
                            )
                    })}
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default HeaderComponent;