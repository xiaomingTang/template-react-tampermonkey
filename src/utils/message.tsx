import React from "react"
import { Button, IconButton } from "@material-ui/core"
import { Close as CloseIcon } from "@material-ui/icons"

export function randomMessageKey() {
  return `__MessageKey__${Math.random()}`
}

interface SimpleIconButtonProps {
  onClick?: () => void;
}

export function CloseIconButton({
  onClick,
}: SimpleIconButtonProps) {
  return <IconButton
    color="inherit"
    size="small"
    onClick={onClick}
  >
    {/* fontSize must be inherit, or font-size bug occured */}
    <CloseIcon style={{ fontSize: "inherit" }} />
  </IconButton>
}

/**
 * notistack -> useSnackbar -> enqueueSnackbar first parameter cannot be string
 * or font-size bug occured
 */
export function geneSnackbarMessage(msg: string) {
  return <Button
    size="small"
    color="inherit"
  >
    {msg}
  </Button>
}
