echo "PREP for React 16"

if [ -d "node_modules" ]; then
    if [ -d "nm_15" ]; then
        echo "There's already an nm_15 directory !!!"
        echo "exiting..."
        exit -1
    fi

    mv ./node_modules ./nm_15
fi


if [ -d "./nm_16" ]; then
  mv nm_16 node_modules
else
  rm yarn.lock
  yarn install
fi
