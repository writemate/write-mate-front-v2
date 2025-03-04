"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/Work/WorkList.style";
import { WorkStudioTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import WorkList from "@/components/dashboard/Work/WorkList";
import { useWorkList, WorkListContext } from "@/hooks/dashboard/work/workList";
import {
  useWorkCategory,
  WorkCategoryContext,
} from "@/hooks/dashboard/work/workCategory";
import Popup from "@/components/Popup";
import { usePopup } from "@/hooks/usePopup";

export default function Dashboard() {
  const workCategoryValue = useWorkCategory();
  const { workCategory } = workCategoryValue;
  const WorkListValue = useWorkList(workCategory);
  const [isPopupOpen, closePopup, closePopupForOneDay] = usePopup(0);

  return (
    <TitleAndWorkListContainer>
      {isPopupOpen && (
        <Popup
          closePopup={closePopup}
          closePopupForOneDay={closePopupForOneDay}
        ></Popup>
      )}
      <WorkCategoryContext.Provider value={workCategoryValue}>
        <WorkStudioTitleAndNavigationBar />
        <WorkListContext.Provider value={WorkListValue}>
          <WorkList />
        </WorkListContext.Provider>
      </WorkCategoryContext.Provider>
    </TitleAndWorkListContainer>
  );
}
