import { Pagination } from "antd";
import React from "react";

interface IProps {
  pageNo: number;
  pageSize?: number;
  total: number;
  setPageNo: Function;
  setPageSize: Function;
  backToTop: Function;
}

const MyPagination: React.FC<IProps> = ({
  pageNo,
  pageSize = 4,
  total = 0,
  setPageNo,
  setPageSize,
  backToTop,
}) => {
  const onChange = (pageNo: number, pageSize) => {
    setPageNo(pageNo);
    setPageSize(pageSize);
    backToTop();
  };
  return (
    <>
      {total > pageSize ? (
        <Pagination
          current={pageNo}
          total={total}
          pageSize={pageSize}
          pageSizeOptions={[4, 6, 8]}
          showSizeChanger={true}
          showQuickJumper={true}
          onChange={onChange}
        ></Pagination>
      ) : null}
    </>
  );
};

export default MyPagination;
