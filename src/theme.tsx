import { createTheme } from '@mui/material/styles'

import LeagueSpartanBold from './assets/fonts/league_spartan/LeagueSpartanBold.ttf'
import LeagueSpartanBlack from './assets/fonts/league_spartan/LeagueSpartanBlack.ttf'
import LeagueSpartanSemiBold from './assets/fonts/league_spartan/LeagueSpartanSemiBold.ttf'

import MontserratLight from './assets/fonts/montserrat/MontserratLight.ttf'
import MontserratRegular from './assets/fonts/montserrat/MontserratRegular.ttf'
import MontserratMedium from './assets/fonts/montserrat/MontserratMedium.ttf'
import MontserratBold from './assets/fonts/montserrat/MontserratBold.ttf'

const breakpoints = {
    values: {
      xs: 0,
      sm: 600, 
      md: 1050, 
      lg: 1400, 
      xl: 1736
    }
}

const palette = {
    background: {
        default: '#F5F5F5'
    },
    primary: {
        main: '#1B3AFA',
        light: '#025951',
        dark: '#020873',
    },
    secondary: {
        main: '#FBC61C',
        light: '#F2AC29',
        dark: '#AD4900',
    },
}

const theme = createTheme({
    breakpoints,
    palette,
    typography: {
        avatartitle: {
            color: 'black',
            fontFamily: "'League_Spartan'",
            fontWeight: '800',
            fontSize: '1.3rem',
            lineHeight: '1rem',
            textTransform: 'uppercase',
        },
        avatarbody: {
            color: 'black',
            fontFamily: "'Montserrat'",
            fontWeight: '300',
            fontSize: '1rem',
            lineHeight: '1rem',
        },
        h2: {
            color: 'rgba(0,0,0,.7)',
            fontFamily: "'League_Spartan'",
            fontWeight: '700',
            fontSize: '1.8rem',
            lineHeight: '1rem',
        },
        h3: {
            color: palette.primary.light,
            fontFamily: "'League_Spartan'",
            fontWeight: '900',
            fontSize: '2.2rem',
            textTransform: 'uppercase',
            letterSpacing: '-1px'
        },
        subtitle1: {
            color: palette.primary.light,
            fontFamily: "'League_Spartan'",
            fontWeight: '800',
            fontSize: '1.5rem',
            textTransform: 'uppercase',
        },
        caption: {
            color: 'black',
            fontFamily: "'Montserrat'",
            fontWeight: '400',
            fontSize: '1.4rem',
            lineHeight: '1.1rem',
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'League_Spartan';
                    font-display: swap;
                    font-weight: 700;
                    src: local('LeagueSpartan'), local('LeagueSpartan_SemiBold'), url(${LeagueSpartanSemiBold}), format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }

                @font-face {
                    font-family: 'League_Spartan';
                    font-display: swap;
                    font-weight: 800;
                    src: local('LeagueSpartan'), local('LeagueSpartan_Bold'), url(${LeagueSpartanBold}), format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }

                @font-face {
                    font-family: 'League_Spartan';
                    font-display: swap;
                    font-weight: 900;
                    src: local('LeagueSpartan'), local('LeagueSpartan_Black'), url(${LeagueSpartanBlack}), format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }

                @font-face {
                    font-family: 'Montserrat';
                    font-display: swap;
                    font-weight: 300;
                    src: local('Montserrat'), local('Montserrat_Light'), url(${MontserratLight}), format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }

                @font-face {
                    font-family: 'Montserrat';
                    font-display: swap;
                    font-weight: 400;
                    src: local('Montserrat'), local('Montserrat_Regular'), url(${MontserratRegular}), format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }

                @font-face {
                    font-family: 'Montserrat';
                    font-display: swap;
                    font-weight: 500;
                    src: local('Montserrat'), local('Montserrat_Medium'), url(${MontserratMedium}), format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }

                @font-face {
                    font-family: 'Montserrat';
                    font-display: swap;
                    font-weight: 700;
                    src: local('Montserrat'), local('Montserrat_Bold'), url(${MontserratBold}), format('ttf');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }
            `
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    avatartitle: 'p',
                    avatarbody: 'p'
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#7B89A2',
                    transition: 'color .2s ease-in-out',
                    '& svg': {
                        fontSize: '1.7rem',
                    }
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: '#7B89A2',
                    transition: 'color .2s ease-in-out',
                    '& .MuiTypography-root': {
                        fontFamily: "'Montserrat'",
                        fontWeight: '400',
                        fontSize: '1.1rem'
                    }
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: ({ active }) => ({
                    paddingLeft: '34px',
                    background: 'transparent !important',
                    '&:hover': {
                        '& .MuiListItemIcon-root': { color: '#18181C', },
                        '& .MuiTypography-root': { color: '#18181C', }
                    },
                    ...(active == true && {
                        '& .MuiListItemIcon-root': { color: '#593202 !important', },
                        '& .MuiTypography-root': { color: '#593202 !important', }
                    }),
                })
            }
        }
    }
})

export default theme