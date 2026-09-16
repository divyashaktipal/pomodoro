import { useState, useCallback } from 'react';
import { ValidationErrors, FormTouched, FormValidators } from '@/types/form.types';

export interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T;
  validators?: FormValidators<T>;
  onSubmit: (values: T) => void;
}

/**
 * Generic form handling hook utilizing mapped types for validation errors,
 * touched state, and change handlers with complete compile-time type safety.
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validators = {},
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<FormTouched<T>>({});

  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value };
        // Validate if validator exists for this field
        if (validators[field]) {
          const errorMsg = validators[field]!(value, next);
          setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMsg || null }));
        }
        return next;
      });
    },
    [validators]
  );

  const setFieldTouched = useCallback(<K extends keyof T>(field: K) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors<T> = {};
    let isValid = true;

    for (const key of Object.keys(validators) as Array<keyof T>) {
      const validator = validators[key];
      if (validator) {
        const error = validator(values[key], values);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [validators, values]);

  const handleSubmit = useCallback(() => {
    // Mark all touched
    const allTouched: FormTouched<T> = {};
    for (const key of Object.keys(values) as Array<keyof T>) {
      allTouched[key] = true;
    }
    setTouched(allTouched);

    if (validateAll()) {
      onSubmit(values);
    }
  }, [values, validateAll, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm,
    isValid: Object.values(errors).every((e) => !e),
  };
}
