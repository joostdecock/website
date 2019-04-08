import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.75,
  scaleRatio: 2.5,
  headerGray: 0,
  bodyGray: 0,
  headerWeight: "normal",
  bodyWeight: "normal",
  headerFontFamily: ["Roboto", "sans-serif"],
  bodyFontFamily: ["Open Sans", "sans-serif"],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h1: { fontSize: "2.5rem", margin: "0 0 2rem", fontWeight: 900 },
    h2: { fontSize: "2rem", margin: "1.5rem 0 1rem", fontWeight: 600 },
    h3: { fontSize: "1.7rem", margin: "1.5rem 0 1rem", fontWeight: 600 },
    h4: { fontSize: "1.4rem", margin: "1rem 0 0.5rem", fontWeight: 600 },
    h5: { fontSize: "1.2rem", margin: "1rem 0 0.5rem", fontWeight: 600 },
    h6: { fontSize: "1rem", margin: "1rem 0 0.5rem", fontWeight: 600 },
    p: { fontSize: "1rem", marginBottom: "1rem" }
  })
});

export default typography;
