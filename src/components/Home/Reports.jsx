import { BarGraphLoading } from "../loaders/BarGraphLoading.jsx";
import { useEffect, useState } from "react";
import CustomBarGraph from "../common/CustomBarGraph.jsx";
import ReportService from "../../service/reports.service.js";

export const Reports = () => {

    const [loading, setLoading] = useState(false);
    const [rowData, setRowData] = useState({
        queued: [],
        request: []
    })

    const fetchReports = async () => {
        try {
            const response = await ReportService.getReports();
            if (response && response.status === 'success') {
                console.log("Reports Data:", response.data);
                setRowData(response.data);
            } else {
                console.error("Error fetching Reports Data:", response);
            }
        } catch (err) {
            console.error("Error fetching Reports Data:", err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchReports();
        const interval = setInterval(() => {
            fetchReports();
        }, 10000);
        return () => clearInterval(interval);
    }, []);


    const processDataForBarChart = (data) => {
        if (!data || data.length === 0) return [];
        const sortedData = data.sort((a, b) => new Date(a.value) - new Date(b.value));
        const processedData = sortedData.map((item) => {
            const value = item.value;
            const score = item.score;
            const label = new Date(value).toLocaleTimeString();
            return {
                label: label,
                value: score,
            }
        });



        return (processedData);
    };

    const queuedChartData = rowData && processDataForBarChart(rowData.queued);
    const requestChartData = rowData && processDataForBarChart(rowData.request)
    console.log("queuedChartData", queuedChartData);
    console.log("requestChartData", requestChartData);
    return (
        <div className='flex flex-col gap-3 items-center justify-between w-full'>
            {loading ?
                <>
                    <BarGraphLoading />
                    <BarGraphLoading />
                </>
                :
                <>
                    {requestChartData && requestChartData.length > 0 && <CustomBarGraph data={requestChartData} title='Request' />}
                    {queuedChartData && queuedChartData.length > 0 && <CustomBarGraph data={queuedChartData} title='Queues' />}
                </>
            }
        </div>
    )
}
