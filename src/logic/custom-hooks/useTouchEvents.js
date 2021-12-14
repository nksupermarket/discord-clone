import { useState } from 'react';

export default function useTouchEvents(onRightSwipe, onLeftSwipe) {
  const [touchStart, setTouchStart] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [touchEnd, setTouchEnd] = useState(0);

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }
  function handleTouchMove(e) {
    setIsMoved(true);
    setTouchEnd(e.targetTouches[0].clientX);
  }
  function handleTouchEnd() {
    if (isMoved) {
      console.log(touchStart, touchEnd);
      if (touchStart - touchEnd > 150) {
        onRightSwipe && onRightSwipe();
      }
      if (touchStart - touchEnd < -150) {
        onLeftSwipe && onLeftSwipe();
      }
    }
    setTouchEnd(0);
    setTouchStart(0);
    setIsMoved(false);
  }

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}
