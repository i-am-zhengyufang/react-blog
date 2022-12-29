import Card from "components/Card";
import Icon from "components/Icon";
import { useNavigate } from "react-router-dom";
import s from "./index.module.styl";
import { useRequest } from "@/utils/hooks";
import { getTagList } from "@/api";

interface IProps {
  isStatic?: boolean;
  showHeadline?: boolean;
}

const TagCard: React.FC<IProps> = ({ isStatic, showHeadline = true }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useRequest(getTagList);

  return (
    <Card className={s.tagCard} isStatic={isStatic} loading={isLoading}>
      {showHeadline && (
        <div className={s.headerInfo}>
          <Icon icon="tags" className={s.icon} />
          <span className={s.text}>标签云</span>
        </div>
      )}
      <div className={s.tagCloud}>
        {data &&
          data?.map((item) => (
            <span
              style={{ color: item.color }}
              key={item.id}
              onClick={() =>
                navigate(`/articleFilterList?tag=${item.name}`, {
                  state: { id: item.id },
                })
              }
            >
              {item.name}
            </span>
          ))}
      </div>
    </Card>
  );
};

export default TagCard;
