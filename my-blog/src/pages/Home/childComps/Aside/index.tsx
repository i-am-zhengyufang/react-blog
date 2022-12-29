import InfoCard from "./InfoCard";
import ClockCard from "./ClockCard";
import TagCard from "components/TagCard";
import ClassesCard from "components/ClassesCard";

interface IProps {
  style?: object;
  className?: string;
}

const Aside: React.FC<IProps> = ({ style, className }) => {
  return (
    <aside style={style} className={className}>
      <InfoCard />
      <ClockCard />
      <TagCard />
      <ClassesCard />
    </aside>
  );
};

export default Aside;
