import { SheetsRegistry } from "jss";
import { createGenerateClassName } from "@material-ui/core/styles";
import { loadTheme } from "./utils";

/** This code is required for isomorphic rendering
 * as in, make sure the SSR has properly styled content
 * see: https://github.com/mui-org/material-ui/tree/master/examples/gatsby
 */

const theme = loadTheme(false);

function createPageContext() {
  return {
    theme,
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName()
  };
}

export default function getPageContext() {
  if (!process.browser) return createPageContext();

  if (!global.__INIT_MATERIAL_UI__)
    global.__INIT_MATERIAL_UI__ = createPageContext();

  return global.__INIT_MATERIAL_UI__;
}
