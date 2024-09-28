'use client';
import { CoverImageContainer, CoverImage, BlurBackground, ChangeCover,ChangeCoverInput } from "@/styles/workspace/Info.style";
import { useContext, useRef } from 'react';
import { InfoContext } from "@/hooks/workspace/info";

export default function CoverImageBox() {
    const { data , isLoading, onChangeCoverImage } = useContext(InfoContext);
    const src = data?.cover ? data.cover : null;
    const ref = useRef<HTMLInputElement>(null);
    const onClickChangeCover = () => {
        ref.current?.click();
    }
    
    return (
        <CoverImageContainer>
            <BlurBackground $src={src}/>
            {src&&<CoverImage src={src}/>}
            <ChangeCoverInput type="file" accept="image/*" onChange={onChangeCoverImage} ref={ref}/>
            {!isLoading&&<ChangeCover onClick={onClickChangeCover}>표지 변경</ChangeCover>}
        </CoverImageContainer>
    );
}
