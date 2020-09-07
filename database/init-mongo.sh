#!/usr/bin/env bash
set -eu
mongo -- "$APP_MONGO_DB" << EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    var user = '$MONGO_INITDB_USERNAME';
    var passwd = '$MONGO_INITDB_ROOT_PASSWORD;
    db.createUser({user: user, pwd: passwd, roles: ["readWrite"]});
    var db = db.getSiblingDB("test-database");
    db.email.insert({"email":"gcolon021@gmail.com"});
EOF