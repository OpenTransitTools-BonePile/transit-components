<a href="https://www.browserstack.com/automate/public-build/OVhaWXRrQysyU0tKM1JZL0p0ZDBwS2dXcitDT3RpamZNYW9tc3FLcGxDVT0\tLWhHYjloQzJWTTNES0FUdU52SjlTSkE9PQ==--9442d8aaef9206dcbf96e8c746804ade957f604d"><img src='https://www.browserstack.com/automate/badge.svg?badge_key=OVhaWXRrQysyU0tKM1JZL0p0ZDBwS2dXcitDT3RpamZNYW9tc3FLcGxDVT0tLWhHYjloQzJWTTNES0FUdU52SjlTSkE9PQ==--9442d8aaef9206dcbf96e8c746804ade957f604d'></a>

Scratch pad for building transit map components in react

 NEXT:
  a) sort MOD fork and get stop / mode icons up on MOD map
  b) add vehicles to MOD map (route select)
  c) deploy vehicles to prod / make it so we can  
  d) test (automated tests?)
  e) work on the TODO list below


 DONE:
   - switch between tilesets
   - configuration + default point and zoom, etc...
   - make a layer control
   - allow config to be injected into this class some way ... maybe via a test app
   - HtmlWebpackPlugin({ with index templ ala MOD and index.html
   - refactor config so that we're not hard-coded to use ../common/config.yml
   - tons of work on RT vehicles


 TODO:
   a) select vehicle, grey out other vehicles
   b) add overlays (routes / patterns / stops)
   c) interpolated vehicle position -- Streetcar / estimated position vs. RT
   d) select vehicle - center, follow, etc...
   e) add search
   f) add route list - select routes to show vehicles
   g) localize
   h) make a pan control
   i) clean up the control stuff below: more dynamic (layer names & number button from .yml),
      option to put it in layer switcher or as buttons, etc...
   j) cleanup
   

FYI:
   git update-index --assume-unchanged yarn.lock
   
