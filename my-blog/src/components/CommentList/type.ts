export interface CommentItemProps {
    comment_id: string;
    reply_id?: string;
    to_reply_id?: string;
    nickname: string;
    to_user_name?: string;
    link: string;
    avatar: string;
    is_author: number;
    content: string;
    time: string;
    className?: string;
}