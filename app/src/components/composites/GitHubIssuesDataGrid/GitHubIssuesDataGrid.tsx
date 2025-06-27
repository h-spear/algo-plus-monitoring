import React from 'react';
import type { GitHubIssue } from '@types/api';
import { formatDateToMonthDayYear } from '@utils/date';
import BugReportIcon from '@mui/icons-material/BugReport';
import { CircularProgress } from '@mui/material';

interface GitHubIssuesDataGridProps {
    className?: string;
    data: GitHubIssue[];
}

const GitHubIssuesDataGrid: React.FC<GitHubIssuesDataGridProps> = ({
    className,
    data,
}) => {
    return (
        <div className={`w-full h-80 ${className} `}>
            <div className='my-2 px-2'>
                <p className={`text-gray-400 font-thin flex items-center`}>
                    <BugReportIcon fontSize='inherit' />
                    <span className='ml-1 text-xs'>
                        발견된 버그 {data ? data.length : 0}건
                    </span>
                </p>
            </div>
            {data ? (
                <>
                    <div className='bg-blue-50 px-4 py-2 flex justify-between font-bold text-gray-500 text-sm items-center h-10'>
                        <div className='flex-5/6 pl-1 flex gap-1 items-center'>
                            <span className='mr-1'>이슈</span>
                            <span className='bg-gray-500 px-2 text-xs py-0.5 font-bold font-sans text-white rounded-[10px]'>
                                open
                            </span>
                            <span className='bg-red-600 px-2 text-xs py-0.5 font-bold font-sans text-white rounded-[10px]'>
                                bug
                            </span>
                        </div>
                        <div className='flex-1/6 text-center'>작성자</div>
                    </div>
                    <div className='overflow-y-scroll h-57 mt-3 '>
                        {data.length > 0 ? (
                            data.map((issue, index) => (
                                <>
                                    <div
                                        key={issue.id || index}
                                        className={`flex py-2 px-4 border-t border-gray-200 h-16 items-center justify-between ${
                                            data.length < 4 &&
                                            index == data.length - 1
                                                ? 'border-b'
                                                : ''
                                        }`}
                                    >
                                        <div className='flex flex-col flex-5/6 px-2'>
                                            <p className='flex-1 font-bold'>
                                                <a
                                                    className=' hover:bg-red-50 transition-all duration-300 px-1
'
                                                    href={issue.url}
                                                    target='_blank'
                                                >
                                                    {issue.title}
                                                </a>
                                                <span className='text-blue-500 text-sm'>
                                                    ({issue.comments})
                                                </span>
                                            </p>
                                            <span className='text-xs text-gray-500 font-mono tracking-tighter px-1'>
                                                #{issue.number} ·{' '}
                                                {issue.user.login} opened on{' '}
                                                {formatDateToMonthDayYear(
                                                    issue.createdAt
                                                )}
                                            </span>
                                        </div>
                                        <div className='flex-1/6 flex justify-center'>
                                            <a
                                                className='flex justify-between items-center gap-3 group'
                                                href={`https://github.com/${issue.user.login}`}
                                                target='_blank'
                                            >
                                                <img
                                                    src={`${issue.user.avatarUrl}`}
                                                    alt='github_profile'
                                                    className='h-10 rounded-4xl'
                                                />
                                                <span className='text-sm text-gray-500 group-hover:text-blue-500 transition-all duration-300'>
                                                    {issue.user.login}
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </>
                            ))
                        ) : (
                            <h1 className='flex h-full justify-center items-center'>
                                발견된 버그가 없습니다.
                            </h1>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className='flex w-full h-full justify-center items-center pb-20'>
                        <CircularProgress color='primary' size={100} />
                    </div>
                </>
            )}
        </div>
    );
};

export default GitHubIssuesDataGrid;
