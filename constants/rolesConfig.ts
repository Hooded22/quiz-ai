import {QuestionsSets, QuestionsSetsValues, RoleType} from "../types/interviewConfig";

export type RolesConfigType = {[key in RoleType]: {[key in string]: number}}

export const RolesConfig: RolesConfigType = {
    [RoleType.FE_DEV]: {
        [QuestionsSets.HTML]: 20,
        [QuestionsSets.CSS]: 10,
        [QuestionsSets.JAVASCRIPT]: 70
    },
    [RoleType.FE_DEV_REACT]: {},
    [RoleType.BE_JAVA]: {},
    [RoleType.BE_NODE]: {},
    [RoleType.FULL_STACK_NODE_REACT]: {}
}
