import FeaturesBlock,{FeatureType} from "./FeaturesBlock";
import Video1 from '@/assets/home/video1.gif';
import Video2 from '@/assets/home/video2.gif';
import Video3 from '@/assets/home/video3.gif';
import Video4 from '@/assets/home/video4.gif';
import Video5 from '@/assets/home/video5.gif';

export default function Features() {
    const Features:FeatureType[] = [
        {
            title: [{text: '인물관계', color: true}, {text: "를 더욱 직관적으로", color: false}],
            description: "클릭 몇번으로 쉽고 빠르게 인물 관계도를 그려보세요.",
            linkText: "인물 관계도 그려보기",
            image: Video1,
            imageAlt: "웹소설 인물관계도도 매우 쉽게 그릴 수 있습니다. | 웹소설 쓰는 프로그램 - 라이트메이트(write mate)",
            comment: [
                [ {text: "인물 관계도 그리기가 항상 어려웠는데,\n", bold: false},
                {text: "라이트메이트와 함께하니 너무 쉬워요!", bold: true}],
                [ {text: "많은 시간이 들던 관계도 작성이,\n", bold: false},
                {text: "10분이면 끝나요!", bold: true}],
                [ {text: "관계도가 한 눈에 들어오니,\n", bold: true},
                {text: "집필 과정에서 큰 도움이 돼요!", bold: false}],
            ],
            direction: 'left',
            background: false,
        },
        {
            title: [{text: '이야기의 흐름을 ', color: false}, {text: "더 자유롭게", color: true}],
            description: "챕터와 사건을 구성하고 마음에 드는 순서로 변경하세요.",
            linkText: "플롯 구성해보기",
            image: Video2,
            imageAlt: "실시간 연동으로 웹소설 인물과 플롯 창작을 매우 쉽게 만들어 줍니다 | 웹소설 쓰는 프로그램 - 라이트메이트(write mate)",
            comment: [
                [ {text: "흐름을 마음대로 배치할 수 있어서,\n", bold: false},
                {text: "유동적으로 플롯을 짤 수 있어요!", bold: true}],
                [ {text: "자유도가 높아서,\n", bold: true},
                {text: "생각하는 것에 제한이 없어요!", bold: false}],
                [ {text: "순서를 바꾸는 과정에서,\n", bold: false},
                {text: "더 흥미로운 스토리가 만들어졌어요!", bold: true}],
            ],
            direction: 'right',
            background: true,
        },
        {
            title: [{text: '설정간의 연동', color: true}, {text: "으로\n", color: false}, {text: "더욱 탄탄하게", color: false}],
            description: "사건과 연관된 인물을 확인하며 더 탄탄한 스토리를 만들어 보세요.",
            linkText: "인물과 사건 연동해보기",
            image: Video3,
            imageAlt: "실시간 연동으로 웹소설 인물과 플롯 창작을 매우 쉽게 만들어 줍니다 | 웹소설 쓰는 프로그램 - 라이트메이트(write mate)",
            comment: [
                [ {text: "사건과 연관된 인물을 확인하면서,\n", bold: false},
                {text: "스토리라인이 더 탄탄해졌어요!", bold: true}],
                [ {text: "자동 연동 기능을 통해,\n", bold: true},
                {text: "클릭 한번으로 연동이 가능하네요!", bold: false}],
                [ {text: "인물과 연관된 사건이 보이니,\n", bold: false},
                {text: "이야기 흐름을 따라가기 쉬워요!", bold: true}],
            ],
            direction: 'left',
            background: false,
        },
        {
            title: [{text: '언제든지 ', color: false}, {text: "원하는 시점", color: true}, {text: "으로", color: false}],
            description: "버전 관리를 통해 특정 시점을 오가며 작업을 진행하세요.",
            linkText: "버전 관리해보기",
            image: Video4,
            imageAlt: "실시간 연동으로 웹소설 인물과 플롯 창작을 매우 쉽게 만들어 줍니다 | 웹소설 쓰는 프로그램 - 라이트메이트(write mate)",
            comment: [
                [ {text: "예전에 썻던 게 더 나았던 것 같은데,\n", bold: false},
                {text: "쉽게 돌아갈 수 있네요!", bold: true}],
                [ {text: "한 번의 클릭으로 몇 주 전 작업으로 돌아가니,\n", bold: true},
                {text: "정말 편리하네요!", bold: false}],
                [ {text: "실수로 지운게 있었는데,\n", bold: false},
                {text: "버전 관리로 바로 복구했어요!", bold: true}],
            ],
            direction: 'right',
            background: true,
        },
        {
            title: [{text: '떠오른 생각은\n', color: false}, {text: "아이디어 보관함", color: true}, {text: "으로", color: false}],
            description: "언제, 어디서나. 번뜩이는 아이디어를 보관하고 활용하세요.",
            linkText: "아이디어 보관해보기",
            image: Video5,
            imageAlt: "웹소설 관련 메모, 인물, 사건을 클라우드 환경에서 관리해 보세요. | 웹소설 쓰는 프로그램 - 라이트메이트(write mate)",
            comment: [
                [ {text: "떠오르는 생각을 바로 기록할 수 있어서,\n", bold: false},
                {text: "더 이상 놓치는 아이디어가 없어요!", bold: true}],
                [ {text: "기록했던 아이디어를 설정집에서 바로 활용하니,\n", bold: true},
                {text: "작업 효율이 높아졌어요!", bold: false}],
                [ {text: "아이디어 보관함 덕분에,\n", bold: false},
                {text: "소재를 체계적으로 관리할 수 있어요!", bold: true}],
            ],
            direction: 'left',
            background: false,
        },
    ]
    
    return Features.map((feature, index) => {
        return (
            <FeaturesBlock key={index} {...feature} />
        );
    });
}
