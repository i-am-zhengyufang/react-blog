import { useNavigate, NavLink } from "react-router-dom";
import { getNavList } from "./config";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";

import { navTitle } from "@/utils/constant";
import { throttle } from "@/utils/common";
import { useEventListener } from "@/utils/hooks";
import s from "./index.module.styl";

import type { MenuProps } from "antd";
import { Drawer, Dropdown, Menu, Space } from "antd";

import { useDispatch } from "react-redux";
import { setModalOpen } from "@/redux/slices/modalOpenSlice";
import Icon from "components/Icon";

interface navProps {
  navShow?: boolean;
  setNavShow?: Function;
  mode?: number;
  setMode?: Function;
}

interface MenuItemProps {
  name: string;
  to: string;
  icon: string;
  subMenu?: MenuItemProps[];
}

const navArr = getNavList();

const getItem = ({ name, to, icon, subMenu }: MenuItemProps) => {
  const children = subMenu?.map((item: MenuItemProps) => ({
    label: item.name,
    key: item.to,
    icon: <Icon icon={item.icon} />,
  }));

  return {
    label: name,
    key: to,
    icon: <Icon icon={icon} />,
    children,
  };
};

const bucketitems: MenuProps["items"] = [
  {
    key: "bright",
    icon: <Icon icon="day" className={s.icon} />,
    label: "白天模式",
  },
  {
    key: "dark",
    icon: <Icon icon="night" className={s.icon} />,
    label: "黑暗模式",
  },
];

const items = navArr.map((item: MenuItemProps) => {
  return getItem(item);
});

const HeaderNav: React.FC<navProps> = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [navShow, setNavShow] = useState(true);
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(true);

  useEffect(() => {
    window.document.documentElement.setAttribute(
      "data-theme",
      day ? "bright" : "dark"
    );
    // 直接在handleChangeMode修改有时候拿不到最新day
  }, [day]);
  const onMouseEnter = () => {
    setDropdown(true);
  };
  const onMouseLeave = () => {
    setDropdown(false);
  };
  const onClick = (params) => {
    setOpen(false);
    navigate(params.key);
  };
  const onClickMenu = (params) => {
    window.document.documentElement.setAttribute("data-theme", params.key);
  };
  const handleChangeMode = () => {
    setDay(!day);
  };

  let pre = document.documentElement.scrollTop || document.body.scrollTop;
  useEventListener(
    "scroll",
    throttle((event) => {
      let now = document.documentElement.scrollTop || document.body.scrollTop;
      let up = pre >= now;
      pre = now;
      // 下滑则now>pre 为false 不显示nav
      setNavShow(up);
    }, 500)
  );
  return (
    <>
      <nav className={classNames(s.navWrap, { [s.hidden]: !navShow })}>
        <h2 className={s.navTitle} onClick={() => navigate("/")}>
          {navTitle}
        </h2>
        <div className={s.webNav}>
          <div className={s.navItem} onClick={() => dispatch(setModalOpen())}>
            <Icon icon="search" className={s.icon} />
            <span>搜索</span>
          </div>
          {navArr.map((item, index) => (
            <Fragment key={index}>
              {item.subMenu ? (
                <div
                  className={s.dropdownNav}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <div className={s.navItem}>
                    <Icon icon={item.icon} />
                    <span>{item.name}</span>
                  </div>
                  <div
                    className={classNames(s.dropdownNavList, {
                      [s.show]: dropdown,
                    })}
                  >
                    <div className={s.dropdownNavContent}>
                      {item.subMenu.map((item, index) => (
                        <NavLink to={item.to} key={index}>
                          <Icon icon={item.icon} />
                          <span>{item.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink to={item.to} key={index} className={s.navItem}>
                  <Icon icon={item.icon} />
                  <span>{item.name}</span>
                </NavLink>
              )}
            </Fragment>
          ))}
          <div className={s.navItem} onClick={() => handleChangeMode()}>
            <Icon icon={day ? "day" : "night"} className={s.icon} />
            <span>昼夜模式</span>
          </div>
        </div>
      </nav>
      <div className={s.mobileNav}>
        <Icon
          icon="menu"
          className={s.icon}
          click={() => {
            setOpen(true);
          }}
        />
        <Dropdown
          menu={{ items: bucketitems, onClick: onClickMenu }}
          trigger={["click"]}
        >
          <Space>
            <Icon icon="bucket" className={s.icon} />
          </Space>
        </Dropdown>
        <Icon
          icon="sousuo"
          className={s.icon}
          click={() => dispatch(setModalOpen())}
        />
        <Drawer
          width={200}
          placement="left"
          onClose={() => setOpen(false)}
          open={open}
        >
          <Menu
            onClick={onClick}
            style={{ width: 150 }}
            mode="inline"
            items={items}
          />
        </Drawer>
      </div>
    </>
  );
};

export default HeaderNav;
