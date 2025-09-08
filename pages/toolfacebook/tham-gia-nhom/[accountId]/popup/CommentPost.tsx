import React from "react";
import { BiLike } from "react-icons/bi";
import { FaSmile } from "react-icons/fa";
import { FaCamera, FaHeart, FaImage, FaRegComment } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import style from "./popup.module.css";

interface FullscreenCommentProps {
    isOpen: boolean;
    onClose: () => void;
    headBar?: React.ReactNode;
    comment?: React.ReactNode;
}

export default function CommentPostPopup({
    isOpen,
    onClose,
    headBar,
    comment,
    }: FullscreenCommentProps) {
    if (!isOpen) return null;

    return (
        <div
        className={style.fullscreenPopup}
        onClick={(e) => e.stopPropagation()}
        >
        <div
            className={style.PopupCommentBoxContent}
            onClick={(e) => e.stopPropagation()} // chặn click ra ngoài đóng
        >
            <div id="commentContainer" className={style.commentContainer}>
                <div id="headBar" className={`${style.headBarComment} ${style.BlockRow}`}>
                <p className={style.commentTitle}>Bình luận</p>
                <button
                    id="closeButton"
                    className={style.closeButtonComment}
                    onClick={onClose}
                >
                    <MdClose size={24} />
                </button>
                </div>
                
                <div id="body" className={style.commentBoxBody}>
                {/* Bài viết gốc */}
                <div className={style.originalPost}>
                    {headBar}
                    <div className={style.postActions}>
                        <button className={style.postActionButton}>
                            <BiLike size={30} className={style.actionIcon} />
                            <span>Thích</span>
                        </button>
                        <button className={style.postActionButton}>
                            <FaRegComment size={30} className={style.actionIcon} />
                            <span>Bình luận</span>
                        </button>
                        {/* <button className={style.postActionButton}>
                            <BiShare className={style.actionIcon} />
                            <span>Chia sẻ</span>
                        </button> */}
                    </div>
                </div>
                
                {/* Danh sách bình luận */}
                <div className={style.commentsList}>
                    <div className={style.commentItem}>
                    <div className={style.commentAvatar}></div>
                    <div className={style.commentContent}>
                        <div className={style.commentHeader}>
                        <span className={style.commentAuthor}>Nguyễn Văn A</span>
                        <span className={style.commentTime}>2 giờ trước</span>
                        </div>
                        <div className={style.commentText}>
                        Bài viết rất hay và ý nghĩa! Cảm ơn bạn đã chia sẻ.
                        </div>
                        <div className={style.commentActions}>
                        <button>Thích</button>
                        <button>Phản hồi</button>
                        <span>12</span>
                        </div>
                    </div>
                    </div>
                    
                    <div className={style.commentItem}>
                    <div className={style.commentAvatar}></div>
                    <div className={style.commentContent}>
                        <div className={style.commentHeader}>
                        <span className={style.commentAuthor}>Trần Thị B</span>
                        <span className={style.commentTime}>1 giờ trước</span>
                        </div>
                        <div className={style.commentText}>
                        Mình hoàn toàn đồng ý với quan điểm này. Hy vọng sẽ có thêm nhiều bài viết tương tự!
                        </div>
                        <div className={style.commentActions}>
                        <button>Thích</button>
                        <button>Phản hồi</button>
                        <span>5</span>
                        </div>
                        
                        {/* Phản hồi comment */}
                        <div className={style.commentReply}>
                        <div className={style.commentItem}>
                            <div className={style.commentAvatar}></div>
                            <div className={style.commentContent}>
                            <div className={style.commentHeader}>
                                <span className={style.commentAuthor}>Username</span>
                                <span className={style.commentTime}>30 phút trước</span>
                            </div>
                            <div className={style.commentText}>
                                Cảm ơn bạn đã ủng hộ!
                            </div>
                            <div className={style.commentActions}>
                                <button>Thích</button>
                                <button>Phản hồi</button>
                                <span>2</span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                    <div className={style.commentItem}>
                    <div className={style.commentAvatar}></div>
                    <div className={style.commentContent}>
                        <div className={style.commentHeader}>
                        <span className={style.commentAuthor}>Lê Văn C</span>
                        <span className={style.commentTime}>15 phút trước</span>
                        </div>
                        <div className={style.commentText}>
                        Có ai có thêm thông tin gì về vấn đề này không?
                        </div>
                        <div className={style.commentActions}>
                        <button>Thích</button>
                        <button>Phản hồi</button>
                        <span>0</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                
                {/* Ô nhập bình luận */}
                <div className={style.commentInputContainer}>
                <div className={style.commentAvatar}></div>
                <div className={style.inputWrapper}>
                    <input 
                    type="text" 
                    placeholder="Viết bình luận..." 
                    className={style.commentInput}
                    />
                    <div className={style.commentIcons}>
                    <button className={style.commentIconButton}>
                        <FaSmile size={18} />
                    </button>
                    <button className={style.commentIconButton}>
                        <FaCamera size={18} />
                    </button>
                    <button className={style.commentIconButton}>
                        <FaImage size={18} />
                    </button>
                    <button className={style.commentIconButton}>
                        <FaHeart size={18} />
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    );
}