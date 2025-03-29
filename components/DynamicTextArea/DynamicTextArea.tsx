import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';
import { Control } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { Controller, useForm, useFormState, useWatch } from 'react-hook-form';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';

export interface DynamicTextareaProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
}

export const DynamicTextarea = <T extends FieldValues>({
  name,
  control
}: DynamicTextareaProps<T>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [containerHeight, setContainerHeight] = useState<string>('auto');

  const textAreaValue = useWatch({ control, name })

  const calculateHeight = (value: string | undefined) => {
    if (!textareaRef.current || !value || value === "") {
      return 'auto';
    }
    return `${Math.min(textareaRef.current.scrollHeight, 400)}px`;
  };

  const updateContainerHeight = (value: string | undefined) => {
    const newHeight = calculateHeight(value);
    setContainerHeight(newHeight);
  };

  useEffect(() => {
    updateContainerHeight(textAreaValue);
  }, [textAreaValue]);

  return (
    <div>
      <div className={styles.Tabs}>
        <button
          className={`${styles.Tab} ${mode === 'edit' ? styles.ActiveTab : ''}`}
          onClick={() => setMode('edit')}
        >
          Edit
        </button>
        <button
          className={`${styles.Tab} ${mode === 'preview' ? styles.ActiveTab : ''}`}
          onClick={() => setMode('preview')}
        >
          Preview
        </button>
      </div>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => {

          return (
            <div
              className={styles.TextAreaContainer}
              style={{
                height: containerHeight !== 'auto' ? containerHeight : undefined,
                minHeight: '50px'
              }}
            >
              {mode === 'preview' && value ? (
                <div
                  ref={previewRef}
                  className={styles.PreviewContainer}
                  style={{
                    height: '100%'
                  }}
                >
                  <MarkdownRenderer content={value} />
                </div>
              ) : (
                <textarea
                  className={styles.TextArea}
                  ref={textareaRef}
                  title='answer'
                  onChange={(e) => {
                    onChange(e);
                    updateContainerHeight(e.target.value);
                  }}
                  onFocus={() => {
                    if (value) {
                      updateContainerHeight(value);
                    }
                  }}
                  value={value}
                  style={{ height: '100%' }}
                />
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
