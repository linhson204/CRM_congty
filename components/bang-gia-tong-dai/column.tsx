import IconCheck from "./icon2";

export const columns: any = [
    {
        title: " ",
        dataIndex: "s0",
        align: "left",
        render: (data) => {
            return (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        paddingLeft: "16px",
                    }}
                >
                    {/* <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 9.03125V1C0 0.4375 0.65625 0.15625 1.0625 0.5625L5.0625 4.5625C5.3125 4.8125 5.3125 5.21875 5.0625 5.46875L1.0625 9.46875C0.65625 9.875 0 9.59375 0 9.03125Z"
                            fill="#606060"
                        />
                    </svg> */}
                    <span
                        style={{
                            color: " #606060",
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: "700",
                            lineHeight: "16px",
                        }}
                    >
                        {data}
                    </span>
                </div>
            );
        },
    },
    {
        title: "CALL CENTER",
        dataIndex: "s1",
        width: 180,
        render: (data) => {
            return <div>{data === true ? <IconCheck /> : <>{data}</>}</div>;
        },
    },
    {
        title: "OMNI CHANNEL",
        dataIndex: "s2",
        width: 180,
        render: (data) => {
            return <div>{data === true ? <IconCheck /> : <>{data}</>}</div>;
        },
    },
    {
        title: "CALL CENTER AI",
        dataIndex: "s3",
        width: 180,
        render: (data) => {
            return <div>{data === true ? <IconCheck /> : <>{data}</>}</div>;
        },
    },
    {
        title: "OMNI CHANEL AI",
        dataIndex: "s4",
        width: 180,
        render: (data) => {
            return (
                <div id="OMNI-CHANEL-AI">
                    {data === true ? <IconCheck /> : <>{data}</>}
                </div>
            );
        },
    },
];
export const columns1: any = [
    {
        title: "Số lượng ",
        dataIndex: "s0",
        width: 300,
        align: "center",
    },
    {
        title: "GÓI KHÔNG CÓ AI",
        dataIndex: "s1",
        width: 300,
        align: "center",
    },
    {
        title: "GÓI  CÓ AI",
        dataIndex: "s2",
        width: 300,
        align: "center",
    },
    {
        title: "TRAINING BOT AI",
        dataIndex: "s3",
        width: 300,
        align: "center",
    },
];
export const columns2: any = [
    {
        dataIndex: "s0",
        width: 210,
        align: "center",
        onCell: (_, index) => {
            if (index === 0) {
                return { rowSpan: 5 };
            }
            if (index === 5) {
                return { rowSpan: 3 };
            }
            return {};
        },
    },
    {
        dataIndex: "s1",
        width: 210,
        align: "center",
    },
    {
        dataIndex: "s2",
        width: 210,
        align: "center",
        onCell: (_, index) => {
            if (index === 6) {
                return { colSpan: 3 };
            }
            if (index === 7) {
                return { colSpan: 3 };
            }
            return {};
        },
    },
    {
        dataIndex: "s3",
        width: 210,
        align: "center",
        onCell: (_, index) => {
            if (index === 7) {
                return { colSpan: 5 };
            }
            if (index === 4) {
                return { colSpan: 3 };
            }
            if (index === 5) {
                return { colSpan: 3 };
            }
            if (index === 6) {
                return { colSpan: 3 };
            }
            if (index === 7) {
                return { colSpan: 3 };
            }
            return {};
        },
    },
    {
        dataIndex: "s4",
        width: 180,
        align: "center",
    },
    {
        dataIndex: "s5",
        width: 180,
        align: "center",
        onCell: (_, index) => ({
            colSpan: index === 7 ? 3 : 1,
        }),
    },
];
