import { PageContainer } from '@ant-design/pro-layout';
import './index.less';
import TagChart from './components/TagChart';
import CateChart from './components/CateChart';
import CateEdit from './components/CateEdit/CateEdit';
import TagEdit from './components/TagEdit/TagEdit';
import { getLen as getArticleLen } from 'services/article';
import { getLen as getCateLen } from 'services/category';
import { getLen as getTagLen } from 'services/tag';
import { getLen as getCommentLen } from 'services/comment';
import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

interface LenProps {
  articleLen: number;
  cateLen: number;
  tagsLen: number;
  commentsLen: number;
}

export default function Home() {
  const [len, setLen] = useState<LenProps>();

  useEffect(() => {
    (async () => {
      const { total: articleLen } = await getArticleLen();
      const { total: cateLen } = await getCateLen();
      const { total: tagsLen } = await getTagLen();
      const { total: commentsLen } = await getCommentLen();
      setLen({ articleLen, cateLen, tagsLen, commentsLen });
    })();
  }, []);

  return (
    <PageContainer>
      <Row justify="space-between">
        <Col span={4}>
          <div className="card num-card">
            <div>文章数</div>
            <div className="num">{len?.articleLen}</div>
          </div>
        </Col>
        <Col span={4}>
          <div className="card num-card">
            <div>分类数</div>
            <div className="num">{len?.cateLen}</div>
          </div>
        </Col>
        <Col span={4}>
          <div className="card num-card">
            <div>标签数</div>
            <div className="num">{len?.tagsLen}</div>
          </div>
        </Col>
        <Col span={4}>
          <div className="card num-card">
            <div>评论数</div>
            <div className="num">{len?.commentsLen}</div>
          </div>
        </Col>
      </Row>

      <div className="flex my-5">
        <div className="card cate-box mr-8">
          <span className="title">分类数据</span>
          <div className="h-60">
            <CateChart />
          </div>
        </div>
        {/* 他妈的这个词云不知道咋的 不加溢出忽略就专门去占别人的位子 */}
        <div className="card tag-box overflow-hidden">
          <span className="title">标签数据</span>
          <div className="h-60">
            <TagChart />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="cate-box card mr-8">
          <span className="title">分类</span>
          <CateEdit />
        </div>
        <div className="tag-box card">
          <span className="title">标签</span>
          <TagEdit />
        </div>
      </div>
    </PageContainer>
  );
}
