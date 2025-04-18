import { RoleType, SeniorityLevel } from '../types/interviewConfig';

export const RolesIdsToTextMap = {
  [RoleType.BE_NODE]: 'Node Back-end developer',
  [RoleType.BE_JAVA]: 'Java Back-end developer',
  [RoleType.FE_DEV]: 'Front-end developer',
  [RoleType.FULL_STACK_NODE_REACT]: 'Full-stack developer with Node',
  [RoleType.FE_DEV_REACT]: 'Front-end developer with React',
  [RoleType.DEV_OPS]: 'DevOps developer',
};

export const SeniorityLevelToTextMap = {
  [SeniorityLevel.ALL]: 'All',
  [SeniorityLevel.JUNIOR]: 'Junior',
  [SeniorityLevel.MID]: 'Mid',
  [SeniorityLevel.SENIOR]: 'Senior',
};
