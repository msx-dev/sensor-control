import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  data: number[];
  dataKey: string;
  label: {
    x: { value: string; position: string };
    y: { value: string; angle: number; position: string };
  };
  stroke: string;
}

const Chart = ({ data, label, stroke }: ChartProps) => {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <LineChart
        width={600}
        height={300}
        data={data.map((value, index) => ({ index, value }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" label={label.x} />
        <YAxis label={label.y} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke={stroke}
          strokeWidth={2}
          isAnimationActive={false}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
