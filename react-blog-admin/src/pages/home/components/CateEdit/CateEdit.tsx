import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SetStateAction, useState } from 'react';
import {
  List,
  Input,
  Button,
  Space,
  Modal,
  notification,
  Popconfirm,
} from 'antd';
import './CateEdit.less';
import { CateState, connect, ConnectRC, Loading, useAccess } from 'umi';
import { tip } from '@/utils';

const CateEdit: ConnectRC<CateState> = ({ list, dispatch }) => {
  let [editInput, setEditInput] = useState('');
  const [value, setValue] = useState('');
  let [cateId, setCateId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { canAdmin } = useAccess();
  const onChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value);
  };

  const fetchData = () => {
    dispatch({
      type: 'category/fecth',
    });
  };

  const Showmessage = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
  ) => {
    api[type]({
      message,
      duration: 2,
    });
  };
  const onLoad = (res: ResponseInfo) => {
    if (res.status == 200) {
      fetchData();
      Showmessage('success', res.msg);
    } else Showmessage('error', res.msg);
  };

  const fetchAdd = async (name: string) => {
    if (canAdmin) {
      const res = await dispatch({ type: 'category/add', payload: { name } });
      onLoad(res);
    } else Showmessage('error', tip);
  };

  const fetchUpdate = async (id: number, name: string) => {
    if (canAdmin) {
      const res = await dispatch({
        type: 'category/update',
        payload: { id, name },
      });
      onLoad(res);
    } else Showmessage('error', tip);
  };

  const fetchDel = async (id: number) => {
    if (canAdmin) {
      const res = await dispatch({ type: 'category/del', payload: { id } });
      onLoad(res);
    } else Showmessage('error', tip);
  };

  const handleAdd = () => {
    // 由于是antd的Input 所以多一个.input
    if (value.trim() == '') Showmessage('warning', '分类不能为空');
    else if (list.find((item) => item.name === value))
      Showmessage('warning', '该分类已经存在');
    else {
      fetchAdd(value);
      setValue('');
    }
  };

  const handleEdit = (id: number, name: string) => {
    setIsModalOpen(true);
    setEditInput(name);
    setCateId(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    fetchUpdate(cateId!, editInput);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="cate-edit">
      {contextHolder}
      <Space.Compact block>
        <Input
          type="text"
          value={value}
          onChange={onChange}
          allowClear
          placeholder="新建一个分类"
          onPressEnter={handleAdd}
        />
        <Button type="primary" onClick={handleAdd}>
          新建
        </Button>
      </Space.Compact>
      <List
        className="list"
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item className="item">
            <div className="num">{item.count}</div>
            <div className="cate-name">{item.name}</div>
            <div className="action-btn">
              <EditOutlined
                className="edit"
                onClick={() => handleEdit(item.id, item.name)}
              />
              <Popconfirm
                title="确定要删除吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => fetchDel(item.id)}
              >
                <DeleteOutlined className="del" />
              </Popconfirm>
            </div>
          </List.Item>
        )}
      />
      <Modal
        title="修改分类"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          onPressEnter={handleOk}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = ({
  category,
  loading,
}: {
  category: CateState;
  loading: Loading;
}) => {
  return { ...category, loading };
};

export default connect(mapStateToProps)(CateEdit);
