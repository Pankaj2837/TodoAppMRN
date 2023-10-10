import '../imports/startup/server/settings'
import '../imports/startup/server/accounts'
import '../imports/startup/server/tasks'
import '../imports/startup/server/userlist'
import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
    process.env['MONGO_URL'] = "mongodb://172.16.0.20:4001/Planner";
   });