rm -rf build dist
yarn build

for d in ../otp-react-redux ../otp-react-redux
do
  TC=$d/node_modules/transit-components/
  mkdir -p $TC
  rm -rf $TC/build
  cp -r build $TC/
  cp lib/common/config.yml $TC/lib/common/
done

