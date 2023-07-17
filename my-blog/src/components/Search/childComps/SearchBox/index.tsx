import Icon from "components/Icon";
import React, { FormEventHandler, forwardRef } from "react";
import s from "./index.module.styl";

interface Iprops {
  isclsShow: boolean;
  onInput: FormEventHandler<HTMLInputElement>;
  onClear: Function;
  handleSearch: () => Promise<void>;
}

const SearchBox = forwardRef(
  ({ isclsShow, onInput, onClear, handleSearch }: Iprops, ref: any) => {
    const onKeyUp = (e) => {
      if (e.keyCode === 13) handleSearch();
    };

    return (
      <div className={s.searchBox}>
        <input
          ref={ref}
          placeholder="请输入关键字..."
          type="text"
          className={s.searchInput}
          onInput={onInput}
          onKeyUp={onKeyUp}
        />
        {isclsShow && (
          <Icon click={onClear} className={s.rightIcon} icon="clear" />
        )}
        <span className={s.searchBtn} onClick={handleSearch}>
          搜索
        </span>
      </div>
    );
  }
);

export default SearchBox;
