import React, { useMemo, ReactNode } from "react"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"

import { useHtmlFontSize } from "./useHtmlFontSize"

export function MuiThemeProviderFixHtmlFontSize({
  children,
}: {
  children: ReactNode;
}) {
  const htmlFontSize = useHtmlFontSize()

  const theme = useMemo(() => createMuiTheme({
    typography: {
      htmlFontSize,
    },
  }), [htmlFontSize])

  return <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
}
