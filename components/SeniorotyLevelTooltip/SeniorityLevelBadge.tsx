import { SeniorityLevelToTextMap } from "constants/questionsParamsToTextMap";
import { SeniorityLevelType, SeniorityLevel } from "types/interviewConfig";
import styles from "./styles.module.css"

interface SeniorityLevelBadgeProps {
    level: SeniorityLevelType
}

export const SeniorityLevelBadge = ({ level }: SeniorityLevelBadgeProps) => {
    const levelToVariantMap = {
        [SeniorityLevel.ALL]: 'success',
        [SeniorityLevel.JUNIOR]: "success",
        [SeniorityLevel.MID]: "warning",
        [SeniorityLevel.SENIOR]: "danger"
    }

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.badge} ${styles[levelToVariantMap[level]]}`} >
                <div>{SeniorityLevelToTextMap[level]}</div>
            </div>
        </div>
    )

}