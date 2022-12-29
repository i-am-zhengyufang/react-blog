import { useEffect } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { uploadUrl } from '@/utils';
interface Iprops {
  value: string;
  onChange: (value: string) => void;
}

export default function MdEditor({ value = '', onChange }: Iprops) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const vditor = new Vditor('vditor', {
      minHeight: 400,
      toolbar: [
        'headings',
        'bold',
        'italic',
        'strike',
        '|',
        'line',
        'quoprote',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        'quote',
        'code',
        'inline-code',
        'undo',
        'redo',
        {
          name: 'upload',
          tip: '上传图片',
        },
        'link',
        'table',
        'both',
        'outline',
        'export',
        'br',
      ],
      upload: {
        url: uploadUrl,
        multiple: false,
        accept: 'image/*',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        fieldName: 'file',
        success(_, res) {
          vditor.insertValue(
            `![${JSON.parse(res).data.name}](${JSON.parse(res).data.url})`,
          );
        },
      },
      after: () => {
        vditor.setValue(value);
      },
      input(md) {
        onChange(md);
      },
    });
  }, []); //value为依赖项的原因是我必须保证别人异步请求value后的值可以顺利给到editor
  return <div id="vditor"></div>;
}
