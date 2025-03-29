export const FEATURE_FLAGS = {
    interviewConfig: {
        time: false,
        repeateQuestions: false
    },
    auth: {
        createAccount: false
    },
    landingPage: process.env.VERSION === "beta"
}