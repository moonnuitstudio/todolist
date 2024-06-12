import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors';

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
        light: '#3EAEA3',
        main: '#025951',
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
            lineHeight: '1.2rem',
            textTransform: 'uppercase',
        },
        avatarbody: {
            color: 'black',
            fontFamily: "'Montserrat'",
            fontWeight: '300',
            fontSize: '1rem',
            lineHeight: '1.2rem',
        },
        h2: {
            color: 'rgba(0,0,0,.7)',
            fontFamily: "'League_Spartan'",
            fontWeight: '700',
            fontSize: '1.8rem',
            lineHeight: '1rem',
        },
        h3: {
            color: palette.primary.main,
            fontFamily: "'League_Spartan'",
            fontWeight: '900',
            fontSize: '1.2rem',
            lineHeight: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '-1px'
        },
        h4: {
            fontFamily: "'League_Spartan'",
            fontWeight: '700',
            fontSize: '1.2rem',
            textTransform: 'capitalize',
            color: 'black'
        },
        h6: {
            fontFamily: "'League_Spartan'",
            fontWeight: '700',
            color: 'rgba(0,0,0,.7)'
        },
        subtitle1: {
            color: palette.primary.main,
            fontFamily: "'League_Spartan'",
            fontWeight: '800',
            fontSize: '1rem',
            textTransform: 'uppercase',
        },
        caption: {
            color: 'black',
            fontFamily: "'Montserrat'",
            fontWeight: '400',
            fontSize: '1.4rem',
            lineHeight: '1.1rem',
        }, 
        avatarinfo: {
            color: 'black',
            fontFamily: "'Montserrat'",
            fontWeight: '400',
            fontSize: '.95rem',
            lineHeight: '1.2rem',
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
                    avatarbody: 'p',
                    avatarinfo: 'p'
                }
            }
        },
        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    fontFamily: "'Montserrat'",
                    fontWeight: 700,
                    color: 'rgba(0, 0, 0, .7) !important'
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontFamily: "'Montserrat'",
                    fontWeight: 400,
                }
            }
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                        fontFamily: "'Montserrat'",
                        fontWeight: 700,
                        color: 'rgba(0, 0, 0, .7) !important',
                        pointerEvents: 'none',
                        userSelect: 'none'
                    },
                    '& input': {
                        fontFamily: "'Montserrat'",
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    fontFamily: "'League_Spartan'",
                    fontWeight: '800',
                    lineHeight: '1rem',
                    padding: '17px 50px 14px',
                    background: palette.secondary.light,
                    color: 'black',
                    transition: 'background .2s ease-in-out, color .2s ease-in-out',
                    '&:hover': {
                        background: '#F28F29',
                    }
                },
                text: {
                    background: 'transparent !important',
                    color: 'black'
                }
            }
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    backgroundColor: grey[400],
                }
            }
        }
    }
})

export default theme