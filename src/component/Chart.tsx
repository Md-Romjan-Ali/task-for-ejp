"use client"
import { Pie, PieChart, PieSectorShapeProps, Sector, Tooltip, TooltipIndex } from 'recharts';
import { generateMockData } from '@recharts/devtools';

const data = generateMockData(4, 1000);
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieGradient = (props: PieSectorShapeProps) => {
    return (
        <>
            <defs>
                <radialGradient
                    id={`fillGradient${props.index}`}
                    cx={props.cx}
                    cy={props.cy}
                    r={props.outerRadius}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0%" stopColor={COLORS[props.index % COLORS.length]} stopOpacity={0} />
                    <stop offset="100%" stopColor={COLORS[props.index % COLORS.length]} stopOpacity={0.8} />
                </radialGradient>
                <radialGradient
                    id={`borderGradient${props.index}`}
                    cx={(typeof props.width === 'number' ? props.width : 0) / 2}
                    cy={(typeof props.height === 'number' ? props.height : 0) / 2}
                >
                    <stop offset="0%" stopColor={COLORS[props.index % COLORS.length]} stopOpacity={0} />
                    <stop offset="100%" stopColor={COLORS[props.index % COLORS.length]} stopOpacity={0.8} />
                </radialGradient>
                <clipPath id={`clipPath${props.index}`}>
                    <Sector {...props} />
                </clipPath>
            </defs>
            <Sector
                {...props}
                clipPath={`url(#clipPath${props.index})`}
                fill={`url(#fillGradient${props.index})`}
                stroke={`url(#borderGradient${props.index})`}
                strokeWidth={props.isActive ? '100%' : 0}
            />
        </>
    );
};
interface GetData {
    id: string,
    title: string,
    amount: string,
    category: string,
    date: string
}
interface Props {
    getdata: GetData[]
    isAnimationActive?: boolean;
    defaultIndex?: TooltipIndex;
}
export default function PieWithGradient({
    getdata,
    isAnimationActive = true,
    defaultIndex,
}: Props) {
    const chartData = getdata.map((item) => ({
        name: item.category,
        value: Number(item.amount),
    }));
    return (
        <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '30vh', aspectRatio: 1 }} responsive>
            <Pie
                data={chartData}
                dataKey="value"
                nameKey={"name"}
                isAnimationActive={isAnimationActive}
                shape={PieGradient} innerRadius="20%" />
            <Tooltip defaultIndex={defaultIndex} />
        </PieChart>
    );
}