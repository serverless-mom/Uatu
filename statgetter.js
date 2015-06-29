var os=require('os');
var sys = require('sys')
var exec = require('child_process').exec;
var CronJob = require('cron').CronJob;

var fifteenMinNormalizedLoadAvg = 0.0;

new CronJob('* * * * * *', function(){
  exec("date", console.log);

  fifteenMinNormalizedLoadAvg = os.loadavg()[2]/os.cpus().length;

  console.log("fifteen minute load avg, normalized by CPU number: "+
  fifteenMinNormalizedLoadAvg);
}, null, true, "America/Los_Angeles");
