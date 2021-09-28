import { useReducer, useEffect } from 'react';

export function usePromise(resolvePromise, deps) {
  const [{ data, error, loading }, setState] = useReducer(
    (base, point) => ({ ...base, ...point }),
    {
      loading: true,
      error: null,
      data: null,
    }
  );
  useEffect(() => {
    (async () => {
      try {
        setState({ loading: true, error: null, data: null });
        const result = await resolvePromise();
        setState({ data: result, loading: false });
      } catch (error) {
        setState({ error, loading: false });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return [loading, data, error];
}
