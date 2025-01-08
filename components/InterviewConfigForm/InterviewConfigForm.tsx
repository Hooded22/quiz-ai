"use client";

import {useState} from "react";
import styles from './styles.module.css'
import {InterviewConfig, QuestionsNumber, RoleType, SeniorityLevel, TimeLimit} from "../../types/interviewConfig";
import {useRouter} from "next/navigation";


const QuestionForm = () => {
    const [formState, setFormState] = useState<Partial<InterviewConfig>>({
        seniorityLevel: 'All',
        timeLimit: 'none',
        questionsCanRepeat: false,
    });

    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
const {push} = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? !!value : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Clear any previous error messages and submission status
        setErrorMessages([]);
        setSubmissionStatus(null);

        if (!formState.roleType) {
            return setErrorMessages(['Invalid or missing role type.']);
        }

        if (!formState.questionsNumber) {
            return setErrorMessages(['Invalid or missing number of questions.']);
        }

        const searchParams = new URLSearchParams({
            seniorityLevel: formState.seniorityLevel || "All",
            questionsNumber: formState.questionsNumber.toString(),
            timeLimit: formState.timeLimit || "none",
            questionsCanRepeat: formState.questionsCanRepeat?.toString() || '',
        });

        const redirectUrl = `/interview/${formState.roleType.toLowerCase()}/?${searchParams.toString()}`;
       push(redirectUrl)
    };

    return (
        <div className={styles.formContainer}>
            <h2>Create Quiz</h2>
            <form className={styles.formElement} onSubmit={handleSubmit}>
                <div>
                    <label className={styles.label} htmlFor="roleType">Role Type *</label>
                    <select className={styles.select} id="roleType" name="roleType" value={formState.roleType} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="Javascript">Javascript</option>
                        <option value="NodeJs">Node.js</option>
                        <option value="Java">Java</option>
                    </select>
                </div>

                <div>
                    <label className={styles.label} htmlFor="seniorityLevel">Seniority Level</label>
                    <select className={styles.select} id="seniorityLevel" name="seniorityLevel" value={formState.seniorityLevel} onChange={handleChange}>
                        <option value="All">All</option>
                        <option value="Entry">Entry</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>

                <div>
                    <label className={styles.label} htmlFor="questionsNumber">Questions Number *</label>
                    <select className={styles.select} id="questionsNumber" name="questionsNumber" value={formState.questionsNumber} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

                <div>
                    <label className={styles.label} htmlFor="timeLimit">Time Limit</label>
                    <select className={styles.select} id="timeLimit" name="timeLimit" value={formState.timeLimit} onChange={handleChange}>
                        <option value="none">None</option>
                        <option value="5min">5 min</option>
                        <option value="10min">10 min</option>
                        <option value="15min">15 min</option>
                        <option value="30min">30 min</option>
                        <option value="1hour">1 hour</option>
                    </select>
                </div>

                <div>
                    <label className={styles.label} htmlFor="questionsCanRepeat">
                        <input className={styles.checkbox} type="checkbox" id="questionsCanRepeat" name="questionsCanRepeat" checked={formState.questionsCanRepeat} onChange={handleChange} />
                        Questions can repeat
                    </label>
                </div>

                <button className={styles.button} type="submit">Submit</button>
            </form>
            {errorMessages.length > 0 && <div>{errorMessages.map(msg => <p key={msg}>{msg}</p>)}</div>}
            {submissionStatus && <div>{submissionStatus}</div>}
        </div>
    );
};

export default QuestionForm;