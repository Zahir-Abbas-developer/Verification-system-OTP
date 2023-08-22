import React, { useEffect, useState } from 'react';
import { realtimeChartdataFetchObj, REQUEST_STATUS } from '@constants';
import { useAppSelector } from '@hooks';
import { Box, Skeleton } from '@mui/material';
import { realTimeChartOptions } from '@next/constants/chart-options/chart-options';
import dynamic from 'next/dynamic';
import { CandlestickChartSwitches } from '../candlestick-chart-switches';
import { DashboardCard } from '../dashboard-card';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const ApiCandleStickChart = () => {
  const [switchChart, setSwitchChart] = useState<string>('1S');
  const [chartData, setChartData] = useState<any>();
  const [realTimeChartData, setRealTimeChartData] = useState<any>([
    { name: 'Success', data: [0] },
    { name: 'Failure', data: [0] },
  ]);
  const { apisData, status } = useAppSelector((store) => store.apis);
  useEffect(() => {
    setRealTimeChartData(
      switchChart === '1Y'
        ? [
            chartData?.[realtimeChartdataFetchObj[switchChart]]?.[0],
            chartData?.[realtimeChartdataFetchObj[switchChart]]?.[1],
          ]
        : chartData?.[realtimeChartdataFetchObj[switchChart]],
    );
  }, [chartData, switchChart]);
  useEffect(() => {
    const tempcountAndGraphData = apisData;
    console.log(status);
    setChartData(tempcountAndGraphData);
  }, [apisData]);
  const onSwitchItem = (item: string) => {
    setSwitchChart(item);
  };
  return (
    <>
      <DashboardCard
        heading={'Total Data'}
        headingSibling={
          <CandlestickChartSwitches onChangeSwitch={onSwitchItem} />
        }
      >
        {status === REQUEST_STATUS.LOADING && !!!realTimeChartData?.length ? (
          <>
            <Skeleton variant="rounded" width="100%" height="433.516px" />
          </>
        ) : !!realTimeChartData?.length ? (
          <Box className="verified-document">
            <Chart
              series={realTimeChartData as any}
              options={{
                ...realTimeChartOptions(
                  switchChart,
                  chartData?.[realtimeChartdataFetchObj[switchChart]]?.[2]
                    ?.monthLabels,
                ),
              }}
              type="line"
              height={433.15}
            />
          </Box>
        ) : (
          <Box
            sx={{
              height: '433px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '18px',
            }}
          >
            Data Not Found
          </Box>
        )}
      </DashboardCard>
    </>
  );
};
