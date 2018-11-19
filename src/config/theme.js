export default {
  typography: {
    fontFamily: ["Domine", "serif"].join(",")
  },
  props: {
    MuiButtonBase: {
      disableRipple: true // Disabling ripple everywhere
    }
  }
};

export const colors = {
  bw1: "#111111",
  bw2: "#343434",
  bw3: "#5A5A5A",
  bw4: "#828282",
  bw5: "#B4B4B4",
  bw6: "#DCDCDC",
  bw7: "#ECECEC",
  bw8: "#F8F8F8",
  bw9: "#FFFFFF",
  link: "#2979FF",
  linkFaded: "#69a1FF",
  linkWhite: "#D9E7FF",
  success: "#1FAA00",
  successFaded: "#71E157",
  successWhite: "#E0FFD9",
  warning: "#FF8100",
  warningFaded: "#FFB569",
  warningWhite: "#FFECD9",
  danger: "#D50000",
  dangerFaded: "#FF5B5B",
  dangerWhite: "#FFD9D9",
  accent: "#7E4CCB",
  accentFaded: "#AD8DDE",
  accentWhite: "#EAE2F6"
};
