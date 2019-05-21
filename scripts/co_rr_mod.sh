function checkout_update () {
  B=$1
  echo co up $B
  git checkout $B
  git pull upstream $B
}


function update_forked_repo () {
  R=$1
  UP=$2

  rm -rf ../$R
  if [ ! -d ../$R/.git ]; then
    cd ..
    git clone git@github.com:TriMetPDX/$R.git
    cd -
  fi

  cd ../$R/
  git remote add upstream $UP
  git fetch upstream 

  checkout_update master

  git checkout -b vehicles
  git checkout vehicles
  git pull
  cd -
}


update_forked_repo otp-react-redux https://github.com/opentripplanner/otp-react-redux.git
checkout_update dev

update_forked_repo trimet-mod-otp  https://github.com/ibi-group/trimet-mod-otp.git
