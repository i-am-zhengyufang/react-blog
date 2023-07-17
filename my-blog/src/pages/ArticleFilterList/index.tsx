import { useLocation, useNavigate } from "react-router-dom";
import PageTitle from "components/PageTitle";
import Icon from "components/Icon";
import s from "./index.module.styl";
import { formatDate, formatNum } from "@/utils/common";
import { useRequest } from "@/utils/hooks";
import { getArticleByCate, getArticleByTag } from "@/api";
import { Skeleton } from "antd";

const ArticleFilterList: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const search = new URLSearchParams(location.search);
  let title: string;
  let func: Function;
  const { id } = location.state as { id: number };

  // const title = search.get("category") || search.get("tag");
  if (search.get("category")) {
    title = search.get("category")!;
    func = getArticleByCate;
  } else {
    title = search.get("tag")!;
    func = getArticleByTag;
  }
  //也可以通过searchParams.get("xx");
  // 奶奶的如果我用if else if else分开useRequest则eslint报错说
  // React Hook “useRequest“ is called conditionally
  // 可能没有一个useRequest执行
  // 因此我只能通过func=的方式
  const { data, isLoading } = useRequest(func, id);

  return (
    <div className={s.articleFilterList}>
      <PageTitle title={title} />
      <div className={s.rowBarContainer}>
        {!isLoading ? (
          <>
            <div className={s.total}>
              共有<span> {data.length} </span>篇文章
            </div>
            {data.map((item) => (
              <div
                key={item.id}
                className={s.rowbar}
                onClick={() => navigate(`/post/${item.id}`)}
              >
                <div className={s.title}>{item.title}</div>
                <div className={s.info}>
                  <span className={s.left}>
                    <Icon icon="folder" className={s.icon} />
                    <span className={s.cate}>{item.category}</span>
                    <Icon icon="card-tag" className={s.icon} />
                    {item.tags!.map((item) => (
                      <span className={s.tag} key={item}>
                        {item}
                      </span>
                    ))}
                  </span>
                  <span className={s.right}>
                    <span className={s.date}>{formatDate(item.time)}</span>
                    <span className={s.num}>
                      约{formatNum(item.content.length)}字
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <Skeleton />
            <Skeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleFilterList;
