import { withLeaflet } from 'react-leaflet';


/**
 * this wrapper was created to help easing the code for back-porting to React v15
 * (e.g., this leaflet hook doesn't exist in v15, so for the backport, we comment out withLeaflet)
 */
export default function myWithLeaflet(clz) {
  return withLeaflet(clz);
}
