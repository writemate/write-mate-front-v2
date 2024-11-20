import { Flip, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config: ToastOptions = {
  // 2. config 값을 설정해서 기본 커스터마이징을 한다.
  position: "top-center",
  // 2-1. 위치: 위쪽 중간
  autoClose: 2000,
  // 2-2. 2초 후 사라짐
  hideProgressBar: true,
  // 2-3. 사라지기까지 progressBar 보이지 않게 설정
  closeOnClick: true,
  // 2-4. 클릭할 경우 토스트 메세지 사라짐
  rtl: false,
  // 2-5. 알림 좌우 반전 안 함
  pauseOnFocusLoss: false,
  // 2-6. 화면 벗어나도 알람 정지 안함
  draggable: false,
  // 2-7. 드래그 불가능
  pauseOnHover: false,
  // 2-8. 마우스 올리면 알람 정지하지 않음
  transition: Flip,

  bodyClassName: "font-sans ",
  className: "no-shadow h-[3rem]  bg-gray-300   ",

  // limit={1} // 알람 개수 제한
};

export const notifySuccess = (message: string) => {
  toast.success(message, config);
};

export const notifyError = (message: string) => {
  toast.error(message, config);
};

export const notifyWarning = (message: string) => {
  toast.warning(message, config);
};

