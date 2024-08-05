import { useEffect, useRef } from 'react';

function useRenderCount(componentName: string) {
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`${componentName} rendered ${renderCount.current} times`);
  });

  return renderCount.current;
}

export default useRenderCount;
