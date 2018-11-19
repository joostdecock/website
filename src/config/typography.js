import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.75,
  scaleRatio: 2.5,
  headerGray: 0,
  bodyGray: 0,
  headerWeight: "bold",
  bodyWeight: "normal",
  headerFontFamily: ["Open Sans Condensed", "sans-serif"],
  bodyFontFamily: ["Domine", "serif"],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h1: { fontSize: "2.5rem", margin: "0 0 1rem" },
    h2: { fontSize: "2.2rem", margin: "0.5rem 0 1rem" },
    h3: { fontSize: "1.9rem", margin: "0.5rem 0 1rem" },
    h4: { fontSize: "1.7rem", margin: "0.5rem 0 0.5rem" },
    h5: { fontSize: "1.5rem", margin: "0.5rem 0 0.5rem" },
    h6: { fontSize: "1.3rem", margin: "0.5rem 0 0.5rem" },
    p: { fontSize: "1rem", marginBottom: "1rem" }
  })
});

export default typography;
