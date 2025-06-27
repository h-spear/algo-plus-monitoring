import React from 'react';
import { CircularProgress } from '@mui/material';
import type { GitHubInfo } from '@types/api';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import CommitRoundedIcon from '@mui/icons-material/CommitRounded';
import BranchIcon from '@icons/BranchIcon/BranchIcon';
import PullRequestIcon from '@icons/PullRequestIcon/PullRequestIcon';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import GitHubIcon from '@mui/icons-material/GitHub';

interface GitHubInfoContentProps {
    data: GitHubInfo;
    className?: string;
    loading: boolean;
}

const GitHubInfoContent: React.FC<GitHubInfoContentProps> = ({
    data,
    className,
    loading,
}) => {
    return (
        <div
            className={`flex flex-col justify-between items-center w-full ${className} min-w-60`}
        >
            <p
                className={`text-gray-400 font-thin flex items-center w-full pl-2 pt-2`}
            >
                <GitHubIcon fontSize='inherit' />
                <span className='ml-1 text-xs'>오픈소스</span>
            </p>
            {!loading ? (
                <>
                    <div className='flex flex-col text-gray-700 text-sm mt-0'>
                        <span className='flex items-center h-8 gap-2'>
                            <div className='w-8 flex justify-center text-gray-950'>
                                <BranchIcon size={20} />
                            </div>
                            <span>
                                브랜치 :{' '}
                                <b>
                                    {data.branchesCount
                                        ? data.branchesCount
                                        : '0'}
                                </b>
                                개
                            </span>
                        </span>
                        <span className='flex items-center h-8 gap-2'>
                            <div className='w-8 flex justify-center text-gray-950'>
                                <CommitRoundedIcon />
                            </div>
                            <span>
                                커밋 :{' '}
                                <b>
                                    {data.commitsCount
                                        ? data.commitsCount
                                        : '0'}
                                </b>
                                개
                            </span>
                        </span>
                        <span className='flex items-center h-8 gap-2'>
                            <div className='w-8 flex justify-center text-gray-950'>
                                <AccessibilityNewRoundedIcon />
                            </div>
                            <span>
                                기여 :{' '}
                                <b>
                                    {data.contributorsCount
                                        ? data.contributorsCount
                                        : '0'}
                                </b>
                                명
                            </span>
                        </span>
                        <span className='flex items-center h-8 gap-2'>
                            <div className='w-8 flex justify-center text-gray-950'>
                                <StarRoundedIcon />
                            </div>
                            <span>
                                스타 :{' '}
                                <b>
                                    {data.stargazersCount
                                        ? data.stargazersCount
                                        : '0'}
                                </b>
                                명
                            </span>
                        </span>
                        <span className='flex items-center h-8 gap-2'>
                            <div className='w-8 flex justify-center text-gray-950'>
                                <RestaurantRoundedIcon />
                            </div>
                            <span>
                                포크 :{' '}
                                <b>{data.forksCount ? data.forksCount : '0'}</b>
                                번
                            </span>
                        </span>
                        <span className='flex items-center h-8 gap-2'>
                            <div className='w-8 flex justify-center text-gray-950'>
                                <AdjustRoundedIcon />
                            </div>
                            <span>
                                열린 이슈 :{' '}
                                <b>
                                    {data.openIssuesCount
                                        ? data.openIssuesCount
                                        : '0'}
                                </b>
                                개
                            </span>
                        </span>
                        <span className='flex items-center h-8 gap-2'>
                            <div className='w-8 flex justify-center text-gray-950'>
                                <PullRequestIcon size={22} />
                            </div>
                            <span>
                                열린 PR :{' '}
                                <b>
                                    {data.openPrCount ? data.openPrCount : '0'}
                                </b>
                                개
                            </span>
                        </span>
                        <span className='flex items-center h-8 gap-2'>
                            <div className='w-8 flex justify-center text-gray-950'>
                                <CodeRoundedIcon />
                            </div>
                            <span>
                                소스 버전 :{' '}
                                <b>{data.version ? data.version : '0'}</b>
                            </span>
                        </span>
                        <span className='flex items-center h-8 gap-2'>
                            <div className='w-8 flex justify-center text-gray-950'>
                                <BalanceRoundedIcon />
                            </div>
                            <span>
                                라이선스 :{' '}
                                <b>{data.license ? data.license : '없음'}</b>
                            </span>
                        </span>
                    </div>
                </>
            ) : (
                <div className='h-full flex items-center'>
                    <CircularProgress color='primary' size={48} />
                </div>
            )}
            <div className={`flex flex-col ${loading ? 'hidden' : ''}`}></div>
        </div>
    );
};

export default GitHubInfoContent;
