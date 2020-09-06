# MAKE THIS SCRIPT EXECUTABLE WITH THE COMMAND SUDO CHMOD 744 ./SCRIPT/00-INSTALL-DEV.SH
# This script can be use to populate a database

#!/usr/bin/env bash
set -e

# Build app and api containers
docker-compose -f docker/docker-compose.dev.yml build

# Launch the db alone once and give it time to create db user and database
# This is a quickfix to avoid waiting for database to startup on first execution (more details [here](https://docs.docker.com/compose/startup-order/))
docker-compose -f docker/docker-compose.dev.yml up -d db
sleep 5
docker-compose -f docker/docker-compose.dev.yml stop db