import React from "react"
import ReactDOM from "react-dom"
import { SnackbarProvider } from "notistack"

import App from "@Comps/App"
import { MuiThemeProviderFixHtmlFontSize } from "@Src/utils/MuiThemeProvider_FixHtmlFontSize"

import Styles from "@Src/index.module.less"
import "@Src/index.less"

const rootDom = document.createElement("div")
rootDom.className = Styles.rootDom
document.body.appendChild(rootDom)

ReactDOM.render(
  <MuiThemeProviderFixHtmlFontSize>
    <SnackbarProvider
      variant="info"
      preventDuplicate
      maxSnack={3}
      autoHideDuration={2500}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <App />
    </SnackbarProvider>
  </MuiThemeProviderFixHtmlFontSize>,
  rootDom,
)
