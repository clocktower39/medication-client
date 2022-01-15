import { createTheme } from '@mui/material';

let theme = createTheme();

theme = createTheme(theme => ({
    typography: {
        h1: {
            fontFamily: "Roboto"
        },
        h2: {
            fontFamily: "Roboto"
        },
        h3: {
            fontFamily: "Roboto"
        },
        h4: {
            fontFamily: "Roboto"
        },
        h5: {
            fontFamily: "Roboto"
        },
        h6: {
            fontFamily: "Roboto"
        }
    },
    overrides: {
        MuiInputBase: {
        }
    }
}))

export default theme