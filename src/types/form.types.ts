/**
 * 3. Mapped Types: Transforming Props and State
 *
 * Mapped types allow transforming existing type structures into:
 * - Form validation error states
 * - Field touch states
 * - Validator function signatures
 * - Readonly or partial configurations
 *
 * Benefits:
 * - Automatically stays in sync when fields are added or modified
 * - Prevents typos in error and touched state keys
 * - Compile-time exhaustiveness checking
 */

/**
 * Mapped type: Every key in model T is mapped to an optional error message string
 */
export type ValidationErrors<T> = {
  [K in keyof T]?: string | null;
};

/**
 * Mapped type: Every key in model T is mapped to a boolean touch state
 */
export type FormTouched<T> = {
  [K in keyof T]?: boolean;
};

/**
 * Mapped type: Every key in model T is mapped to its validator function
 */
export type FormValidators<T> = {
  [K in keyof T]?: (value: T[K], allValues: T) => string | null | undefined;
};

/**
 * Mapped type: Config definition for each field in form model T
 */
export type FormFieldConfig<T> = {
  [K in keyof T]: {
    label: string;
    placeholder?: string;
    required?: boolean;
  };
};

/**
 * Mapped type: Readonly snapshot of model T
 */
export type ReadonlyRecord<T> = {
  readonly [K in keyof T]: T[K];
};
