import { Button, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import cskh from "../csks.module.css";
import Image from "next/image";

type Props = {};

function NoConnectTd({}: Props) {
  return (
    <div>
      <div className={cskh.connect_tongdai} style={{ paddingBottom: 20 }}>
        <Link href={"/setting/switch_board"}>
          <Button
            style={{ height: 40, width: 200 }}
            className={`${cskh.dropbtn_add} `}
          >
            <Image
              style={{ paddingRight: 5 }}
              src="/crm/kn.svg"
              alt="Connect Icon"
              width={30}
              height={15}
            />
            Kết nối tổng đài
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NoConnectTd;
