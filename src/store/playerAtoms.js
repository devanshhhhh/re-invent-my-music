import { atom } from "recoil";

export const playerAtom=atom({
    key: "playerAtom",
    default: 'stop'
});

export const processAtom=atom({
    key: 'processAtom',
    default: true
});

export const currTrackAtom=atom({
    key: 'currTrackAtom',
    default: {}
});

export const currPlaylistAtom=atom({
    key: 'currPlaylistAtom',
    default: ""
});

export const listenedTracksAtom=atom({
    key: 'listenedTracksAtom',
    default: []
})