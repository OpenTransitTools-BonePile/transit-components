function checkout_update () {
  R=$1
  B=$2
  cd ../$R/
  echo co up $B
  git checkout $B && git pull upstream $B
  cd -
}


function update_forked_repo () {
  R=$1
  UP=$2

  rm -rf ../$R
  if [ ! -d ../$R/.git ]; then
    # clone repo in parent dir
    cd ..
    git clone git@github.com:TriMetPDX/$R.git
    cd -

    # set upstream
    cd ../$R/
    git remote add upstream $UP
    cd -
  fi

  checkout_update $R master
}


update_forked_repo otp-react-redux https://github.com/opentripplanner/otp-react-redux.git
checkout_update otp-react-redux dev

update_forked_repo trimet-mod-otp  https://github.com/ibi-group/trimet-mod-otp.git
