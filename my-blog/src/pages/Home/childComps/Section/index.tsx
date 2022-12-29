import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useRequest } from "@/utils/hooks";
import { getArticleList } from "@/api";

import PostCard from "./PostCard";
import MyPagination from "components/MyPagination";
import Card from "components/Card";

import { backToTop } from "@/utils/common";

interface IProps {
  style?: object;
  className?: string;
}

const Section: React.FC<IProps> = ({ style, className }) => {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const { data, isLoading } = useRequest(
    getArticleList,
    {
      pageNo,
      pageSize,
    },
    [pageNo, pageSize]
  );

  const navigate = useNavigate();
  const section = useRef(null);
  return (
    <section style={style} ref={section} className={className}>
      {/* 呜呜呜必须加data.result 因为useEffect执行时机仅为渲染后才请求数据
     通过更新data重新渲染的 */}
      {!isLoading ? (
        [
          // 服了这个老六了 一开始用div结果说{id,title}这些找不到，最后只能用数组包裹,必须加key哦
          data.result.map(({ id, title, content, time, tags, category }) => (
            <PostCard
              key={id}
              title={title}
              content={content}
              time={time}
              tags={tags}
              category={category}
              onClick={() => navigate(`/post/${id}`)}
            />
          )),
          <MyPagination
            key={0}
            pageNo={pageNo}
            pageSize={pageSize}
            total={data.total}
            setPageNo={setPageNo}
            setPageSize={setPageSize}
            scrollToTop={document.body.clientHeight}
            backToTop={() => backToTop(section.current)}
          />,
        ]
      ) : (
        <>
          <Card loading={true} />
          <Card loading={true} />
          <Card loading={true} />
          <Card loading={true} />
        </>
      )}
    </section>
  );
};

export default Section;
