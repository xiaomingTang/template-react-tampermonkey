import React, { useCallback } from "react"
import { Button } from "@material-ui/core"
import {
  Settings as SettingsIcon,
} from "@material-ui/icons"
import {
  useSnackbar,
} from "notistack"

import { CloseIconButton, geneSnackbarMessage, randomMessageKey } from "@Src/utils/message"

import Styles from "./index.module.less"

const welcomeStr = "hello tampermonkey"
const MessageKey = randomMessageKey()

export default function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const openMessage = useCallback(() => {
    enqueueSnackbar(geneSnackbarMessage(welcomeStr), {
      key: MessageKey,
      // autoHideDuration: null,
      action: <CloseIconButton onClick={() => closeSnackbar(MessageKey)} />,
    })
  }, [enqueueSnackbar, closeSnackbar])

  return <>
    <Button
      className={Styles.mainButton}
      variant="contained"
      color="primary"
      onClick={openMessage}
    >
      {
      /**
       * fontSize must be inherit, or font-size bug occured
       * 不加 nbsp, Button 会塌陷, 很难看
       */
      }
      &nbsp;<SettingsIcon fontSize="inherit" />&nbsp;
    </Button>
  </>
}
