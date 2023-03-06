"use client";

import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Input,
  TextField,
} from "@mui/material";
import { useMakeAnswerForm } from "./useMakeAnswerForm";
import styles from "./styles.module.css";
import { Loader } from "../Loader";

interface MakeAnswerFormProps {
  questions: string[];
}

export function MakeAnswerForm({ questions }: MakeAnswerFormProps) {
  const { register, onSubmit, drawNewQuestion, drawnQuestion, state } =
    useMakeAnswerForm(questions);

  const isLoading = state.type === "WAITING_FOR_RESPONSE" && state.loading;

  return (
    <Card className={styles.container}>
      <Loader loading={isLoading} />
      <CardContent className={styles.content}>
        <h1 className={styles.question}>{drawnQuestion}</h1>
        <TextField
          {...register("answer")}
          multiline
          fullWidth
          variant="outlined"
          minRows={4}
        />
        {state.type === "SUCCESS" && (
          <p className={styles.response}>{state.response}</p>
        )}
        <div className={styles.buttonsWrapper}>
          <Button onClick={onSubmit} variant="outlined">
            Send answer
          </Button>
          <Button onClick={drawNewQuestion} variant="outlined">
            Get new question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
