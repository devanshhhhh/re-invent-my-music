import { atom } from "recoil";

export const searchInputAtom=atom({
    key: "searchInputAtom",
    default: ""
});

export const searchResultAtom=atom({
    key: "searchResultAtom",
    default: []
})