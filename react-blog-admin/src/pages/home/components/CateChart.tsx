import { Pie, Rose, PieConfig, Datum } from '@ant-design/plots';
import { useSelector } from 'umi';

export default function CateChart() {
  let data: Array<Category.CateProps> = useSelector(
    (state: any) => state.category.list,
  );

  data = data.filter((item) => item.count !== 0);
  const config = {
    data,
    xField: 'name',
    yField: 'count',
    seriesField: 'name',
    radius: 0.8,
    tooltip: {
      formatter: (datum: { name: string; count: number }) => {
        return { name: '数量', value: datum.count };
      },
    },
  };
  return <Rose {...config} />;
}
