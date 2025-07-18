import { Form } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../context/resizeContext";
import styleHome from "../home/home.module.css";
import { useHeader } from "../hooks/useHeader";
import TableApprovePost from "../table/table-approve-post";
import ApprovePostInputGroup from "./approve_post_input_group";


export default function ApprovePost() {
  const [form] = Form.useForm();

  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();
  const router = useRouter();

  const { start, search, status } = router.query as { start: string, search: string, status: string };

  const [searchText, setSearchText] = useState<any>(() => { });

  const [statusText, setStatusText] = useState<any>(() => { });


  const [fillStart, setFillStart] = useState<any>(() => {
    if (!start) return undefined
    return start.split(' ')[0]
  });

  const [condition, setCondition] = useState(() => {
    const query = {};
    if (start) {
      query['start'] = Number(start);
    }

    if (search) {
      query['search'] = search;
    }
    if (status) {
      query['status'] = status;
    }

    return JSON.stringify(query)
  })

  useEffect(() => {
    setHeaderTitle("Phê duyệt bài viết");
    setShowBackButton(false);
    setCurrentPath("/order-new/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  useEffect(() => {
    const query = {};
    if (start) {
      query['start'] = Number(start);
    }

    if (search) {
      query['search'] = search;
    }
    if (status) {
      query['status'] = status;
    }

    query['page'] = 0;
    setCondition(JSON.stringify(query));
  }, [start, status]);


  return (
    <div ref={mainRef} className={styleHome.main}>
      <ApprovePostInputGroup
        condition={condition}
        setCondition={setCondition}
        fillStart={fillStart}
        setFillStart={setFillStart}
        searchText={searchText}
        setSearchText={setSearchText}
        statusText={statusText}
        setStatusText={setStatusText}
      />

      <TableApprovePost
        condition={condition}
      />
    </div>
  );
}
