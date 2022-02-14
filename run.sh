cd ./services/readers-interface
sh run.sh &  PIDIOS=$!
cd ../../frontends/front-app/
sh run.sh &  PIDMIX=$!
wait $PIDIOS
wait $PIDMIX
cd ../../