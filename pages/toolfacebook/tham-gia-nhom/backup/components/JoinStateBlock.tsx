import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoEnterOutline, IoExitOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import style from '../styles.module.css';

interface UserListIndexBarProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage?: number;
    goToPrev: () => void;
    goToNext: () => void;
}

export default function JoinStateBlock({
    group,
    UpdateGrState,
    HandlePostGroup,
    setShowLoading,
    setShowPrivateGrQues,
    setPrivateGrSelected,
    setpopupHeader,
    setShowPopup,
    setSelectedGrOut,
    setShowCancelQueuePopUp
}: {
    group: any;
    UpdateGrState: (link: string) => void;
    HandlePostGroup: (groupId: string) => void;
    setShowLoading: (show: boolean) => void;
    setShowPrivateGrQues: (show: boolean) => void;
    setPrivateGrSelected: (id: number) => void;
    setpopupHeader: (header: [string, string, number]) => void;
    setShowPopup: (show: boolean) => void;
    setSelectedGrOut: (name: string) => void;
    setShowCancelQueuePopUp: (show: boolean) => void;
}) {
    return (
    <div className={`${style.joinStateBlock}`}>
        {group.user_status === 'Đã tham gia' ? (
            <div className={style.joinedBlock}>
                <button className={style.buttonPost} 
                        onClick={() => {
                            HandlePostGroup(group.Link.replace("groups/", ""));
                        }}>
                        <HiOutlinePencilSquare size={20}/>
                </button>
                <button className={style.buttonOutGr}
                        onClick={() => {
                            setSelectedGrOut(group.Name); 
                            setShowPopup(true);}
                        }>
                        <IoExitOutline size={20}/>
                </button> {/* onclick */}
            </div>
        // chưa tham gia
        ) : group.user_status === 'Chưa tham gia' ? (
            <div className={`${style.BlockRow} ${style.joinGrButton}`}
                onClick={() => {
                    {if (group.Status !== "Hoạt động") {
                        setPrivateGrSelected(group.id);
                        setShowPrivateGrQues(true);
                        setpopupHeader([group.Name, group.Status, group.Number_Of_Posts]);
                    } else {
                        setShowLoading(true);
                        UpdateGrState(group.Link);
                    }
                    }}}>
                <IoEnterOutline size={20}/>
            </div>
        // hàng đợi
        ) : group.user_status === 'Chờ duyệt' ? (
            <div className={`${style.BlockRow}`}>
                {/* them list danh sách các nhóm trong queue thay phan compare */}
                <div className={style.BlockRow}>
                    <button className={style.buttonOutGr} 
                            style={{marginRight: '10px'}}
                            onClick={() => {setShowCancelQueuePopUp(true); setSelectedGrOut(group.Name)}}>
                        <MdClose size={20}/>
                    </button>
                    {/* <div className={style.BlockRow}>
                        <div className={`${style.BlockRow} ${style.onQueue}`}>
                            <HiMiniQueueList style={{marginRight: '7px'}} className={style.ic}/>
                            <p style={{paddingTop: '2px'}}>Chờ duyệt</p>
                        </div>
                    </div> */}
                </div>
            </div>
        ) : (
            <p className={style.errorJoin}>Đã hết hạn</p>
        )}
    </div>
    )
}