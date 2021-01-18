import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from "react"
import {
  Button, IconButton, InputAdornment, TextField,
} from "@material-ui/core"
import {
  ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon, Check as CheckIcon, Settings as SettingsIcon, KeyboardArrowDown as KeyboardArrowDownIcon,
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

const geneOpenPage = (pageType: string, idx: number, readonly = false) => () => {
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
  const [inputPageIdx, setInputPageIdx] = useState(-1)
  const href = useHref()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputPageIdx(parseInt(e.target.value || "-1", 10))
  }, [])

  const handleInputEnter = useCallback(() => {
    geneOpenPage(pageType, inputPageIdx, false)()
  }, [inputPageIdx, pageType])

  const openMessage = useCallback(() => {
    enqueueSnackbar(welcome, {
      key: MessageKey,
      // autoHideDuration: null,
      action: <CloseIconButton onClick={() => closeSnackbar(MessageKey)} />,
    })
  }, [enqueueSnackbar, closeSnackbar])

  // 输入框 inputPageIdx 默认值为 curPageIdx
  useEffect(() => {
    if (curPageIdx > 0) {
      setInputPageIdx((prev) => {
        if (prev > 0) {
          return prev
        }
        return curPageIdx
      })
    }
  }, [curPageIdx])

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

  if (isCollapsed) {
    return <IconButton className={Styles.mainBtn} onClick={() => {
      setIsCollapsed(false)
    }}>
      <SettingsIcon />
    </IconButton>
  }

  // if (!pageType) {
  //   return <></>
  // }

  return <div className={Styles.wrapper}>
    <Button
      fullWidth
      size="small"
      variant="text"
      color="primary"
      onClick={() => {
        setIsCollapsed(true)
      }}
    >
      <KeyboardArrowDownIcon />
    </Button>
    <div className={joinSpace(Styles.area, Styles.area1)}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={geneOpenPage(pageType, -1, false)}
      >
        新建
      </Button>
    </div>
    <div className={joinSpace(Styles.area, Styles.area2)}>
      <TextField
        className={Styles.removeNumberSpin}
        label="跳转编辑"
        type="number"
        fullWidth
        margin="dense"
        size="small"
        variant="outlined"
        defaultValue={inputPageIdx <= 0 ? "" : `${inputPageIdx}`}
        InputProps={{
          endAdornment: (<InputAdornment position="end">
            <IconButton onClick={handleInputEnter}>
              <CheckIcon />
            </IconButton>
          </InputAdornment>),
        }}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement
          switch (e.key.toLowerCase()) {
          case "enter":
            handleInputEnter()
            break
          case "escape":
            target.select()
            break
          default:
            break
          }
        }}
      />
    </div>
    <div className={joinSpace(Styles.area, Styles.area2)}>
      <label className={Styles.label}>编辑: </label>
      <Button disabled={curPageIdx <= 0} onClick={geneOpenPage(pageType, curPageIdx - 1, false)} size="small" className={Styles.ml} variant="contained" color="primary" startIcon={<ArrowLeftIcon />}>上一页</Button>
      <Button disabled={curPageIdx <= 0} onClick={geneOpenPage(pageType, curPageIdx, false)} size="small" className={Styles.ml} variant="outlined" color="primary">当前页</Button>
      <Button disabled={curPageIdx <= 0} onClick={geneOpenPage(pageType, curPageIdx + 1, false)} size="small" className={Styles.ml} variant="contained" color="primary" endIcon={<ArrowRightIcon />}>下一页</Button>
    </div>
    <div className={joinSpace(Styles.area, Styles.area3)}>
      <label className={Styles.label}>查看: </label>
      <Button disabled={curPageIdx <= 0} onClick={geneOpenPage(pageType, curPageIdx - 1, true)} size="small" className={Styles.ml} variant="contained" color="primary" startIcon={<ArrowLeftIcon />}>上一页</Button>
      <Button disabled={curPageIdx <= 0} onClick={geneOpenPage(pageType, curPageIdx, true)} size="small" className={Styles.ml} variant="outlined" color="primary">当前页</Button>
      <Button disabled={curPageIdx <= 0} onClick={geneOpenPage(pageType, curPageIdx + 1, true)} size="small" className={Styles.ml} variant="contained" color="primary" endIcon={<ArrowRightIcon />}>下一页</Button>
    </div>
  </div>
}
