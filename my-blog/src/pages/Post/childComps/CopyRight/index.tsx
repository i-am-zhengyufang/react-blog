import s from "./index.module.styl";
import { name, siteTitle } from "@/utils/constant";
import Icon from "components/Icon";
import copy from "copy-to-clipboard";
import { message } from "antd";

const CopyRight: React.FC = () => {
  const copyUrl = () => {
    if (copy(url)) message.success("复制成功");
  };
  const url = window.location.href;
  return (
    <div className={s.copyRight}>
      <div className={s.author}>
        <span className={s.copyrightMeta}>文章作者：</span>
        <span>{name}</span>
      </div>
      <div className={s.link}>
        <span className={s.copyrightMeta}>文章链接：</span>
        <span>{url}</span>
        <Icon icon="copy" className={s.icon} click={copyUrl} />
      </div>
      <div className={s.notice}>
        <span className={s.copyrightMeta}>版权声明：</span>
        <span className={s.text}>
          本站所有文章除特别声明外，均采用&nbsp;
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            className={s.copyrightName}
            rel="noreferrer"
          >
            CC BY-NC-SA 4.0
          </a>
          &nbsp;许可协议，转载请注明来自&nbsp;
          <a
            href="https://zhengyufang.top"
            target="_blank"
            className={s.copyrightName}
            rel="noreferrer"
          >
            {siteTitle}
          </a>
          &nbsp;!
        </span>
      </div>
    </div>
  );
};

export default CopyRight;
