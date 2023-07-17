import Card from "components/Card";
import s from "./index.module.styl";
//不需要了： import imgUrl from "/assets/imgs/avatar.jpg";
import { name, desc } from "@/utils/constant";
import { Link } from "react-router-dom";
import { socialList } from "./config";
import { useRequest } from "@/utils/hooks";
import { getArticleLen, getCateLen, getTagLen } from "@/api";

const InfoCard: React.FC = () => {
  // const {
  //   data: { total: articlelen },
  // } = useRequest(getArticleLen);
  // 本来可以这样解构的，但是因为data是undefined，报错undefined，没有total属性，奶奶的只能给它默认为数组

  const { total: articlelen } = useRequest(getArticleLen).data || {};
  const { total: catelen } = useRequest(getCateLen).data || {};
  const { total: taglen } = useRequest(getTagLen).data || {};
  const list = [
    {
      name: "文章",
      to: "/",
      num: articlelen,
    },
    {
      name: "分类",
      to: "/classes",
      num: catelen,
    },
    {
      name: "标签",
      to: "/tags",
      num: taglen,
    },
  ];

  return (
    <Card className={s.infoCard}>
      <img className={s.avatar} src="/assets/imgs/avatar.jpg" alt="" />
      <div className={s.name}>{name}</div>
      <div className={s.desc}>{desc}</div>
      <div className={s.infoList}>
        {list.map((item, index) => {
          return (
            <Link key={index} to={item.to}>
              <div className={s.headline}>{item.name}</div>
              <div className={s.num}>{item.num}</div>
            </Link>
          );
        })}
      </div>
      <div className={s.socialList}>
        {socialList.map((item, index) => {
          return (
            <a key={index} href={item.to} target="_blank" rel="noreferrer">
              <svg className={s.icon} aria-hidden="true">
                <use xlinkHref={`#icon-${item.icon}`}></use>
              </svg>
            </a>
          );
        })}
      </div>
    </Card>
  );
};

export default InfoCard;
