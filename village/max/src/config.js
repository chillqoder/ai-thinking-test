// Global configuration. Everything animated in the scene is a pure function of the
// loop time t ∈ [0, LOOP), so the world at t = LOOP is identical to the world at t = 0.

const params = new URLSearchParams(window.location.search);

const num = (key, fallback) => {
  const v = parseFloat(params.get(key));
  return Number.isFinite(v) ? v : fallback;
};

/** Length of the seamless loop in seconds. Every periodic motion must divide it. */
export const LOOP = 60;

/**
 * Optional URL parameters (all of them are developer conveniences – the scene itself
 * needs no input):
 *   ?daynight=0   keep permanent daylight instead of the subtle day/night cycle
 *   ?t=12.5       start the loop at a given time
 *   ?freeze=12.5  render a single frozen moment of the loop
 *   ?speed=2      play the loop faster or slower
 *   ?cam=free     orbit controls instead of the cinematic camera ("top" = map view)
 *   ?debug        show loop time / fps overlay
 *   ?shadows=0    disable shadows,  ?dpr=1  cap the pixel ratio
 */
export const SETTINGS = {
  debug: params.has('debug'),
  dayNight: params.get('daynight') !== '0',
  startTime: num('t', 0),
  freeze: params.has('freeze') ? num('freeze', 0) : null,
  speed: num('speed', 1),
  camera: params.get('cam') ?? 'cinematic',
  shadows: params.get('shadows') !== '0',
  shadowMapSize: num('shadowmap', 2048),
  maxPixelRatio: num('dpr', 2),
};
