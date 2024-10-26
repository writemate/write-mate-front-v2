"use client";
import { FlexRowLeftStart, clickable, FlexColumnCenter } from "@/styles";
import exp from "constants";
import { styled, css } from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 17px 25px;
  px;
`;

export const HeaderLeftButton = styled.button`
  ${clickable}
  display: flex;
  height: 44px;
  padding: 11.5px 12px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 9999px;
  background: var(--writemate-red-400, #c55858);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px -1px rgba(0, 0, 0, 0.1);

  border: none;
`;

export const HeaderRightButtonList = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  gap: 12px;
`;

export const HeaderRightButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 9999px;

  background: radial-gradient(
      29.27% 111.5% at 68.06% 54.17%,
      rgba(200, 200, 200, 0.2) 0%,
      rgba(198, 198, 198, 0) 100%
    ),
    var(--white, #fff);

  filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.12));
  border: none;
`;

export const HearderProfileButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: radial-gradient(
      29.27% 111.5% at 68.06% 54.17%,
      rgba(200, 200, 200, 0.2) 0%,
      rgba(198, 198, 198, 0) 100%
    ),
    var(--white, #fff);

  /* icon Shadow */
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
  border: none;
`;
