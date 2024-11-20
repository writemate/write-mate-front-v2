import { toast } from "react-toastify";

export default function useToast() {
  const notifyPositive = (message: string) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const notifyNegative = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return { notifyPositive, notifyNegative };
}
