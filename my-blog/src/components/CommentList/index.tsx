import { Skeleton } from "antd";
import { Fragment } from "react";
import CommentItem from "./CommentItem";
import s from "./index.module.styl";
import { CommentItemProps } from "./type";

interface IProps extends CommentItemProps {
  replys: Array<CommentItemProps>;
}
// 离谱了传递的参数一定是一个对象，因此我就算传递一个参数也要{}解构

const CommentList: React.FC<{ list: Array<IProps> }> = ({ list }) => {
  return (
    <>
      {list ? (
        list.map((item) => (
          <Fragment key={item.comment_id}>
            <CommentItem
              avatar={item.avatar}
              nickname={item.nickname}
              link={item.link || ""}
              content={item.content}
              is_author={item.is_author}
              time={item.time}
              comment_id={item.comment_id}
            />
            {item.replys &&
              item.replys.map((iii) => (
                <Fragment key={iii.reply_id}>
                  <CommentItem
                    className={s.reply}
                    comment_id={item.comment_id!}
                    avatar={iii.avatar}
                    nickname={iii.nickname}
                    link={iii.link || ""}
                    content={iii.content}
                    is_author={iii.is_author}
                    time={iii.time}
                    reply_id={iii.reply_id}
                    to_reply_id={iii.to_reply_id}
                    to_user_name={iii.to_user_name}
                  />
                </Fragment>
              ))}
          </Fragment>
        ))
      ) : (
        <Skeleton avatar />
      )}
    </>
  );
};

export default CommentList;
