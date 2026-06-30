import { MISSION_TAB } from './constants';

type MissionTabKey = keyof typeof MISSION_TAB;

export type MissionTab = (typeof MISSION_TAB)[MissionTabKey];
