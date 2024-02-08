import {atom} from "jotai";


export const dialogCreateBook = atom(false);
export const dialogDeleteBook = atom(false);
export const bookIDAtom = atom<number | undefined>(undefined);
