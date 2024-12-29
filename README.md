## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 주요 라이브러리

- Next.js: React 프레임워크
- TypeScript: 정적 타입 검사
- styled-components: CSS-in-JS 라이브러리
- zustand: 전역 상태 관리 라이브러리
- react-query: 데이터 fetching 라이브러리
- axios: HTTP 클라이언트 라이브러리

## 폴더구조

- src 폴더 외부: 프로젝트 설정 파일
- src 폴더 내부: 프로젝트 소스 코드
  - app: page 라우팅을 해주는 파일들, Next.js의 라우팅 구조 참고(https://nextjs.org/docs/app/building-your-application/routing)
    - 로그인된 사용자만 접속 가능한 페이지는 /app/(authorized) 폴더에 위치
  - assets: 이미지, 폰트 등의 정적 파일
  - components: Page에서 사용하는 컴포넌트들
  - hooks: 커스텀 훅들
  - stores: 전역 상태 관리
  - styles: 스타일 태그들
  - utils: 유틸리티 함수들

### 각 폴더 별 규칙

#### 공통

- 각 폴더 안에 어떤 page와 관련된 파일인지 알 수 있도록 폴더명을 page의 이름으로 지정
  - 각 폴더 안에 index.tsx 파일을 위치여러 page에서 사용되는 파일인 경우: common 폴더 작성 or 각 폴더 최상단에 위치
- 최대한 any 타입을 사용하지 않도록 함

#### app

- 안의 layout과 page들은 최대한 aseets, components, hooks, stores, styles 폴더를 참조하여 구성
  - 추후 수정사항이 생겼을 때, page나 layout에서 수정하지 않도록
  - page나 layout에서 수정사항의 위치를 찾기 쉽도록 컴포넌트, 훅 등을 배치만 한다는 느낌으로
- 재사용할 가능성이 없는 component라도 추출하여 components 폴더에 위치
  - 최대한 page 내에는 의미있는 이름으로 나눠서 전체 page 구조를 파악할 수 있도록 하기 위함
- hooks, stores 등에서 가져온 값에 따라 배치되는 컴포넌트가 다른 경우, 최대한 삼항연사자를 피하고, 조건문을 사용하여 가독성을 높이도록 함
  - ex)
    ```tsx
    const Page = () => {
      const { isLogin } = useAuth();
      return (
        <div>
          {isLogin ? <Login /> : <Logout />} // bad
          {isLogin && <Login />} // good
          {!isLogin && <Logout />} // good
        </div>
      );
    };
    ```

#### hooks

- useState의 리턴값 중 2번째 값(보통 setA의 이름을 사용하는 거)을 최대한 return 하지 말 것.
  - 해당 커스텀 훅을 사용하는 쪽에서 직접 함수를 작성하지 않고, 원하는 기능의 함수를 찾아서 사용할 수 있도록 하기 위함
  - 의도하지 않은 값으로 update 되는 경우를 방지
  - ex)
    ```ts
    const useOnOff = () => {
      const [isOn, setIsOn] = useState(false);
      const on = () => setIsOn(true);
      const off = () => setIsOn(false);
      const toggle = () => setIsOn((prev) => !prev);
      return { isOn, on, off, toggle };
    };
    ```
- 로그인정보는 `/store/useLogin.ts` 파일에서 가져오는 것을 추천
- workspace Id는 `const {workspace_id} = useParams<{ workspace_id: string }>();`로 가져오는 것을 추천함.
- api 호출이 필요한 경우, 가능하면 react-query를 사용하는 것이 좋습니다.
  - react-query의 query 키는 hooks 폴더 내 파일에서 임의로 작성하지 마시고, `/utils/APIs/queryKeys.ts` 파일에 작성하여 사용(관리 용이)
  - api 호출 함수도 가능하면 `/utils/APIs/` 폴더에 작성하여 사용(관리 용이)

#### components

- 주로 hooks와 styles 폴더를 참조하여 구성
- 재사용 가능한 단위나 의미있는 단위로 컴포넌트를 나누어 작성

#### store

- zustand를 사용하여 전역 상태를 관리
- 각 store는 최대한 하나의 기능만을 담당하도록 함
  - ex) userStore, authStore, postStore
- store의 상태를 변경하는 함수는 최대한 store 내부에 위치
  - store의 상태를 변경하는 함수를 사용하는 컴포넌트에서는 해당 함수를 호출만 하도록 함

#### styles

- styled-components를 사용하여 스타일을 작성
- props를 사용하는 경우, 이름 앞에 $를 붙여서 사용
  - ex)
    ```ts
    const Button = styled.button<{ $color: string }>`
      color: ${(props) => props.$color};
    `;
    ```
- 여러 페이지에서 자주 사용될 button이나 input 등의 스타일은 index.ts 파일에 작성하여 사용
- 컴포넌트의 스타일이 길어지는 경우, 최대한 스타일을 분리하여 작성(의미 있는 이름을 붙일 수 있는 단위로)
  - ex)
    ```ts
    const importantTextStyle = css`
      font-size: 16px;
      font-weight: bold;
    `;
    const WarningButton = styled.button`
      ${importantTextStyle}
      color: red;
    `;
    ```

#### utils

- 각종 유틸리티 함수들을 작성
- 최대한 다른 파일에서 사용할 수 있도록 작성
- API의 경우
  - `APIs/queryKeys.ts` 파일에 reactQuery의 query key를 작성하여 사용
  - `APIs/axiosInstance.ts`의 axiosInstance를 사용하면, 로그인 된 사용자의 토큰을 자동으로 넣어줌 => 로그인 된 사용자와 관련된 모든 요청은 axiosInstance를 사용하는 것을 추천
  - api들의 리턴타입은 `APIs/types.ts` 파일에 작성하여 사용
    - 추후 필요시 파일 분리 가능

## 추가 요구 사항

최대한 알아보기 쉬운 변수, 함수 명을 사용하도록 함

Bad

```js
import UpperContainer from "./UpperContainer";
import One from "./One";
```

Good

```js
import UserLoginContainer from "./UserLoginContainer";
import LoginStepOne from "./LoginStepOne";
```

## License

This project uses Google Material Icons, which are licensed under the Apache License 2.0.  
For more information, see [LICENSE](https://www.apache.org/licenses/LICENSE-2.0.html).
