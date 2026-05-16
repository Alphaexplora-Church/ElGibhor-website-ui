import { useState, useEffect } from 'react';

interface OrientationState {
  x: number; // mapped -1 to 1 based on gamma
  y: number; // mapped -1 to 1 based on beta
  hasPermission: boolean;
  isSupported: boolean;
}

export function useDeviceOrientation(): OrientationState {
  const [state, setState] = useState<OrientationState>({
    x: 0,
    y: 0,
    hasPermission: false,
    isSupported: typeof window !== 'undefined' && 'DeviceOrientationEvent' in window,
  });

  useEffect(() => {
    if (!state.isSupported) return;

    // Check if permissions are needed (iOS 13+)
    // We try to attach the listener. On iOS, without explicit request, it might just drop,
    // so we set hasPermission to false initially and if we receive events, we flip it.
    let hasReceivedEvent = false;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!hasReceivedEvent) {
        hasReceivedEvent = true;
        setState(s => ({ ...s, hasPermission: true }));
      }

      // beta: front/back tilt [-180, 180] -> positive when tilting forward
      // gamma: left/right tilt [-90, 90] -> positive when tilting right
      const beta = event.beta ? Math.min(Math.max(event.beta, -45), 45) : 0;
      const gamma = event.gamma ? Math.min(Math.max(event.gamma, -45), 45) : 0;

      // map to roughly -1 to +1 range focusing on typical hold angles
      setState(s => ({
        ...s,
        x: gamma / 45,
        y: beta / 45,
      }));
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [state.isSupported]);

  return state;
}
