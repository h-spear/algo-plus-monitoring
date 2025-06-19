import React from 'react';

interface ChromeIconProps {
    size?: number;
}

const ChromeIcon: React.FC<ChromeIconProps> = ({ size = 32 }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            version='1.1'
            width={size}
            height={size}
            viewBox='0 0 256 256'
            xmlSpace='preserve'
        >
            <g
                style={{
                    stroke: 'none',
                    strokeWidth: 0,
                    strokeDasharray: 'none',
                    strokeLinecap: 'butt',
                    strokeLinejoin: 'miter',
                    strokeMiterlimit: 10,
                    fill: 'none',
                    fillRule: 'nonzero',
                    opacity: 1,
                }}
                transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'
            >
                <path
                    d='M 87.461 30.127 H 56.794 c 4.382 3.475 7.203 8.833 7.208 14.86 c 0.003 3.338 -0.875 6.617 -2.544 9.508 c -0.29 0.498 -0.607 0.974 -0.937 1.439 L 41.545 89.846 c 1.15 0.095 2.302 0.158 3.457 0.154 C 69.845 89.979 89.979 69.845 90 45.002 C 90.009 39.93 89.149 34.899 87.461 30.127 z'
                    style={{
                        stroke: 'none',
                        strokeWidth: 1,
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: 'rgb(255,205,66)',
                        fillRule: 'nonzero',
                        opacity: 1,
                    }}
                    transform=' matrix(1 0 0 1 0 0) '
                    strokeLinecap='round'
                />
                <path
                    d='M 44.937 63.987 c -3.31 0 -6.562 -0.873 -9.428 -2.529 c -2.89 -1.672 -5.29 -4.073 -6.96 -6.964 c -0.38 -0.658 -0.703 -1.333 -0.997 -2.014 L 8.136 19.251 C 3.96 25.223 1.276 32.12 0.359 39.37 c -3.025 23.942 13.367 45.858 36.903 49.939 L 52.24 62.543 C 49.96 63.484 47.484 63.99 44.937 63.987 z'
                    style={{
                        stroke: 'none',
                        strokeWidth: 1,
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: 'rgb(25,161,95)',
                        fillRule: 'nonzero',
                        opacity: 1,
                    }}
                    transform=' matrix(1 0 0 1 0 0) '
                    strokeLinecap='round'
                />
                <path
                    d='M 35.498 28.56 c 2.889 -1.668 6.167 -2.545 9.504 -2.544 c 0.689 -0.001 1.368 0.04 2.038 0.111 h 38.774 c -3.029 -6.559 -7.581 -12.311 -13.315 -16.741 C 53.412 -5.361 26.226 -2.366 10.764 15.821 l 15.453 26.447 C 27.03 36.719 30.265 31.581 35.498 28.56 z'
                    style={{
                        stroke: 'none',
                        strokeWidth: 1,
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: 'rgb(221,80,68)',
                        fillRule: 'nonzero',
                        opacity: 1,
                    }}
                    transform=' matrix(1 0 0 1 0 0) '
                    strokeLinecap='round'
                />
                <path
                    d='M 31.826 37.408 C 27.632 44.68 30.127 53.976 37.4 58.17 c 7.273 4.194 16.569 1.699 20.763 -5.574 c 4.194 -7.265 1.705 -16.554 -5.559 -20.748 c -2.3 -1.328 -4.908 -2.029 -7.563 -2.035 h -0.004 v 0 C 39.587 29.784 34.543 32.684 31.826 37.408 z'
                    style={{
                        stroke: 'none',
                        strokeWidth: 1,
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: 'rgb(75,139,244)',
                        fillRule: 'nonzero',
                        opacity: 1,
                    }}
                    transform=' matrix(1 0 0 1 0 0) '
                    strokeLinecap='round'
                />
            </g>
        </svg>
    );
};

export default ChromeIcon;
