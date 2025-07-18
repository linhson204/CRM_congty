import React, { useState } from "react";
import CurrentGroup from "./current_group";
import GroupFormInputGroup from "./group_form_input";
import DetailAction from "./group_detail_action";
import TableDataZaloForm from "@/components/crm/table/table-marketing-zalo-group";
import GroupZaloAdd from "./group_add_content";
import GroupZaloList from "./group_zalo_list";
import GroupAddFriendAndAddGroup from "./group_add_friend";
import GroupEmpty from "./group_empty";
import { useRouter } from "next/router";


export interface InitNumberPageProps {
  initNumber: number;
}

const Group: React.FC<InitNumberPageProps> = ({ initNumber }) => {
  const listDetail = ["Tài khoản Zalo", "Kịch bản tin", "Lịch đăng bài", "Shop"];
  const [isEmpty, setIsEmpty] = useState(false);
  const [numberPage, setNumberPage] = useState<number>(initNumber);
  const changeNumber = (inputNumber: number) => {
    setNumberPage(inputNumber)
  };
  const router = useRouter();

  return (
    <section>
      {isEmpty ? (
        <GroupEmpty />
      ) : (
        <>
          <CurrentGroup numberCurrentDetailForGroup={0} listDetail={listDetail} slug={""} />
          {!router.query.slug && (
            <>
              <GroupFormInputGroup isSelectedRow={true}  />
              <DetailAction changeNumberPage={(e) => changeNumber(e)}/>
              <TableDataZaloForm 
              changeNumberPage={(e) => changeNumber(e)}
              />
            </>
          )}
          {router.query.slug == 'join-group' && <GroupZaloAdd />}
          {router.query.slug == 'list-group' && <GroupZaloList />}
          {router.query.slug == 'add-friend-in-group'  && <GroupAddFriendAndAddGroup />}
          {router.query.slug == 'add-friend-of-group'  && <GroupAddFriendAndAddGroup />}
        </>
      )}
    </section>
  );
};

export default Group;
