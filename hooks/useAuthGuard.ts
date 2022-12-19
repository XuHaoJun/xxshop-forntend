import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useMe } from './useMe';

export default function useAuthGuard() {
  const { isFetching, isError, isRefetchError } = useMe();
  const router = useRouter();

  const checkIsAuthed = useCallback(
    () => !(!isFetching && (isError || isRefetchError)),
    [isFetching, isError, isRefetchError],
  );
  const [isAuthed, setIsAuthed] = useState(checkIsAuthed());

  useEffect(() => {
    const nextIsAuthed = checkIsAuthed();
    if (!nextIsAuthed) {
      setIsAuthed(nextIsAuthed);
      router.push('/login');
    }
  }, [checkIsAuthed, router]);

  return {
    isAuthed,
  };
}
