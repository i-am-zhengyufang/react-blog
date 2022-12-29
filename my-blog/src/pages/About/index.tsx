import PageTitle from "components/PageTitle";
import MarkDown from "components/MarkDown";
import Switch from "./Switch";
import { useToggle, useRequest } from "@/utils/hooks";
import s from "./index.module.styl";
import { getAboutList } from "@/api";
import { Skeleton } from "antd";

const About: React.FC = () => {
  const [state, { toggle, setLeft, setRight }] = useToggle();

  const { data, isLoading } = useRequest(getAboutList);
  return (
    <>
      <PageTitle title="关于" />
      <div className={s.markdownCard}>
        {!isLoading ? (
          <>
            <Switch
              state={state}
              toggle={toggle}
              setLeft={setLeft}
              setRight={setRight}
              className={s.switch}
            />
            {!state ? (
              <MarkDown content={data[0].content} />
            ) : (
              <MarkDown content={data[1].content} />
            )}
          </>
        ) : (
          <Skeleton paragraph={{ rows: 6 }} />
        )}
      </div>
    </>
  );
};

export default About;
