import { useEffect, useState } from "react";

export const useDevice = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => { setFirstLoad(false); }, []);

  const ssr = firstLoad || typeof navigator === "undefined";

  const isMobile = !ssr && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  return {
    isDesktop: !isMobile,
    isMobile
  };
};