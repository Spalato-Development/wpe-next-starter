const Color = require('color');

const lighten = (clr, val) => Color(clr).lighten(val).rgb().string();
const darken = (clr, val) => Color(clr).darken(val).rgb().string();
const colors = require('tailwindcss/colors');

const {
  blueGray,
  coolGray,
  trueGray,
  warmGray,
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  lightBlue,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
  gray,
} = colors;

//palette
const light = blueGray[100],
  ultraLight = blueGray[50],
  dark = blueGray[800],
  ultraDark = blueGray[900],
  primary = teal[400],
  secondary = purple[500],
  highlight = red[500],
  mutted = blueGray[200],
  bg = ultraLight,
  text = ultraDark;

module.exports = {
  /* base colors*/
  ...colors,
  light,
  ultraLight,
  ultraDark,
  primary,
  secondary,
  highlight,
  mutted,
  bg,
  text,
};
