
export const RoleType = {
    JAVASCRIPT: "Javascript",
    NODEJS: "NodeJs",
    JAVA: "Java",
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
type RoleType = typeof RoleType[keyof typeof RoleType];
type SeniorityLevel = typeof SeniorityLevel[keyof typeof SeniorityLevel];
type QuestionsNumber = typeof QuestionsNumber[keyof typeof QuestionsNumber];
type TimeLimit = typeof TimeLimit[keyof typeof TimeLimit];

// Update the `InterviewConfig` type to use the enums
export type InterviewConfig = {
    roleType: RoleType;
    seniorityLevel: SeniorityLevel;
    questionsNumber: QuestionsNumber;
    timeLimit: TimeLimit;
    questionsCanRepeat: boolean;
};