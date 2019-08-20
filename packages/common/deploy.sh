git pull
rm -rf dist
yarn install
yarn build
scp -r dist/* modbeta@cs-pd-pubweb01:~/public/vehicles/
