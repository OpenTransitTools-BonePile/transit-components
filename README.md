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
 1. check out master
 1. run scripts/make_new_dev_branch.sh
 1. grab package.json with the React 15.0 dependencies from another branch on github
 1. rm -rf node_modules yarn.lock build/* 
 1. yarn install
 1. rewrite RotatedMarker.js (see earlier commits to R 15 branches)
 1. edit SelectVehicles.getLeafletContext()
 1. edit SelectVehicles - add leaflet={this.getLeafletContext()} to <VehicleMarker> 
 1. edit MyWithLeaflet.js hook ... return clz;
 1. remove locate control from map (TransitMap.)
 1. remove layer switcher code from map (TransitMap.js)
 1. yarn build
 1. git commit -a -m "Backport to React 15"


Integrate Vehicles into MOD
--
 1. run scripts/co_rr_mod.sh
 1. cd ../otp-react-redux/
 1. edit package.json -- add dependency to OpenTransitTools/transit-components#<branch-name> 
    "transit-components": "github:OpenTransitTools/transit-components#vehicles-08_01_2019",
 1. yarn install -- should see node_modules/transit-components:
 1. copy config.yml otp-rr base dir
 1. edit lib/components/map/default-map.js (line ~45) to add in Vehicles layer
    goingt to copy contents from transit-components'  
 1. yarn start -- should see 



TODO Items:
--
 1. refactor -- Component Library best practices / etc...
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
   
