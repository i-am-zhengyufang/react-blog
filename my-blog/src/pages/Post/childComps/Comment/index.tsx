import EditBox from "components/EditBox";
import CommentList from "components/CommentList";
import { getCommentList } from "@/api";
import { useEffect, useState } from "react";
import { PostContext, CommentContext } from "@/context";
import { useContext } from "react";

const Comment: React.FC = () => {
  const [list, setList] = useState([]);
  const post_id = useContext(PostContext);

  let func = async () => {
    const list = await getCommentList({ id: post_id });
    setList(list);
  };
  useEffect(() => {
    func();
  }, []);

  return (
    <CommentContext.Provider value={func}>
      <EditBox post_id={post_id} />
      <CommentList list={list} />
    </CommentContext.Provider>
  );
};

export default Comment;
