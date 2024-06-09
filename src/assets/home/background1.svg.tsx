'use client';
import { useId } from "react";
const Background1 = () => {
    const id = useId();
    return (
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg"
        style={{position:"absolute", top:"0", left:"50%", zIndex:"-1", transform:"translateX(-50%)"}}
        >
            <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={id}>
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
            </defs>
            <g fill={`url(#${id})`} fillRule="evenodd">
                <circle cx="1232" cy="128" r="128" />
                <circle cx="155" cy="443" r="64" />
            </g>
        </svg>
    );
};

export default Background1;
