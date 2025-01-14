
export const RoleType = {
    FE_DEV_REACT: "FrontDeveloperReact",
    FE_DEV: "FrontDeveloper",
    FULL_STACK_NODE_REACT: "FullStackReactNodeDev",
    BE_NODE: "NodeJsDev",
    BE_JAVA: "JavaDev",
} as const;

export const QuestionsSets = {
    JAVASCRIPT: "javascript",
    NODEJS: "nodejs",
    JAVA: "java",
    REACT: "react",
    TYPESCRIPT: "typescript",
    HTML: "html",
    CSS: "css",
} as const;

export const SeniorityLevel = {
    ALL: "All",
    ENTRY: "Entry",
    JUNIOR: "Junior",
    MID: "Mid",
    SENIOR: "Senior",
} as const;

export const QuestionsNumber = {
    THREE: "3",
    FIVE: "5",
    TEN: "10",
    FIFTEEN: "15",
} as const;

export const TimeLimit = {
    NONE: "none",
    FIVE_MIN: "5min",
    TEN_MIN: "10min",
    FIFTEEN_MIN: "15min",
    THIRTY_MIN: "30min",
    ONE_HOUR: "1hour",
} as const;

// Use the output of the `as const` enums to infer the type for each
export type RoleType = typeof RoleType[keyof typeof RoleType];
export type SeniorityLevel = typeof SeniorityLevel[keyof typeof SeniorityLevel];
export type QuestionsNumber = typeof QuestionsNumber[keyof typeof QuestionsNumber];
export type TimeLimit = typeof TimeLimit[keyof typeof TimeLimit];
export type QuestionsSetsValues = typeof QuestionsSets[keyof typeof QuestionsSets];

// Update the `InterviewConfig` type to use the enums
export type InterviewConfig = {
    roleType: RoleType;
    seniorityLevel: SeniorityLevel;
    questionsNumber: QuestionsNumber;
    timeLimit: TimeLimit;
    questionsCanRepeat: boolean;
};
