import React, { useCallback, useEffect, useState } from "react"
import { Button } from "@material-ui/core"
import {
  ArrowLeft, ArrowRight,
} from "@material-ui/icons"
import {
  useSnackbar,
} from "notistack"

import { CloseIconButton, SimpleText, randomMessageKey } from "@Src/utils/message"

import Styles from "./index.module.less"

const welcome = <SimpleText>{"hello tampermonkey"}</SimpleText>
const MessageKey = randomMessageKey()

function joinSpace(...args: string[]) {
  return args.join(" ")
}

const routeTo = (pageType: string, idx: number, readonly = false) => () => {
  let url = `https://m.lmoar.com/admin/${pageType}/`
  if (idx < 0) {
    url += "new"
  } else {
    url += `${idx}/${readonly ? "" : "edit"}`
  }
  window.location.href = url
}

function useHref() {
  const [href, setHref] = useState(window.location.href)

  useEffect(() => {
    const onHistoryChange = () => {
      setHref(window.location.href)
    }

    window.addEventListener("popstate", onHistoryChange)
    return () => {
      window.removeEventListener("popstate", onHistoryChange)
    }
  }, [])

  return href
}

export default function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [pageType, setPageType] = useState("")
  const [curPageIdx, setCurPageIdx] = useState(-1)
  const href = useHref()

  const openMessage = useCallback(() => {
    enqueueSnackbar(welcome, {
      key: MessageKey,
      // autoHideDuration: null,
      action: <CloseIconButton onClick={() => closeSnackbar(MessageKey)} />,
    })
  }, [enqueueSnackbar, closeSnackbar])

  // 新建及上一页、下一页按钮
  useEffect(() => {
    // http://m.lmoar.com/admin/show_page/31444
    const url = new URL(href)
    const [_, adminName, pageName, pageIdx] = url.pathname.split("/")
    console.log(adminName, pageName)
    if (adminName === "admin" && pageName) {
      setPageType(pageName)
      const idx = parseInt(pageIdx, 10)
      if (idx > 0) {
        setCurPageIdx(idx)
      }
    }
  }, [href])

  // 大屏广告名称自动填充
  useEffect(() => {
    const nameInput = document.querySelector("#adv_page_name") as HTMLInputElement
    const orderInput = document.querySelector("#adv_page_position") as HTMLInputElement
    const fileInput = document.querySelector(".qq-upload-button > input[type=file]") as HTMLInputElement
    if (nameInput && orderInput && fileInput) {
      fileInput.addEventListener("change", () => {
        const { name: basename } = (fileInput.files || [])[0] || { name: "" }
        if (basename && /\d+\.(jpg|png)/i.test(basename)) {
          const name = basename.split(".")[0]
          nameInput.value = name
          orderInput.value = name
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fileInput.parentElement!.style.backgroundColor = "#1188ee"
    }
  }, [])

  if (!pageType) {
    return <></>
  }

  return <div className={Styles.wrapper}>
    <div className={joinSpace(Styles.area, Styles.area1)}>
      <Button onClick={routeTo(pageType, -1, false)} size="large" className={Styles.button} variant="contained" color="primary">新建</Button>
    </div>
    <div className={joinSpace(Styles.area, Styles.area2)}>
      <label className={Styles.label}>编辑: </label>
      <Button disabled={curPageIdx <= 0} onClick={routeTo(pageType, curPageIdx - 1, false)} size="small" className={Styles.button} variant="contained" color="primary" startIcon={<ArrowLeft />}>上一页</Button>
      <Button disabled={curPageIdx <= 0} onClick={routeTo(pageType, curPageIdx, false)} size="small" className={Styles.button} variant="outlined" color="primary">当前页</Button>
      <Button disabled={curPageIdx <= 0} onClick={routeTo(pageType, curPageIdx + 1, false)} size="small" className={Styles.button} variant="contained" color="primary" endIcon={<ArrowRight />}>下一页</Button>
    </div>
    <div className={joinSpace(Styles.area, Styles.area3)}>
      <label className={Styles.label}>查看: </label>
      <Button disabled={curPageIdx <= 0} onClick={routeTo(pageType, curPageIdx - 1, true)} size="small" className={Styles.button} variant="contained" color="primary" startIcon={<ArrowLeft />}>上一页</Button>
      <Button disabled={curPageIdx <= 0} onClick={routeTo(pageType, curPageIdx, true)} size="small" className={Styles.button} variant="outlined" color="primary">当前页</Button>
      <Button disabled={curPageIdx <= 0} onClick={routeTo(pageType, curPageIdx + 1, true)} size="small" className={Styles.button} variant="contained" color="primary" endIcon={<ArrowRight />}>下一页</Button>
    </div>
  </div>
}
