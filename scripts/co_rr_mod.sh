function checkout_update () {
  R=$1
  B=$2
  cd ../$R/
  echo co up $B
  git checkout $B 
  git pull upstream $B
  git push
  cd -
}


function update_forked_repo () {
  R=$1
  UP=$2

  # NOTE: below removes any existing repos
  #rm -rf ../$R

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


# sync TM fork of OTP-RR with oritinal otp repo (master and dev branches)
update_forked_repo otp-react-redux https://github.com/opentripplanner/otp-react-redux.git
checkout_update otp-react-redux dev


# sync TM fork of MOD with original ibi repo (master branch)
update_forked_repo trimet-mod-otp  https://github.com/ibi-group/trimet-mod-otp.git

