import React from 'react';
import ItemWrapper from '@components/ItemWrapper/ItemWrapper';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChromeIcon from '@icons/ChromeIcon/ChromeIcon';
import TextWidgetContent from '@components/TextWidgetContent/TextWidgetContent';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const Dashboard = () => {
    return (
        <div className='bg-white max-w-400 min-w-90 w-full m-6 py-4 px-6'>
            <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
            <div className='flex flex-wrap'>
                <ItemWrapper className='flex-1/6'>
                    <TextWidgetContent
                        icon={<PersonRoundedIcon fontSize='inherit' />}
                        text='212'
                        textClass='text-4xl'
                        unit='사용자'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/6'>
                    <TextWidgetContent
                        icon={<GradeRoundedIcon fontSize='inherit' />}
                        iconClass='text-yellow-500'
                        text='5.0'
                        textClass='text-4xl'
                        unit='평점'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/6'>
                    <TextWidgetContent
                        icon={<GitHubIcon fontSize='inherit' />}
                        iconClass='mb-2'
                        text='1.0.9'
                        textClass='text-3xl'
                        unit='버전'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/6'>
                    <TextWidgetContent
                        icon={<ChromeIcon size={28} />}
                        iconClass='mr-1.5'
                        text='1.0.9'
                        textClass='text-3xl'
                        unit='버전'
                    />
                </ItemWrapper>
            </div>
            <div className='flex flex-wrap'>
                <ItemWrapper className='flex-2/12'>
                    <div className='h-80 flex flex-col justify-between items-center py-4'>
                        <h3 className='text-xl font-bold'>
                            JDoodle API 사용량
                        </h3>
                        <Gauge
                            width={200}
                            height={200}
                            value={126}
                            valueMin={0}
                            valueMax={2050}
                            cornerRadius='50%'
                            sx={() => ({
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 44,
                                    fontWeight: 'bold',
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: '#0076c2',
                                },
                            })}
                        />
                        <p className='flex flex-col'>
                            <div className='flex'>
                                <span className='text-4xl font-bold'>
                                    {`${((126 / 2025) * 100).toFixed(1)}%`}
                                </span>
                                <p className='pl-1 text-sm flex flex-col justify-center'>
                                    <span className=''>2025회</span>
                                    <span className='text-gray-400 text-xs tracking-tighter'>
                                        총 사용 가능한 크레딧
                                    </span>
                                </p>
                            </div>
                        </p>
                    </div>
                </ItemWrapper>
                <ItemWrapper className='flex-2/12'>
                    <div className='h-80 flex flex-col justify-between items-center py-4'>
                        <h3 className='text-xl font-bold'>AWS Lambda 사용량</h3>
                        <Gauge
                            width={200}
                            height={200}
                            value={212}
                            valueMin={0}
                            valueMax={2050}
                            cornerRadius='50%'
                            sx={() => ({
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 44,
                                    fontWeight: 'bold',
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: '#fda118',
                                },
                            })}
                        />
                        <p className='flex flex-col'>
                            <div className='flex'>
                                <span className='text-4xl font-bold'>
                                    {`${((126 / 2025) * 100).toFixed(1)}%`}
                                </span>
                                <p className='pl-1 text-sm flex flex-col justify-center'>
                                    <span className=''>2025회</span>
                                    <span className='text-gray-400 text-xs tracking-tighter'>
                                        총 사용 가능한 크레딧
                                    </span>
                                </p>
                            </div>
                        </p>
                    </div>
                </ItemWrapper>
                <ItemWrapper className='flex-8/12'>
                    <div className='h-80 flex flex-col justify-between items-center py-4'>
                        graph
                    </div>
                </ItemWrapper>
            </div>
        </div>
    );
};

export default Dashboard;
