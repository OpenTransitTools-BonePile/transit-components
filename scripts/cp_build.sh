yarn build

TO_DIR=../otp-react-redux/node_modules/transit-components/
rm -rf /tmp/build
mv $TO_DIR/build /tmp/
cp -r build $TO_DIR