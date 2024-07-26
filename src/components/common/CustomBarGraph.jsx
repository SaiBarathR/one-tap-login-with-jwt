import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
export default function CustomLineGraph({ data, title }) {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="text-white bg-[#3D8BF8] rounded-lg p-2 ">
                    <p  className="label">{`${payload[0].payload?.label} : ${payload[0].payload?.value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        data.length > 0 && <div className='w-full border custom-line-graph-container flex flex-col'>
            <div className='w-full flex border-b-1 h-10 items-center pl-3'>
                <p className={'text-xl font-medium text-black text-left'}>{title}</p>
            </div>
            <div className='w-[100%] h-[32vh] 2xl:h-[36vh] mt-4'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <YAxis padding={{ top: 5, bottom: 5 }} fontSize={'12px'} type='number' allowDataOverflow style={{ marginRight: "20px" }} dataKey={'value'} />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={false}
                        />
                        <Line type="monotone" dataKey="value" stroke='#5932EA' activeDot={{ r: 8 }} />
                        <XAxis padding={{ left: 10, right: 10 }} fontSize={'12px'} allowDataOverflow dataKey="label" tickLine={false} axisLine={true} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}