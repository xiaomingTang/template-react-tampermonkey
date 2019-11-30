import React from "react"
import { Button, message } from "antd"

export default function App() {
  const content = "hello tampermonkey"
  const welcomeStr = "恭喜你，成功了！"
  return (<Button
    type="primary"
    icon="menu"
    onClick={() => {
      message.success(welcomeStr)
    }}
  >
    {content}
  </Button>)
}
