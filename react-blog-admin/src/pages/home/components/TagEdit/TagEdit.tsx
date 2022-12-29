import { useEffect, useRef, useState } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, Popconfirm, notification } from 'antd';
import { useDispatch, useSelector, Dispatch, useAccess } from 'umi';
import './TagEdit.less';
import { tip } from '@/utils';

export default function TagEdit() {
  // connect和hooks二选一
  const dispatch = useDispatch<Dispatch>();
  const list: Array<Tag.TagProps> = useSelector((state: any) => state.tag.list);

  const { canAdmin } = useAccess();

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputId, setEditInputId] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  const [api, contextHolder] = notification.useNotification();

  const fetchData = async () => {
    dispatch({
      type: 'tag/fecth',
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
      const res = await dispatch({ type: 'tag/add', payload: { name } });
      onLoad(res);
    } else Showmessage('error', tip);
  };

  const fetchUpdate = async (id: number, name: string) => {
    if (canAdmin) {
      const res = await dispatch({
        type: 'tag/update',
        payload: { id, name },
      });
      onLoad(res);
    } else Showmessage('error', tip);
  };

  const fetchDel = async (id: number) => {
    if (canAdmin) {
      const res = await dispatch({ type: 'tag/del', payload: { id } });
      onLoad(res);
    } else Showmessage('error', tip);
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputId]);

  const handleAdd = () => {
    if (inputValue.trim() == '') Showmessage('warning', '标签不能为空');
    else if (list.find((item) => item.name === inputValue))
      Showmessage('warning', '该标签已经存在');
    else {
      fetchAdd(inputValue);
      setInputVisible(false);
      setInputValue('');
    }
  };

  const handleEdit = () => {
    fetchUpdate(editInputId, editInputValue);
    setEditInputId(-1);
    setInputValue('');
  };

  return (
    <div className="tag-edit">
      {contextHolder}
      {list.map((tag) => {
        if (editInputId === tag.id) {
          return (
            <Input
              ref={editInputRef}
              key={tag.id}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              onPressEnter={handleEdit}
              onBlur={() => {
                setEditInputId(-1);
                setInputValue('');
              }}
            />
          );
        }

        return (
          <Tag className="tag" key={tag.id} color={tag.color}>
            <span
              onClick={(e) => {
                setEditInputId(tag.id);
                setEditInputValue(tag.name);
              }}
            >
              {tag.name}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Popconfirm
                  title="确定要删除吗?"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => fetchDel(tag.id)}
                >
                  &nbsp;
                  <CloseOutlined />
                </Popconfirm>
              </span>
            </span>
          </Tag>
        );
      })}

      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAdd}
          onBlur={() => {
            setInputVisible(false);
            setInputValue('');
          }}
        />
      )}
      {!inputVisible && (
        <Tag
          className="tag-plus border-dashed"
          onClick={() => setInputVisible(true)}
        >
          <PlusOutlined /> 新增
        </Tag>
      )}
    </div>
  );
}
