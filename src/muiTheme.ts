import {
  ThemeOptions,
  createTheme,
  responsiveFontSizes,
  alpha,
} from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    text: {
      primary: "#000",
    },
    mode: "light",
    primary: {
      main: "rgba(24, 109, 133, 1)",
      // main: '#12262C',
      contrastText: "white",
    },
    secondary: {
      main: "#cdebec",
      contrastText: "#186d85",
    },
    tertiary: {
      main: "#90a2b5",
      light: alpha("#90a2b5", 0.5),
      dark: alpha("#90a2b5", 0.7),
      contrastText: "white",
    },
    dark: {
      main: "rgba(255, 255, 255, 0.15)",
      light: "rgba(255, 255, 255, 0.05)",
      dark: "rgba(255, 255, 255, 0.40)",
      contrastText: "white",
    },
    alert: {
      main: "rgba(184, 48, 15, 0.15)",
      light: alpha("rgba(184, 48, 15, 0.15)", 0.5),
      dark: alpha("rgba(184, 48, 15, 0.15)", 0.7),
      contrastText: "#b8300f",
    },
    accent: {
      main: "#59A7AC",
    },
    light: {
      main: "white",
    },
  },
  typography: {
    fontFamily: "Lato",
    h2: {
      fontWeight: 900,
    },
    h3: {
      fontWeight: 900,
    },
    h4: {
      fontWeight: 900,
    },
    h5: {
      fontWeight: 900,
    },
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#000",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {},
        divider: {
          borderColor: "var(--border)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.MuiMenu-paper, &.MuiPopover-paper": {
            borderRadius: 0,
            boxShadow: "none",
            border: "1px solid var(--border)",
          },
          "&.MuiMenu-paper": {
            padding: "10px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          "&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
            border: "3px solid black",
            // outline: '3px solid yellow',
            boxShadow: "0 0 0 3px yellow",
          },
        },
        // input: {
        //     ':focus': {
        //         outline: '3px solid yellow',
        //     },
        // },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          ":hover": {
            boxShadow: "none",
          },
          borderRadius: 0,
          boxShadow: "none",
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: "700",
          "&.MuiButton-containedSecondary:not(.Mui-disabled)": {
            boxShadow: `inset 0 -3px 0 0 ${"#186d85"}`,
          },
          "&.MuiButton-containedAlert:not(.Mui-disabled)": {
            boxShadow: `inset 0 -3px 0 0 ${"var(--alert-button-accent)"}`,
          },
          "&.MuiButton-containedTertiary:not(.Mui-disabled)": {
            boxShadow: `inset 0 -3px 0 0 ${"#242424"}`,
          },
          "&.MuiButton-containedDark:not(.Mui-disabled)": {
            boxShadow: `inset 0 -3px 0 0 ${"#fff"}`,
          },
          "&.MuiButton-text": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        square: true,
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderColor: "#b1b4b6",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#186d85",
          backgroundColor: "#e8f9ff",
          fontWeight: "bold",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#b1b4b6",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          "& .MuiTablePagination-selectLabel": {
            fontSize: "1.1rem",
          },
          "& p": {
            fontSize: "1.1rem",
          },
          fontSize: "1.1rem",
        },
      },
    },
  },
};

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    alert: Palette["primary"];
    dark: Palette["primary"];
    accent: Palette["primary"];
    light: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary: Palette["primary"];
    alert: Palette["primary"];
    dark: Palette["primary"];
    accent: PaletteOptions["primary"];
    light: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    alert: true;
    dark: true;
  }
}

export const theme = responsiveFontSizes(createTheme(themeOptions));
