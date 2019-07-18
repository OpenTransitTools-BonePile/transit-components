<a href="https://www.browserstack.com/automate/public-build/OVhaWXRrQysyU0tKM1JZL0p0ZDBwS2dXcitDT3RpamZNYW9tc3FLcGxDVT0\tLWhHYjloQzJWTTNES0FUdU52SjlTSkE9PQ==--9442d8aaef9206dcbf96e8c746804ade957f604d"><img src='https://www.browserstack.com/automate/badge.svg?badge_key=OVhaWXRrQysyU0tKM1JZL0p0ZDBwS2dXcitDT3RpamZNYW9tc3FLcGxDVT0tLWhHYjloQzJWTTNES0FUdU52SjlTSkE9PQ==--9442d8aaef9206dcbf96e8c746804ade957f604d'></a>

Services:
 - https://modbeta.trimet.org/vehicles/?routeId=all
 - https://maps.trimet.org/gtfs/rt/vehicles/routes/all
 - https://betaplanner.trimet.org/ws/ti/v0/index/routes
 - https://maps7.trimet.org/ti/index/patterns/TriMet:420074/geometry/geojson
 - https://maps7.trimet.org/ti/index/patterns/TriMet:420074/geometry
 - https://betaplanner.trimet.org/ws/ti/v0/index/patterns/TriMet:3/geometry
 - https://betaplanner.trimet.org/ws/ti/v0/index/patterns/TriMet:420074/geometry/geojson
 - https://maps.trimet.org/otp_mod/index/patterns/TriMet:0:xxxx/geometry/geojson (stupid OTP TI pattern numbered junk)
 - https://betaplanner.trimet.org/ws/ti/v0/index/patterns/TriMet:3/geometry/geojson # NOTE: throws exception

 
Scratch pad for building transit map components in react


 NEXT:
  1. sort MOD fork and get stop / mode icons up on MOD map
  1. add vehicles to MOD map (route select)
  1. deploy vehicles to prod / make it so we can  
  1. test (automated tests?)
  1. work on the TODO list below


 DONE:
   - switch between tilesets
   - configuration + default point and zoom, etc...
   - make a layer control
   - allow config to be injected into this class some way ... maybe via a test app
   - HtmlWebpackPlugin({ with index templ ala MOD and index.html
   - refactor config so that we're not hard-coded to use ../common/config.yml
   - tons of work on RT vehicles


 TODO:
   1. select vehicle, grey out other vehicles
   1. add overlays (routes / patterns / stops)
   1. interpolated vehicle position -- Streetcar / estimated position vs. RT
   1. select vehicle - center, follow, etc...
   1. add search
   1. add route list - select routes to show vehicles
   1. localize
   1. make a pan control
   1. clean up the control stuff below: more dynamic (layer names & number button from .yml),
      option to put it in layer switcher or as buttons, etc...
   1. cleanup
   

FYI:
   git update-index --assume-unchanged yarn.lock
   
