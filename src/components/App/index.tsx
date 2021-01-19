import { hot } from "react-hot-loader/root"
import React, {
  useCallback,
} from "react"
import {
  Button,
} from "@material-ui/core"
import {
  Settings as SettingsIcon,
} from "@material-ui/icons"
import {
  useSnackbar,
} from "notistack"

import { CloseIconButton, SimpleText, randomMessageKey } from "@Src/utils/message"

import Styles from "./index.module.less"

const welcome = <SimpleText>{"hello tampermonkey"}</SimpleText>
const MessageKey = randomMessageKey()

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const openMessage = useCallback(() => {
    enqueueSnackbar(welcome, {
      key: MessageKey,
      // autoHideDuration: null,
      action: <CloseIconButton onClick={() => closeSnackbar(MessageKey)} />,
    })
  }, [enqueueSnackbar, closeSnackbar])

  return <>
    <Button
      className={Styles.mainBtn}
      variant="contained"
      color="primary"
      onClick={openMessage}
    >
      {/* 不加 nbsp, Button 会塌陷, 很难看 */}
      &nbsp;<SettingsIcon fontSize="inherit" />&nbsp;
    </Button>
  </>
}

export default hot(App)
