'use client';
import { CoverImageContainer, CoverImage, BlurBackground, ChangeCover } from "@/styles/workspace/Info.style";

export default function CoverImageBox({src}: {src: string}) {
    return (
        <CoverImageContainer>
            <BlurBackground $src={src}/>
            <CoverImage src={src}/>
            <ChangeCover>표지 변경</ChangeCover>
        </CoverImageContainer>
    );
}
