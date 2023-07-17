import Card from "components/Card";
import Icon from "components/Icon";
import { useNavigate } from "react-router-dom";
import s from "./index.module.styl";
import { useRequest } from "@/utils/hooks";
import { getCateList } from "@/api";

interface IProps {
  isStatic?: boolean;
  showHeadline?: boolean;
}

const ClassesCard: React.FC<IProps> = ({ isStatic, showHeadline = true }) => {
  const { data, isLoading } = useRequest(getCateList);

  const navigate = useNavigate();
  return (
    <Card className={s.classesCard} isStatic={isStatic} loading={isLoading}>
      {showHeadline && (
        <div className={s.headerInfo}>
          <Icon icon="classes" className={s.icon} />
          <span className={s.text}>分类</span>
        </div>
      )}
      <div className={s.classes}>
        {/* 我一开始想着loading是true那么不会渲染插槽children，所以没加data&&结果报错了
        看来就算不渲染他还是一开始会执行这里的代码啊 */}
        {data &&
          data.map((item) => (
            <div
              className={s.classesItem}
              key={item.id}
              onClick={() =>
                navigate(`/articleFilterList?category=${item.name}`, {
                  state: { id: item.id },
                })
              }
            >
              <Icon icon="folder" className={s.icon} />
              <span className={s.name}>{item.name}</span>
              <span className={s.count}>{item.count}</span>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default ClassesCard;
