MOD=../trimet-mod-otp/node_modules/transit-components/
OTP=../otp-react-redux/node_modules/transit-components/

rm -r $MOD/build $OTP/build
cp -r build $MOD
cp -r build $OTP
ls -l $MOD $OTP
