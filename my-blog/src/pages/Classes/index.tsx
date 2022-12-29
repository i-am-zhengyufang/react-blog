import PageTitle from "components/PageTitle";
import ClassesCard from "components/ClassesCard";

const Classes: React.FC = () => {
  return (
    <>
      <PageTitle title="分类" />
      <ClassesCard isStatic={true} showHeadline={false} />
    </>
  );
};

export default Classes;
