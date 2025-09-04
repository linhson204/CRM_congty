import { BiLike, BiShare } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import { FaCamera, FaHeart, FaImage, FaRegComment } from "react-icons/fa6";
import { MdClose, MdPublic } from "react-icons/md";
import style from "./popup.module.css";

interface FullscreenCommentProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CommentPostPopup({
    isOpen,
    onClose,
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
                    <div className={`${style.BlockRow} ${style.postHeader}`}>
                    <div className={style.userInfo}>
                        <div className={style.userAvatar}></div>
                        <div className={style.userDetails}>
                        <p className={style.username}>Username</p>
                        <div className={`${style.postTime} ${style.BlockRow}`}>
                            <p>3 giờ trước</p>
                            <div><MdPublic size={14} /></div>
                        </div>
                        </div>
                    </div>
                    <BsThreeDots size={20} className={style.moreOptions} />
                    </div>
                    
                    <div className={style.postContent}>
                    <p>Đây là nội dung bài viết gốc. Bài viết này đang nhận được nhiều bình luận từ cộng đồng.</p>
                    </div>
                    
                    <div className={style.postStats}>
                    <div className={style.reactionCount}>
                        <div className={style.reactionIcons}>
                        <span className={style.likeIcon}></span>
                        <span className={style.heartIcon}></span>
                        </div>
                        <span>100</span>
                    </div>
                    <div className={style.commentShareCount}>
                        <span>24 bình luận</span>
                        <span>10 lượt chia sẻ</span>
                    </div>
                    </div>
                    
                    <div className={style.postActions}>
                    <button className={style.postActionButton}>
                        <BiLike className={style.actionIcon} />
                        <span>Thích</span>
                    </button>
                    <button className={style.postActionButton}>
                        <FaRegComment className={style.actionIcon} />
                        <span>Bình luận</span>
                    </button>
                    <button className={style.postActionButton}>
                        <BiShare className={style.actionIcon} />
                        <span>Chia sẻ</span>
                    </button>
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