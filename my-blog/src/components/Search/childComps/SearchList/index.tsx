import s from "./index.module.styl";
import Icon from "components/Icon";
import HighlightText from "../HighlightText";
import React from "react";
import { useNavigate } from "react-router-dom";
import { setModalClose } from "@/redux/slices/modalOpenSlice";
import { useDispatch } from "react-redux";
interface SearchArrType {
  id: number;
  title: string;
}
interface IProps {
  searchArr: Array<SearchArrType>;
  searchHistorys: Array<string>;
  clearHistorys: Function;
  isShowPane: boolean;
  handleSearchHis: Function;
  kws: string;
}

const SearchList: React.FC<IProps> = ({
  isShowPane,
  searchArr,
  searchHistorys,
  clearHistorys,
  handleSearchHis,
  kws,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const gotoPost = (id) => {
    dispatch(setModalClose());
    navigate(`/post/${id}`);
  };
  return (
    <>
      {isShowPane ? (
        searchArr.length !== 0 ? (
          <ul className={s.searchList}>
            {searchArr.map((item, index) => (
              <li
                key={index}
                className={s.item}
                onClick={() => gotoPost(item.id)}
              >
                <HighlightText
                  className={s.itemTitle}
                  text={item.title}
                  highlightText={kws}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.findTip}>暂时没有找到内容，换个词试试八</div>
        )
      ) : (
        <div className={s.searchHistory}>
          <div className={s.top}>
            <p>搜索历史</p>
            <Icon className={s.icon} icon="lajitong" click={clearHistorys} />
          </div>
          {searchHistorys.length !== 0 ? (
            <div className={s.tags}>
              {/* 这段绕的厉害，搞了半天 */}
              {searchHistorys.map((item, index) => {
                return (
                  <div
                    className={s.block}
                    key={index}
                    onClick={() => handleSearchHis(item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={s.empty}>暂无搜索历史</div>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(SearchList);
