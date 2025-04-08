import { QuestionsSets, QuestionsSetsValues, RoleType } from '../types/interviewConfig';

export type RolesConfigType = {
  [key in RoleType]: Partial<{
    [key in QuestionsSetsValues]: number;
  }>;
};

export const RolesConfig: RolesConfigType = {
  [RoleType.FE_DEV]: {
    [QuestionsSets.HTML]: 20,
    [QuestionsSets.CSS]: 10,
    [QuestionsSets.JAVASCRIPT]: 70,
  },
  [RoleType.FE_DEV_REACT]: {
    [QuestionsSets.JAVASCRIPT]: 50,
    [QuestionsSets.REACT]: 50,
  },
  [RoleType.BE_JAVA]: {
    [QuestionsSets.JAVA]: 100,
  },
  [RoleType.BE_NODE]: {
    [QuestionsSets.JAVASCRIPT]: 50,
    [QuestionsSets.NODEJS]: 50,
  },
  [RoleType.FULL_STACK_NODE_REACT]: {
    [QuestionsSets.JAVASCRIPT]: 60,
    [QuestionsSets.NODEJS]: 20,
    [QuestionsSets.REACT]: 20,
  },
  [RoleType.DEV_OPS]: {
    [QuestionsSets.SQL]: 10,
    [QuestionsSets.DOCKER]: 30,
    [QuestionsSets.KUBERNETES]: 30,
    [QuestionsSets.WEB_SECURITY]: 30,
  },
};
