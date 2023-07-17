import { Button, Form, Input, Modal, message } from "antd";
import { throttle } from "@/utils/common";
import s from "./index.module.styl";
import { useCallback } from "react";
import { adminLogin } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { getAdminInfo, setInitState } from "@/redux/slices/commentInfoSlice";
import { RootState } from "@/redux/store";

interface Iprops {
  open: boolean;
  setopen: (v: boolean) => void;
}

const AdminLogin: React.FC<Iprops> = ({ open, setopen }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.commentInfo.role);
  // useCallback必须在顶部，不能在一个函数内部 所以单独创建一个fn
  const fn = useCallback(
    // 不加useCallback则每次都会重新创建一个函数，导致pre一直为0，节流失效
    throttle(
      async (email, password) => {
        const response = await adminLogin({ email, password });
        if (response.code === 200) {
          localStorage.setItem("token", response.token);
          dispatch(getAdminInfo());
          setopen(false);
          messageApi.success("登录成功");
        } else messageApi.error(response.msg);
      },
      1000,
      true
    ),
    []
  );

  const onFinish = (v) => {
    if (role === "admin") {
      localStorage.removeItem("token");
      dispatch(setInitState());
      setopen(false);
    } else {
      const { email, password } = v;
      if (email && password) fn(email, password);
      else messageApi.warning("邮箱和密码必填哦"); //不直接rules加required是因为这样点退出登录也必须填邮箱密码才行
    }
  };
  return (
    <Modal
      title="管理员登录"
      footer={null}
      destroyOnClose
      open={open}
      onCancel={() => setopen(false)}
    >
      {/* 设置destroyOnClose和 preserve={false}是为了每次打开是输入框不再是记忆原来的值 */}
      {contextHolder}
      <Form
        preserve={false}
        className={s.adminBox}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { max: 50, message: "邮箱不能超过50位" },
            { type: "email", message: "请输入合法的邮箱" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ max: 20, message: "密码不能超过20位" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            style={{ marginRight: "20px" }}
            onClick={() => setopen(false)}
          >
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            {role === "admin" ? "取消登录" : "登录"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminLogin;
