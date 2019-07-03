function checkout_update () {
  R=$1
  B=$2
  cd ../$R/
  echo co up $R $B
  git checkout $B 
  git pull upstream $B
  git push

  # make sure we switch back to master
  git checkout master
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

# sync TM fork of OTP with IBI's fork
update_forked_repo OpenTripPlanner https://github.com/ibi-group/OpenTripPlanner.git

# sync TM fork of OTP-RR with IBI's fork
update_forked_repo otp-react-redux https://github.com/opentripplanner/otp-react-redux.git
checkout_update otp-react-redux dev

# sync TM fork of MOD with IBI's fork (current master / main repo for trimet-OTP-RR)
update_forked_repo trimet-mod-otp  https://github.com/ibi-group/trimet-mod-otp.git
