function new_dev_branch () {
  D=$(date +"%m_%d_%Y")
  R=$1
  B=${2:-"vehicles"}-$D

  echo checkout $B

  cd ../$R/
  git checkout -b $B 
  git checkout $B 
  git push --set-upstream origin $B
  git pull
  cd -
}

# create new dev branch
new_dev_branch otp-react-redux $1
new_dev_branch trimet-mod-otp $1


echo "NOTE: git cherry-pick <d467740>"
