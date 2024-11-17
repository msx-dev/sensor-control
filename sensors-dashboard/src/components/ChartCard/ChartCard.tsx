import Chart from "../Chart/Chart";
import styles from "./ChartCard.module.scss";

interface ChartCardProps {
  data: number[];
  dataKey: string;
  label: {
    x: { value: string; position: string };
    y: { value: string; angle: number; position: string };
  };
  stroke: string;
  title?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

const ChartCard = ({
  data,
  dataKey,
  label,
  stroke,
  title,
  emptyTitle,
  emptyDescription,
}: ChartCardProps) => {
  return (
    <div className={styles.chartCard}>
      {data.length !== 0 ? (
        <>
          <h3>{title}</h3>
          <Chart data={data} dataKey={dataKey} label={label} stroke={stroke} />
        </>
      ) : (
        <div className={styles.empty}>
          <h2>{emptyTitle}</h2>
          <h4>{emptyDescription}</h4>
        </div>
      )}
    </div>
  );
};

export default ChartCard;
