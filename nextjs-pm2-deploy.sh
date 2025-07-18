echo "Deployment starting..."

# install dependencies if any


# set build folder to `temp` and build
BUILD_DIR=temp npm run build || exit

if [ ! -d "temp" ]; then
  echo '\033[31m temp directory does not exist!\033[0m'  
  exit 1;
fi

# delete `.next` folder
rm -rf .next

# rename `temp` folder to `.next`
mv temp .next

# run next start
pm2 stop crm

pm2 start crm

echo "Deployment done."