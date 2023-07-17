import React, { useCallback, useEffect, useRef, useState } from "react";
import Icon from "components/Icon";
import s from "./index.module.styl";
import { message, Modal } from "antd";
import { getSearch } from "@/api";
import SearchBox from "./childComps/SearchBox";
import SearchList from "./childComps/SearchList";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setModalClose } from "@/redux/slices/modalOpenSlice";

const Search: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(); //不加这个又警告
  const isModalOpen = useSelector((state: RootState) => state.modalOpen);

  const dispatch = useDispatch();
  const [isclsShow, setisclsShow] = useState(false);
  const [isShowPane, setisShowPane] = useState(false);

  const [searchArr, setsearchArr] = useState([]);
  const [kws, setkws] = useState(""); //只有在handleSearch时才更新

  const [searchHistorys, setsearchHistorys] = useState(
    JSON.parse(localStorage.getItem("searchHistorys")) || []
  );

  useEffect(() => {
    localStorage.setItem(
      "searchHistorys",
      JSON.stringify(searchHistorys || [])
    );
  }, [searchHistorys]);

  // 这个文件代码写的巨乱呜呜呜，老是为出现监听onInput 导致重新渲染结果list跟着更新，
  // 然后vscode自个就给出修复我弄出来的 然后必须添加依赖性要不然一直不变了

  const clearHistorys = useCallback(() => {
    setsearchHistorys([]);
  }, []);

  const handleSearch = useCallback(async () => {
    let kw = inputRef.current!.value.trim();
    if (kw === "") message.warning("输入不能为空");
    else {
      let data = await getSearch(kw);
      setsearchArr(data);
      setisShowPane(true);
      setkws(kw);

      const idx = searchHistorys.indexOf(kw);
      if (idx !== -1) {
        // 这里建议搞个if else 虽然两个都要插入到头部 而不是出现两次set要不然又会出现更新问题
        setsearchHistorys((pre: any[]) => {
          pre.splice(idx, 1);
          pre.unshift(kw);
          return pre;
        });
      } else setsearchHistorys((pre) => [kw, ...pre]);
    }
  }, [searchHistorys]);

  const onInput = (e) => {
    const isempty = e.target.value.trim() === "";
    setisclsShow(!isempty);
    if (isempty) setisShowPane(false);
    // 由于为空时，会更新showPane，比如我输入123又删掉那么此时
    // 应该一直显示历史记录，显然无需更新list，因此我用了callback
    // 和memo
  };
  const onClear = () => {
    setisShowPane(false);
    inputRef.current!.value = "";
  };

  // const handleSearchHis = (v) => {
  //   inputRef.current.value = v;
  //   handleSearch();
  // };
  const handleSearchHis = useCallback(
    (v) => {
      setisclsShow(true);
      inputRef.current!.value = v;
      handleSearch();
    },
    [handleSearch]
  );

  return (
    <div className={s.search}>
      {/* 存在每次搜索modal抖动的bug....尚待解决 */}
      {/* getContainer={false}表示挂载到当前dom，要不然.serachbox .line无效 */}
      <Modal
        title="搜索"
        className={s.modal}
        open={isModalOpen}
        footer={null}
        onCancel={() => dispatch(setModalClose())}
        getContainer={false}
        keyboard={false}
      >
        <SearchBox
          ref={inputRef}
          isclsShow={isclsShow}
          onInput={onInput}
          onClear={onClear}
          handleSearch={handleSearch}
        />
        <div className={s.line}>
          <Icon icon="turnip" className={s.icon} />
        </div>
        <SearchList
          kws={kws}
          isShowPane={isShowPane}
          searchArr={searchArr}
          searchHistorys={searchHistorys}
          clearHistorys={clearHistorys}
          handleSearchHis={handleSearchHis}
        />
      </Modal>
    </div>
  );
};

export default Search;
