import s from "./index.module.styl";
import classnames from "classnames";
import { useContext, useEffect, useState } from "react";
import { useBoolean } from "@/utils/hooks";
import { Button, Form, FormInstance, Input, message } from "antd";
import MarkDown from "components/MarkDown";
import AdminLogin from "components/AdminLogin";
import Icon from "components/Icon";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { CommentContext } from "@/context";
import { insertComment, insertReply } from "@/api";
import { throttle, formatDate } from "@/utils/common";
import { getAdminInfo } from "@/redux/slices/commentInfoSlice";

import {
  setAvatar,
  setNickname,
  setEmail,
  setLink,
} from "@/redux/slices/commentInfoSlice";

interface IProps {
  isShow?: boolean;
  setisShow?: Function;
  isReply?: boolean;
  className?: string;
  post_id?: number;
  msgs: {
    comment_id: string;
    is_reply_reply: boolean;
    to_reply_id: string;
    to_user_name: string;
  };
}
const EditBox: React.FC<IProps> = ({
  isShow = true,
  setisShow,
  isReply = false,
  className,
  post_id,
  msgs,
}) => {
  const { TextArea } = Input;
  const [form] = Form.useForm<FormInstance>();
  const dispatch = useDispatch();
  const content = Form.useWatch("content", form) || "";
  const [open, setopen] = useState(false);

  const func: Function = useContext(CommentContext);

  const { avatar, email, nickname, link, role } = useSelector(
    (state: RootState) => ({
      avatar: state.commentInfo.avatar,
      email: state.commentInfo.email,
      nickname: state.commentInfo.nickname,
      link: state.commentInfo.link,
      role: state.commentInfo.role,
    })
  );

  useEffect(() => {
    // 不用useEffect就死活不渲染
    form.setFieldsValue({
      email,
      nickname,
      link,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, nickname, link]);
  useEffect(() => {
    // 每次刷新后 email name role全为空了，需要重新请求
    if (localStorage.getItem("token")) dispatch(getAdminInfo());
  }, []);
  const initialValues = {
    email,
    nickname,
    link,
  };
  const [showPre, { toggle: togglePre, setFalse: closePre }] =
    useBoolean(false);
  const onFinish = throttle(
    (values: any) => {
      if (content === "") {
        message.warning("请先写点什么哦");
        return;
      }
      const time = formatDate(); //dayjs参数为空时，获取当前时间
      const { nickname, email, link } = form.getFieldsValue(true);
      const is_author = role === "admin" ? 1 : 0;

      (async () => {
        let data: { msg: string };
        if (!isReply) {
          data = await insertComment({
            nickname,
            email,
            link,
            avatar,
            post_id,
            time,
            content,
            is_author,
          });
        } else {
          if (!msgs.is_reply_reply) {
            msgs.to_reply_id = "0";
            msgs.to_user_name = "";
          }
          data = await insertReply({
            comment_id: msgs.comment_id,
            nickname,
            time,
            content,
            email,
            avatar,
            link,
            to_reply_id: msgs.to_reply_id,
            to_user_name: msgs.to_user_name,
            is_author,
          });
          setisShow!();
        }
        const { msg } = data;
        message.success(msg);
        form.setFieldValue("content", "");
        func();
      })();
    },
    1000,
    true
  );
  const nicknameBlur = () => {
    // 也可以通过传递的e参数获取当前值
    const nickname = form.getFieldValue("nickname");
    if (nickname === "admin") {
      setopen(true);
    }
    dispatch(setNickname(nickname));
  };
  const emailBlur = () => {
    const reg = /^[1-9][0-9]+@qq.com$/;
    const email = form.getFieldValue("email");
    if (reg.test(email)) {
      const qq = email.split("@")[0];
      dispatch(setAvatar(`https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=640`));
    }
    dispatch(setEmail(email));
  };
  const linkBlur = () => {
    const link = form.getFieldValue("link");
    dispatch(setLink(link));
  };

  const placeholdertext = isReply
    ? `回复  @${msgs.to_user_name}`
    : "说点什么叭？支持markdown格式哦";
  return (
    <>
      <AdminLogin open={open} setopen={setopen} />
      {isShow && (
        <div className={classnames(className, s.editBox)}>
          <div className={s.commentBox}>
            <div className={s.avatar}>
              <img
                src={avatar ? avatar : "/assets/imgs/defaultAvatar.png"}
                alt=""
              />
            </div>
            <div className={s.rightArea}>
              <Form
                labelCol={{ span: 8 }}
                colon={false}
                form={form}
                name="comment"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={initialValues}
              >
                <div className={s.inputRows}>
                  <Form.Item
                    tooltip="最多只能输入20个字哦"
                    label="昵称"
                    name="nickname"
                    rules={[
                      { required: true, message: "昵称不能为空哦" },
                      {
                        pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                        message: "昵称只能由字母、数字组成",
                      },
                    ]}
                    className={s.inputValue}
                  >
                    <Input onBlur={nicknameBlur} maxLength={20} />
                  </Form.Item>
                  <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                      { required: true, message: "邮箱不能为空" },
                      { type: "email", message: "请输入合法的邮箱" },
                    ]}
                    className={s.inputValue}
                  >
                    <Input onBlur={emailBlur} maxLength={50} />
                  </Form.Item>
                  <Form.Item
                    labelAlign="left"
                    label="网站"
                    name="link"
                    rules={[
                      { type: "url", message: "请输入合法的url或者干脆空着哦" },
                    ]}
                    className={s.inputValue}
                  >
                    <Input onBlur={linkBlur} maxLength={50} />
                  </Form.Item>
                </div>
                <Form.Item name="content" className={s.TextArea}>
                  <TextArea
                    allowClear
                    placeholder={placeholdertext}
                    showCount
                    maxLength={500}
                    rows={4}
                  />
                </Form.Item>
                <div className={s.commentBtns}>
                  <Form.Item className={s.commentBtn}>
                    <Button onClick={() => togglePre()}>预览</Button>
                  </Form.Item>
                  <Form.Item className={s.commentBtn}>
                    <Button type="primary" htmlType="submit">
                      {isReply ? "回复" : "发布"}
                    </Button>
                  </Form.Item>
                </div>
              </Form>
              <div
                className={classnames(s.preview, {
                  [s.previewHidden]: !showPre,
                })}
              >
                <div className={s.closeBtn} onClick={() => closePre?.()}>
                  <Icon icon="close" className={s.icon} />
                </div>
                <MarkDown content={content || ""} className={s.preContent} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBox;
