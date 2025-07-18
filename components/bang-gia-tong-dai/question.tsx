import { Row, Col } from "antd";
import styles from "./question.module.scss";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";

const items: CollapseProps["items"] = [
    {
        key: "1",
        label: (
            <span
                style={{
                    color: "#4C5BD4",
                    fontSize: "16px",
                }}
            >
                Mất bao lâu thì để cài đặt để dùng?
            </span>
        ),
        children: (
            <p
                style={{
                    color: "#474747",
                    fontSize: "16px",
                }}
            >
                - Trong vòng 30 phút thiết lập, doanh nghiệp sẽ có tổng đài sử
                dụng.
            </p>
        ),
    },
];
const items1: CollapseProps["items"] = [
    {
        key: "1",
        label: (
            <span
                style={{
                    color: "#4C5BD4",
                    fontSize: "16px",
                }}
            >
                Nếu tôi cần mua số tổng đài đẹp, tôi có thể lựa chọn không?
            </span>
        ),
        children: (
            <p
                style={{
                    color: "#474747",
                    fontSize: "16px",
                }}
            >
                - Chúng tôi có một danh sách số đẹp, doanh nghiệp có thể chọn.
            </p>
        ),
    },
];
const items2: CollapseProps["items"] = [
    {
        key: "1",
        label: (
            <span
                style={{
                    color: "#4C5BD4",
                    fontSize: "16px",
                }}
            >
                Tôi có thể chuyển số cũ của tôi thành số tổng đài không?{" "}
            </span>
        ),
        children: (
            <p
                style={{
                    color: "#474747",
                    fontSize: "16px",
                }}
            >
                - Hoàn toàn có thể được! Liên hệ chúng tôi để được hỗ trợ.
            </p>
        ),
    },
];
const items3: CollapseProps["items"] = [
    {
        key: "1",
        label: (
            <span
                style={{
                    color: "#4C5BD4",
                    fontSize: "16px",
                }}
            >
                Khi chuyển số cũ thành số tổng đài có mất thêm phí và vấn đề
                không?{" "}
            </span>
        ),
        children: (
            <p
                style={{
                    color: "#474747",
                    fontSize: "16px",
                }}
            >
                - Sẽ không mất phí, nhưng phải liên hệ công ty viễn thông cũ để
                chuyển.
            </p>
        ),
    },
];
const items4: CollapseProps["items"] = [
    {
        key: "1",
        label: (
            <span
                style={{
                    color: "#4C5BD4",
                    fontSize: "16px",
                }}
            >
                Tôi xài điện thoại bàn cũ (analog) thì có xài tổng đài ảo không?{" "}
            </span>
        ),
        children: (
            <p
                style={{
                    color: "#474747",
                    fontSize: "16px",
                }}
            >
                - Chúng tôi sẽ hỗ trợ nâng cấp sang tổng đài ảo bình thường.
            </p>
        ),
    },
];
const items5: CollapseProps["items"] = [
    {
        key: "1",
        label: (
            <span
                style={{
                    fontSize: "16px",
                    color: "#4C5BD4",
                }}
            >
                Dữ liệu của tôi được bảo mật như thế nào khi sử dụng dịch vụ
                OMICall?{" "}
            </span>
        ),
        children: (
            <p
                style={{
                    color: "#474747",
                    fontSize: "16px",
                }}
            >
                {" "}
                - Bảo mật tuyệt đối trên hệ thống Server của Viettel IDC.
            </p>
        ),
    },
];

export default function Question() {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div
                    style={{
                        marginBottom: "24px",
                    }}
                >
                    <h2 className={styles.title}>
                        {" "}
                        <span>NHỮNG CÂU HỎI</span> THƯỜNG GẶP
                    </h2>
                </div>
                <div>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={12}>
                            <Collapse
                                accordion
                                items={items}
                                bordered={false}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={12}>
                            <Collapse
                                accordion
                                items={items1}
                                bordered={false}
                            />
                        </Col>{" "}
                        <Col xs={24} sm={12} md={12}>
                            <Collapse
                                accordion
                                items={items2}
                                bordered={false}
                            />
                        </Col>{" "}
                        <Col xs={24} sm={12} md={12}>
                            <Collapse
                                accordion
                                items={items3}
                                bordered={false}
                            />
                        </Col>{" "}
                        <Col xs={24} sm={12} md={12}>
                            <Collapse
                                accordion
                                items={items4}
                                bordered={false}
                            />
                        </Col>{" "}
                        <Col xs={24} sm={12} md={12}>
                            <Collapse
                                accordion
                                items={items5}
                                bordered={false}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}
