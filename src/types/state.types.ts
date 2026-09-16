/**
 * 1. Discriminated Union for Asynchronous State Management
 * 
 * Guarantees:
 * - Mutually exclusive states: cannot simultaneously have data and error
 * - State transitions are explicit and well-defined
 * - Compile-time exhaustiveness checking with switch statements
 */
export type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: T | null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string };

/**
 * Type guard for success state in discriminated union
 */
export function isAsyncSuccess<T>(
  state: AsyncState<T>
): state is { status: 'success'; data: T; error: null } {
  return state.status === 'success';
}

/**
 * Type guard for error state in discriminated union
 */
export function isAsyncError<T>(
  state: AsyncState<T>
): state is { status: 'error'; data: null; error: string } {
  return state.status === 'error';
}
