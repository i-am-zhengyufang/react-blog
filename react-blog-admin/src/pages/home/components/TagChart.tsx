import { WordCloud, WordCloudConfig } from '@ant-design/plots';
import { useSelector } from 'umi';

export default function TagChart() {
  let data: Array<Tag.TagProps> = useSelector((state: any) => state.tag.list);

  data = data.filter((item) => item.count !== 0);
  const config = {
    data,
    wordField: 'name',
    weightField: 'count',
    colorField: 'name',
    wordStyle: {
      fontSize: [10, 50],
      rotation: 0,
    },
  } as WordCloudConfig;

  return <WordCloud {...config} />;
}
