import {atom} from "jotai";


export const dialogCreateAuthor = atom(false);
export const dialogUpdateAuthor = atom(false);
export const dialogDeleteAuthor = atom(false);
export const dialogDetailAuthor = atom(false);
export const authorIDAtom = atom<number | undefined>(undefined);
