import { CircularProgress } from "@mui/material";
import styles from "./index.module.css";

export const Loader = ({
  text,
  loading,
}: {
  text?: string;
  loading: boolean;
}) =>
  loading ? (
    <div className={styles.loader}>
      <CircularProgress />
      {text && <p>{text}</p>}
    </div>
  ) : null;
