import Image from "next/image"
import styles from "./Buttons.module.css"
import { Button } from "antd"

export function AddButton(title: string, onClickFunc: Function) {
  return (
    <Button
      onClick={() => onClickFunc()}
      size="large"
      icon={<Image alt="/" src={"/plus-w.png"} width={20} height={20} />}
      style={{
        backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        background: "#42D778"
      }}
    >
      <p style={{ color: "#fff" }}>{title}</p>
    </Button>
  )
}

export function SearchButton(
  title: string,
  onClickFunc: Function,
  block: boolean
) {
  return (
    <Button
      icon={<Image alt="/" src={"/search.png"} width={24} height={24} />}
      onClick={() => onClickFunc()}
      size="large"
      style={{
        backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        background: "#4C5BD4"
        // height: "100%"
      }}
    >
      <p style={{ color: "#fff" }}>{title}</p>
    </Button>
  )
}

export function ExportExcelButton(onClickFunc: Function) {
  return (
    <Button
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        background: "##fff",
        // height: "100%"
        border: "1px solid #20744A"
      }}
      size="large"
      icon={<Image alt="" src={"/excel-icon.png"} width={24} height={24} />}
    >
      <p style={{ color: "#20744A" }}>Xuất file Excel</p>
    </Button>
  )
}
