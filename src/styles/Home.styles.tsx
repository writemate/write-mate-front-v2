'use client';
import { styled } from 'styled-components';
import { clickable } from '.';
import { GtagForClick } from '@/utils/GtagForClick';

export const TopTitle = styled.h1<{ $color?: boolean }>`
    user-select: none;
    font-size: 5.5rem;
    font-weight: 500;
    text-align: center;
    line-height: 6rem;
    width: 100%;
    ${({ $color }) => !$color ? "color: black;" : `color: transparent; background: linear-gradient(90deg, #d65554, #ff7d7e); -webkit-background-clip: text; background-clip: text;`}
`;

export const SubTitle = styled.p`
    user-select: none;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 1.5rem;
    width: 100%;
`;

export const LoginButton = styled.button`
    ${clickable};
    margin: 2rem auto;
    padding: 12px 32px;
    font-size: 1rem;
    font-weight: 600;
    background-color: var(--main-color);
    color: white;
    border: 1px solid var(--main-color);
    border-radius: 5px;
    transition: all 0.3s;
`;
