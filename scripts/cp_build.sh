rm -rf build dist
yarn install
yarn build

RR=otp-react-redux 
MOD=trimet-mod-otp

for d in $RR $MOD
do
  if [ ! -f ../$d/.git ]; then
    echo "IMPORTANT NOTE: $d is not a git repo"
  else
    cd ../$d
    git pull
    yarn install
    yarn build
    cd -
  fi
    
  TC=../$d/node_modules/transit-components/
  mkdir -p $TC
  rm -rf $TC/build
  cp -r build $TC/
  cp lib/common/config.yml $TC/lib/common/
done

