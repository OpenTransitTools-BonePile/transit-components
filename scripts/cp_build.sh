TC=transit-components
RR=otp-react-redux 
MOD=trimet-mod-otp



function pull_build () {
  R=$1
  B=${2:-"BUILD"}
  cd ../$R/
  echo "PULL & INSTALL $R"
  git pull
  yarn install
  yarn prepublish
  if [ $B == "BUILD" ]; then
    echo "BUILDING $R"
    yarn build
  fi
  cd -
}


function update_nm_build () {
  TO=$1
  FM=$2

  cd ../$TO/
  TO_NM=./node_modules/$FM
  echo "mkdir -p $TO_NM"
  mkdir -p $TO_NM
  rm -rf $TO_NM/build
  cp -r ../$FM/build $TO_NM/
  cd -
}



# step 1: update this (transit-components) project
rm -rf build dist
yarn install
yarn build

# step 2: update the RR and MOD projects (so we have something to work with ... even tho we will rebuild again below)
for d in $RR $MOD
do
  if [ ! -d ../$d/.git ]; then
    echo "IMPORTANT NOTE: $d is not a git repo !!!!!"
  else
    pull_build $d "DONT_BUILD"
  fi
done
    
# step 3: copy build over to OTP-RR
update_nm_build $RR $TC

# step 4: now re-build OTP-RR
pull_build $RR "DONT_BUILD"

# step 5: copy OTP-RR build over to MOD and rebuild
update_nm_build $MOD $RR
#pull_build $MOD
