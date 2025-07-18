import { Button, Modal } from "antd"
import Image from "next/image"
import styles from "./ModalWrapper.module.css"

export function ModalWrapper(
  open: boolean,
  setOpen: Function,
  children: any,
  width: number,
  title: string,
  okText: string,
  onConfirm: Function,
  hasHeade: boolean = true,
  hasPadding: boolean = true,
  hasX: boolean = true,
  hasAbortBtn: boolean = true,
  hasFooter: boolean = true
) {
  return (
    <Modal
      bodyStyle={{ padding: "0px" }}
      open={open}
      onCancel={() => setOpen(false)}
      width={width}
      closable={false}
      destroyOnClose={true}
      style={{
        top: 0,
        padding: "20px"
      }}
      className="bannerQLC"
      footer={
        hasFooter && (
          <div className={styles.footer}>
            {hasAbortBtn && (
              <Button
                className={styles.cancel}
                size="large"
                style={{
                  border: "1px solid #4C5BD4",
                  borderRadius: "10px",
                  width: "110px"
                }}
                onClick={() => setOpen(false)}
              >
                <p
                  className={styles.cancelTxt}
                  style={{ color: "#4C5BD4", padding: "0px 15px" }}
                >
                  Hủy
                </p>
              </Button>
            )}
            <Button
              size="large"
              className={`${styles.okBtn}`}
              id="button"
              htmlType="submit"
              onClick={() => {
                onConfirm()
                // setOpen(false)
              }}
            >
              <p className={styles.txt}>{okText}</p>
            </Button>
          </div>
        )
      }
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{
        style: { display: "none" }
      }}
    >
      {hasHeade ? (
        <div className={styles.header}>
          <div></div>
          <p className={styles.headerText}>{title}</p>
          {hasX ? (
            <Image
              alt="/"
              src={"/cross.png"}
              width={14}
              height={14}
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            />
          ) : (
            <div></div>
          )}
        </div>
      ) : null}
      <div style={{ padding: hasPadding ? "20px" : "0px" }}>{children}</div>
    </Modal>
  )
}

export function ModalWrapper2(
  open: boolean,
  setOpen: Function,
  children: any,
  width: number,
  title: string,
  okText: string,
  onConfirm: Function,
  hasHeade: boolean = true,
  hasPadding: boolean = true,
  hasX: boolean = true,
  hasAbortBtn: boolean = true,
  hasFooter: boolean = true,
  cancelFunc: () => void
) {
  return (
    <Modal
      bodyStyle={{ padding: "0px" }}
      open={open}
      onCancel={() => setOpen(false)}
      width={width}
      closable={false}
      destroyOnClose={true}
      className="bannerQLC"
      style={{
        top: 0,
        padding: "20px"
      }}
      footer={
        hasFooter && (
          <div className={styles.footer}>
            {hasAbortBtn && (
              <Button
                className={styles.cancel}
                size="large"
                style={{
                  border: "1px solid #4C5BD4",
                  borderRadius: "10px",
                  width: "110px"
                }}
                onClick={cancelFunc}
              >
                <p
                  className={styles.cancelTxt}
                  style={{ color: "#4C5BD4", padding: "0px 15px" }}
                >
                  Hủy
                </p>
              </Button>
            )}
            <Button
              size="large"
              className={`${styles.okBtn}`}
              id="button"
              htmlType="submit"
              onClick={() => {
                onConfirm()
                // setOpen(false)
              }}
            >
              <p className={styles.txt}>{okText}</p>
            </Button>
          </div>
        )
      }
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{
        style: { display: "none" }
      }}
    >
      {hasHeade ? (
        <div className={styles.header}>
          <div></div>
          <p className={styles.headerText}>{title}</p>
          {hasX ? (
            <Image
              alt="/"
              src={"/cross.png"}
              width={14}
              height={14}
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            />
          ) : (
            <div></div>
          )}
        </div>
      ) : null}
      <div style={{ padding: hasPadding ? "20px" : "0px" }}>{children}</div>
    </Modal>
  )
}
