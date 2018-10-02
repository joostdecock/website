import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.75,
  scaleRatio: 2.5,
  headerGray: 0,
  bodyGray: 20,
  headerWeight: 400,
  bodyWeight: "normal",
	overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
  	body: {
  	  "background-color": "#f5f5f5"
  	},
    "h4,h5,h6": {
      "font-weight": "bold"
    },
  	blockquote: {
  	  ...adjustFontSizeTo('20px'),
  	  padding: "20px",
  	  "font-weight": 400,
  	  "line-height": 1.5,
  	},
  	'blockquote > :last-child': {
  	  marginBottom: 0,
  	},
	})
})

export default typography
