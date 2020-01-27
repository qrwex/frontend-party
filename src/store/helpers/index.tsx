export const setLoading = <T extends {}>(state: T, loading: boolean): T => (
  { ...state, loading }
);
