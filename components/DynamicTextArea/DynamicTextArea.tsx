import { RefObject, useEffect, useRef } from 'react';

import styles from './styles.module.css';
import { Control } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { Controller } from 'react-hook-form';

export interface DynamicTextareaProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
}

export const DynamicTextarea = <T extends FieldValues>({
  name,
  control
}: DynamicTextareaProps<T>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getStyles = (value: string | undefined, textareaRef: RefObject<HTMLTextAreaElement>) => {

    if (!textareaRef.current || !value || value === "") {
      return {}
    }

    return {
      height: `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref } }) => {

        return (
          <textarea
            className={styles.TextArea}
            ref={textareaRef}
            title='answer'
            onChange={(e) => {
              console.log("Text area change")
              onChange(e);
            }}
            value={value}
            style={
              {
                height: "min-content",
                ...getStyles(value, textareaRef)
              }
            }
          />
        );
      }}
    />
  );
};
