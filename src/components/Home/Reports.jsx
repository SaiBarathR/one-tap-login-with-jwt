import { useEffect, useState, useRef } from "react";
import CustomBarGraph from "../common/CustomBarGraph.jsx";
import ReportService from "../../service/reports.service.js";
import { ToastContainer, toast } from 'react-toastify';
import { LineGraphLoading } from "../loaders/LineGraphLoading.jsx";

export const Reports = () => {

    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const initialLoadRef = useRef(true);
    const [rowData, setRowData] = useState({
        queued: [],
        request: []
    });
    const alert = (message) => toast.error(message, { position: "top-right", autoClose: 5000, hideProgressBar: true, closeButton: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });

    const fetchReports = async () => {
        if (initialLoadRef.current) setLoading(true);
        try {
            const response = await ReportService.getReports();
            if (response && response.status === 'success') {
                console.log("Reports Data:", response.data);
                setRowData(response.data);
            } else {
                console.error("Error fetching Reports Data:", response);
                if (initialLoadRef.current) alert("Error fetching Reports Data");
            }
        } catch (err) {
            console.error("Error fetching Reports Data:", err);
            if (initialLoadRef.current) alert("Error fetching Reports Data");
        }
        if (initialLoadRef.current) {
            initialLoadRef.current = false;
            setInitialLoad(false);
            setLoading(false);
        }
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
    const requestChartData = rowData && processDataForBarChart(rowData.request);
    console.log("queuedChartData", queuedChartData);
    console.log("requestChartData", requestChartData);
    return (
        <div className='flex flex-col gap-3 items-center justify-between w-full'>
            <ToastContainer />
            {loading ?
                <>
                    <LineGraphLoading />
                    <LineGraphLoading />
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