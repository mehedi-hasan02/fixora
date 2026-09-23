type Props = {
  data: { date: string; count: number }[];
};

const WIDTH = 560;
const HEIGHT = 180;
const PADDING = 24;

const RequestOverviewChart = ({ data }: Props) => {
  const max = Math.max(1, ...data.map((d) => d.count));

  const points = data.map((d, i) => {
    const x = PADDING + (i / (data.length - 1)) * (WIDTH - PADDING * 2);
    const y = HEIGHT - PADDING - (d.count / max) * (HEIGHT - PADDING * 2);
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${HEIGHT - PADDING} L ${points[0].x} ${HEIGHT - PADDING} Z`;

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT + 20}`} className="w-full">
      <defs>
        <linearGradient id="overview-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={areaPath} fill="url(#overview-fill)" />
      <path
        d={linePath}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {points.map((p) => (
        <circle
          key={p.date}
          cx={p.x}
          cy={p.y}
          r="3.5"
          fill="var(--color-card)"
          stroke="var(--color-primary)"
          strokeWidth="2"
        />
      ))}

      {points.map((p) => (
        <text
          key={`${p.date}-label`}
          x={p.x}
          y={HEIGHT + 14}
          textAnchor="middle"
          className="fill-muted"
          fontSize="11"
        >
          {p.date}
        </text>
      ))}
    </svg>
  );
};

export default RequestOverviewChart;
