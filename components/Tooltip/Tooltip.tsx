
export type TooltipVariant = "success" | "warning" | "danger"
export interface TooltipProps {
  title: string;
  details: string;
  variant: TooltipVariant
}

import styles from "./styles.module.css";

export const Tooltip = ({ title, variant, details }: TooltipProps) => {
  return (
    <div className={styles.tooltipWrapper}>
      <div className={styles.tooltip} data-tip={details}>
        <div className={`${styles.badge} ${styles[variant]}`}>
          {title}
        </div>
      </div>
    </div>
  );
};
