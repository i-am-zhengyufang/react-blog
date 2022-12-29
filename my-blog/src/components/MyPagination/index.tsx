import { Pagination } from "antd";
import React from "react";
import s from "./index.module.styl";

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
        <div className={s.pagination}>
          <Pagination
            current={pageNo}
            total={total}
            pageSize={pageSize}
            pageSizeOptions={[3, 6, 9]}
            showSizeChanger={true}
            showQuickJumper={true}
            onChange={onChange}
          ></Pagination>
        </div>
      ) : null}
    </>
  );
};

export default MyPagination;
