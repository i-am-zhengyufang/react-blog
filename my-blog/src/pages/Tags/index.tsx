import TagCard from "components/TagCard";
import PageTitle from "components/PageTitle";

const Tags: React.FC = () => {
  return (
    <>
      <PageTitle title="标签" />
      <TagCard isStatic={true} showHeadline={false}></TagCard>
    </>
  );
};

export default Tags;
