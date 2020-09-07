// Documentation Regarding Mongo Scripts can be found here: https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/
db = db.getSiblingDB("test-database");
db.email.insert({"email":"gcolon021@gmail.com"});