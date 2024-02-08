import {atom} from "jotai";

export const dialogCreateStaff = atom(false);
export const dialogDeleteStaff = atom(false);
export const dialogDetailStaff = atom(false);
export const dialogUpdateStaff = atom(false);
export const staffIDAtom = atom<number | undefined>(undefined);
