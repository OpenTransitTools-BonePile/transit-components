#!/bin/bash

##
## cd vehicles/
## ./scripts/new_dev_branch august-release
##

function new_dev_branch () {
  D=$(date +"%m_%d_%Y")
  R=$1
  B=${2:-"vehicles"}-$D

  echo "checking out (new) branch $B"

  cd ../$R/

  # step 1: get latest master
  git checkout master
  git pull

  # step 2: create new branch and then push it up to fork'd repo
  git checkout -b $B 
  git checkout $B 
  git push --set-upstream origin $B
  git pull

  cd -
}

# create new dev branch on OTT-TC, OTP-RR and MOD forks
new_dev_branch transit-components $1
new_dev_branch otp-react-redux $1
new_dev_branch trimet-mod-otp $1


echo "NOTE: git cherry-pick <d467740>"
