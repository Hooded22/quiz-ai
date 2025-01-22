import { useRef } from 'react';

import styles from './styles.module.css';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FieldPath } from 'react-hook-form/dist/types/path';

export interface DynamicTextareaProps<T extends FieldValues> {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
}

export const DynamicTextarea = <T extends FieldValues>({
  register,
  name,
}: DynamicTextareaProps<T>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'min-content'; // Reset prior to recalculating
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`; // Calculate new height
    }
  };

  return (
    <textarea
      className={styles.TextArea}
      title='answer'
      {...register(name)}
      ref={textareaRef}
      onInput={handleChange}
    />
  );
};
