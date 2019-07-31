<a href="https://www.browserstack.com/automate/public-build/OVhaWXRrQysyU0tKM1JZL0p0ZDBwS2dXcitDT3RpamZNYW9tc3FLcGxDVT0\tLWhHYjloQzJWTTNES0FUdU52SjlTSkE9PQ==--9442d8aaef9206dcbf96e8c746804ade957f604d"><img src='https://www.browserstack.com/automate/badge.svg?badge_key=OVhaWXRrQysyU0tKM1JZL0p0ZDBwS2dXcitDT3RpamZNYW9tc3FLcGxDVT0tLWhHYjloQzJWTTNES0FUdU52SjlTSkE9PQ==--9442d8aaef9206dcbf96e8c746804ade957f604d'></a>

Vehicle Apps & Services:
--
 - https://modbeta.trimet.org/vehicles/?routeId=all
 - https://maps.trimet.org/gtfs/rt/vehicles/routes/all
 - https://betaplanner.trimet.org/ws/ti/v0/index/routes
 - https://maps7.trimet.org/ti/index/patterns/TriMet:420074/geometry/geojson
 - https://maps7.trimet.org/ti/index/patterns/TriMet:420074/geometry
 - https://betaplanner.trimet.org/ws/ti/v0/index/patterns/TriMet:3/geometry
 - https://betaplanner.trimet.org/ws/ti/v0/index/patterns/TriMet:420074/geometry/geojson
 - https://maps.trimet.org/otp_mod/index/patterns/TriMet:0:xxxx/geometry/geojson (stupid OTP TI pattern numbered junk)
 - https://betaplanner.trimet.org/ws/ti/v0/index/patterns/TriMet:3/geometry/geojson # NOTE: throws exception


Backport to React 15:
--
 a. check out master
 b. run scripts/make_new_dev_branch.sh
 c. grab package.json with the React 15.0 dependencies from another branch on github
 d. replace withLeaflet hook (5 places in map & vehicles) with function withLeaflet(x) {return x;}
 e. map now renders...
 f. remove locate control from map (TransitMap.)
 g. remove layer switcher code from map (TransitMap.js)
 g. rewrite RotatedMarker.js (see earlier commits to R 15 branches)
 h. add in leaflet context so we can get at zoom layers
 i. this.refs.map.leafletElement


TODO Items:
--
   1. add overlays (routes / patterns / stops)
   1. interpolated vehicle position -- Streetcar / estimated position vs. RT
   1. add search
   1. add route list - select routes to show vehicles
   1. localize
   1. make a pan control
   1. clean up the control stuff below: more dynamic (layer names & number button from .yml),
      option to put it in layer switcher or as buttons, etc...
   1. cleanup
   

FYI:
--
   git update-index --assume-unchanged yarn.lock
   
