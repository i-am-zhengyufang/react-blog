import PostTop from "./childComps/PostTop";
import CopyRight from "./childComps/CopyRight";
import MarkDownNavBar from "./childComps/MarkDownNavBar";
import Comment from "./childComps/Comment";
import MarkDown from "components/MarkDown";

import s from "./index.module.styl";
import { useParams } from "react-router-dom";

import { useRequest } from "@/utils/hooks";
import { getArticleDetail } from "@/api";
import { Drawer, FloatButton, Skeleton } from "antd";
import { PostContext } from "@/context";
import Icon from "components/Icon";
import { useState } from "react";

const Post: React.FC = () => {
  const { id } = useParams();

  let { data, isLoading } = useRequest(getArticleDetail, id, [id]);
  const [open, setOpen] = useState(false);

  return (
    <PostContext.Provider value={id}>
      <div className={s.post}>
        <FloatButton
          className={s.cateBtn}
          onClick={() => setOpen(true)}
          icon={<Icon icon="category" />}
          style={{ left: "1%", top: "50%" }}
        />
        ;
        <PostTop
          title={data?.title}
          category={data?.category}
          tags={data?.tags}
          time={data?.time}
        />
        <div className={s.postContent}>
          <div className={s.asideNavBar}>
            <MarkDownNavBar content={data?.content} />
          </div>
          <div className={s.contentInner}>
            {isLoading ? (
              <Skeleton paragraph={{ rows: 15 }} />
            ) : (
              <MarkDown content={data?.content} />
            )}

            <CopyRight />
            <Comment />
          </div>
        </div>
      </div>
      <Drawer placement="bottom" onClose={() => setOpen(false)} open={open}>
        <MarkDownNavBar content={data?.content} />
      </Drawer>
    </PostContext.Provider>
  );
};

export default Post;
