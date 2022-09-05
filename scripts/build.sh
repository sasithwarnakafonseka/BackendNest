#!/bin/bash
cp /home/ec2-user/app/dev.env  /home/ec2-user/app/dev-api/.env
cd /home/ec2-user/app/dev-api
echo "======================================> Install dependancy"
npm i

echo "======================================> Build"
npm run build

echo "=======================================> Run migration"
npm run migration-run

echo "======================================> Start pm2"
~/.nvm/versions/node/v14.18.3/bin/pm2 describe dev-api> /dev/null
RUNNING=$?
if [ "${RUNNING}" -ne 0 ]; then
  ~/.nvm/versions/node/v14.18.3/bin/pm2 start /home/ec2-user/app/pm2.json --only dev-api
else
  ~/.nvm/versions/node/v14.18.3/bin/pm2 restart /home/ec2-user/app/pm2.json --only dev-api
fi;
