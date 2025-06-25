import { useEffect, useLayoutEffect } from "react";

// Use useLayoutEffect on the client and useEffect on the server
// This prevents hydration mismatches in Next.js
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
