import { useRef } from 'react';

import styles from './styles.module.css';
import { Control, UseFormRegister } from 'react-hook-form/dist/types/form';
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

  const handleChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'min-content'; // Reset prior to recalculating
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`; // Calculate new height
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <textarea
          className={styles.TextArea}
          ref={textareaRef}
          title='answer'
          onChange={onChange}
          value={value}
          onInput={handleChange}
        />
      )}
    />

  );
};
