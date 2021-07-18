kill $(cat lifologypid.pid)
git pull
npm install
npm run dev &
echo $! > lifologypid.pid