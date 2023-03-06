export type GPTAnswerState =
| {
    type: "START";
  }
| {
    type: "WAITING_FOR_RESPONSE";
    loading: boolean;
  }
| {
    type: "SUCCESS";
    response: string;
    modalOpen: boolean;
  }
| {
    type: "ERROR";
    errorMessage: string;
  };


  export type Actions =
  | {
      type: "clearForm";
    }
  | {
      type: "setLoadingForResponse";
    }
  | {
      type: "setResponse";
      payload: { response: string };
    }
  | {
      type: "setError";
      payload: { errorMessage: string };
    };

export interface FormValues {
    answer: string;
  }

