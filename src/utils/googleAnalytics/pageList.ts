const pageList = [
    {
        path: /^\/$/,
        name: "메인",
    },
    {
        path: /^\/signup$/,
        name: "회원가입",
    },
    {
        path: /^\/dashboard$/,
        name: "대시보드",
    },
    {
        path: /^\/workspace\/[0-9a-zA-Z]+\/plot$/,
        name: "사건",
    },
    {
        path: /^\/workspace\/[0-9a-zA-Z]+\/character$/,
        name: "인물",
    },
    {
        path: /^\/workspace\/[0-9a-zA-Z]+\/synopsis$/,
        name: "작품 정보",
    },

]

export default pageList;
