export interface Reply {
  id: number;
  to: string;
  content: string;
  userLinkFb: string;
  author: string;
  authorId: string;
  timestamp: string;
  replyToAuthor?: string;
  id_facebookReply?: string;
  facebookReplyUrl?: string;
}

export interface Comment {
  idMongodb?: string;
  id: number;
  to: string;
  postId: number;
  content: string;
  userLinkFb: string;
  author: string;
  authorId: string;
  timestamp: string;
  replies?: Reply[];
  id_facebookComment?: string;
  facebookCommentUrl?: string;
}

export interface Post {
  idMongodb?: string;
  id: number;
  content: string;
  to: string;
  author: string;
  authorId: string;
  timestamp: string;
  images?: { name: string; url: string }[];
  comments?: Comment[];
  facebookUrl?: string;
  isPosted: boolean;
}

export interface ShowReplyModal {
  postId: number;
  commentId: number;
  replyToAuthor?: string;
  replyId?: number;
  facebookCommentId?: string;
  facebookReplyId?: string;
}

export interface WebSocketData {
  type:
    | "post_sent"
    | "URL_post"
    | "comment"
    | "reply_comment"
    | "comment_byB"
    | "reply_comment_byB"
    | "comment_result"
    | "reply_comment_result"
    | "reply_reply_comment_result";
  postId?: string;
  URL?: string;
  authorName?: string;
  authorId?: string;
  timestamp?: string;
  content?: string;
  comment_id?: string;
  replyId?: string | number;
  commentId?: string;
  commentFbId?: string;
  attachments?: { name: string; url: string; type?: string }[];
  metadata?: {
    source?: string;
    category?: string;
  };
  to?: string;
  userLinkFb?: string;
  linkUserReply?: string;
  linkUserComment?: string;
}
