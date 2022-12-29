import PageTitle from "components/PageTitle";
import s from "./index.module.styl";
import SayCard from "./SayCard";
import { useRequest } from "@/utils/hooks";
import { getSayList } from "@/api";

const Say: React.FC = () => {
  const { data } = useRequest(getSayList);

  return (
    <div className={s.say}>
      <PageTitle title="闲言碎语" />
      <div className={s.sayMain}>
        {data &&
          data?.map(({ id, content, time }) => (
            <SayCard key={id} content={content} time={time} />
          ))}
      </div>
    </div>
  );
};

export default Say;
