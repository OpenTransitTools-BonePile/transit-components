#
# will reset the repo to use React 15
#
echo "PREP for React 15"

if [ -d "node_modules" ]; then
  if [ -d "nm_16" ]; then
    echo "There's already an nm_16 directory !!!"
    echo "exiting..."
    exit -1
  fi

  mv ./node_modules ./nm_16
  rm -rf dist/*
fi

# react-15 branch holds React 15 junk
git checkout react-15

if [ -d "./nm_15" ]; then
  mv nm_15 node_modules
else
  rm yarn.lock
  yarn install
fi
