import useCountUp from "@/hooks/useCountUp";
import { UserContainer, FeatureTitle,ColorableText, CounterContainer } from "@/styles/Home.styles";
import { useRef, useEffect } from "react";

export default function CurrentUsers() {
    const [writerCount, setWriterCount] = useCountUp();
    const [novelCount, setNovelCount] = useCountUp();
    const [chapterCount, setChapterCount] = useCountUp();

    const countUpRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver>();

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            const isViewing = entries[0].isIntersecting;
            if (isViewing) {
                setWriterCount(722);
                setNovelCount(605);
                setChapterCount(4769);
            }
        });

        if(countUpRef.current) observerRef.current.observe(countUpRef.current);

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);
    
    return (
        <UserContainer ref={countUpRef}>
            <FeatureTitle>
                <ColorableText $color>라이트메이트</ColorableText><ColorableText>와 함께하고 있습니다.</ColorableText>
            </FeatureTitle>
            <CounterContainer>
                <div>
                    <ColorableText $color $isBig>{writerCount}</ColorableText>
                    <div>활동중인 작가님</div>
                </div>
                <div>
                    <ColorableText $color $isBig>{novelCount}</ColorableText>
                    <div>생성된 작품</div>
                </div>
                <div>
                    <ColorableText $color $isBig>{chapterCount}</ColorableText>
                    <div>보관된 아이디어</div>
                </div>
            </CounterContainer>
        </UserContainer>
    );
}
