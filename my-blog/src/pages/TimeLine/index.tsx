import s from "./index.module.styl";
import PageTitle from "components/PageTitle";
import { Skeleton, Timeline } from "antd";
import { timelinedotColor } from "@/utils/constant";
import { formatDate } from "@/utils/common";
import { useRequest } from "@/utils/hooks";
import { getTimelineList } from "@/api";

const TimeLine: React.FC = () => {
  const { data, isLoading } = useRequest(getTimelineList);

  return (
    <div className={s.timeline}>
      <PageTitle title="时间轴" />
      <Timeline mode="alternate" className="timelineContent">
        {!isLoading ? (
          data.map((item, index) => {
            const color = timelinedotColor[index % 5];
            return (
              <Timeline.Item
                key={item.id}
                color={color}
                style={{ color }}
                label={formatDate(item.time)}
              >
                {item.content}
              </Timeline.Item>
            );
          })
        ) : (
          <Skeleton paragraph={{ rows: 8 }} />
        )}
      </Timeline>
      );
    </div>
  );
};

export default TimeLine;
