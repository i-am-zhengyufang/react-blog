import classnames from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import s from "./index.module.styl";
import Icon from "components/Icon";
import EditBox from "components/EditBox";
import { useState } from "react";
import MarkDown from "components/MarkDown";
import { CommentItemProps } from "./type";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const CommentItem: React.FC<CommentItemProps> = ({
  comment_id,
  to_user_name,
  nickname,
  link,
  avatar,
  is_author,
  content,
  time,
  className,
  reply_id,
}) => {
  const [isShow, setisShow] = useState(false);
  const msgs = {
    comment_id,
    is_reply_reply: reply_id !== undefined,
    to_reply_id: reply_id,
    to_user_name: nickname,
  };

  return (
    <div className={classnames(s.commentItem, className)}>
      <div className={s.commentMain}>
        <img
          className={s.leftImg}
          src={avatar ? avatar : "https://q1.qlogo.cn/g?b=qq&nk=666&s=1"}
          alt=""
        />
        <div className={s.rightArea}>
          <div className={s.topInfo}>
            <a
              href={link.substring(0, 4) === "http" ? link : "//" + link}
              className={s.nickname}
              target="_blank"
              rel="noreferrer"
            >
              {nickname}
              {is_author === 1 ? <span className={s.author}>作者</span> : ""}
            </a>
            <Icon
              className={s.icon}
              icon="reply"
              click={() => setisShow(!isShow)}
            />
          </div>
          <div className={s.contentBox}>
            {to_user_name ? (
              <span>
                回复 <span className={s.toUserName}>@ {to_user_name} :</span>
              </span>
            ) : (
              ""
            )}
            <MarkDown content={content} className={s.content}></MarkDown>
            <span className={s.time}>{dayjs(time).fromNow()}</span>
          </div>
        </div>
      </div>
      <EditBox
        isShow={isShow}
        setisShow={() => setisShow(false)}
        isReply={true}
        msgs={msgs}
      />
    </div>
  );
};

export default CommentItem;
