import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import { FaCamera, FaHeart, FaImage, FaRegComment } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { MdClose, MdPublic } from "react-icons/md";
import ReactionIcons from "../../components/reactionIcons";
import style from "./popup.module.css";

interface FullscreenCommentProps {
    isOpen: boolean;
    onClose: () => void;
    headBar?: React.ReactNode;
    comment?: React.ReactNode;
    idCmtBox?: number;
}

export default function CommentPostPopup({
    isOpen,
    onClose,
    headBar,
    idCmtBox,
    }: FullscreenCommentProps) {
    if (!isOpen) return null;

    // Gọi API lấy danh sách bài đăng cũ
    const [posts, setPosts] = useState<any[]>([]); // ✅ Khởi tạo posts là mảng rỗng
    const [comments, setComments] = useState<any[]>([]); // ✅ State để lưu comments của post cụ thể
    const [content, setContent] = useState<string | null>(null); // ✅ State để lưu nội dung bài viết gốc

    useEffect(() => {
        fetch(`http://localhost:3003/api/posts`)
        .then(response => response.json())
        .then(data => {
            const allPosts = data.data || data;
            setPosts(allPosts); // ✅ Set posts ngay khi có data
            
            // ✅ Lọc comments từ post có id trùng với idCmtBox
            if (idCmtBox && allPosts.length > 0) {
                const targetPost = allPosts.find((post: any) => post.id === idCmtBox);
                if (targetPost && targetPost.comments) {
                    setComments(targetPost.comments);
                    setContent(targetPost.content); // Cập nhật nội dung bài viết gốc
                } else {
                    setComments([]); // Không có comments
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setComments([]); // Reset comments nếu có lỗi
        });
    }, [idCmtBox]); // ✅ Chạy lại khi idCmtBox thay đổi

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
                    <div>
                        <div className={`${style.BlockRow} ${style.postHeader}`}>
                            <div className={style.userInfo}>
                                <div className={style.userAvatar}></div>
                                <div className={style.userDetails}>
                                    <p className={style.username}>Username</p>
                                    <div className={`${style.postTime} ${style.BlockRow}`}>
                                        <p>3 giờ trước</p>
                                        <div><GoDotFill size={5} /></div>
                                        <div><MdPublic size={20} /></div>
                                    </div>
                                </div>
                            </div>
                            <BsThreeDots size={20} className={style.moreOptions} />
                        </div>
                        <div className={style.postContent}>
                            <div>{content}</div>
                        </div>
                        <div className={style.postStats}>
                            <div className={style.reactionCount}>
                                <div className={style.reactionIcons}>
                                    <span className={style.likeIcon}></span>
                                    <span className={style.favorIcon}></span>
                                </div>
                                <span>100</span>
                            </div>
                            <div className={`${style.commentShareCount} ${style.BlockRow}`}>
                                <div style={{ marginRight: '8px' }}>{comments.length} bình luận</div>
                                <div>99 lượt chia sẻ</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.postActions}>
                        <button className={style.postActionButton}>
                            <BiLike size={25} className={style.actionIcon} />
                            <span>Thích</span>
                        </button>
                        <button className={style.postActionButton}>
                            <FaRegComment size={25} className={style.actionIcon} />
                            <span>Bình luận</span>
                        </button>
                    </div>
                </div>
                
                {/* Danh sách bình luận */}
                <div className={style.commentsList}>
                    {comments.length > 0 ? (
                        comments.map((comment: any, index: number) => (
                            <div key={comment.id || index} className={`${style.commentItem} ${style.BlockRow}`}>
                                <div className={style.commentAvatar}></div>
                                <div className={style.BlockColumn}>
                                    <div className={style.commentContent}>
                                        <div className={style.commentHeader}>
                                            <span className={style.commentAuthor}>{comment.user || 'Người dùng ẩn danh'}</span>
                                        </div>
                                        <div className={style.commentText}>
                                            {comment.content || comment.text || 'Nội dung comment'}
                                        </div>
                                    </div>
                                    <div className={style.commentActions} style={{marginLeft: '12px'}}>
                                        <span className={style.commentTime}>{comment.time || 'Vừa xong'}</span>
                                        <button>Thích</button>
                                        <button>Phản hồi</button>
                                        <div><ReactionIcons /></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#65676b' }}>
                            <p>Chưa có bình luận nào</p>
                            <p>Hãy là người đầu tiên bình luận!</p>
                        </div>
                    )}
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