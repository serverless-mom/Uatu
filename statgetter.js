var os=require('os');
var CronJob = require('cron').CronJob;
var ps = require('ps-node');

//these two requirements are so I can run arbitrary execs, may not go to prod
var sys = require('sys')
var exec = require('child_process').exec;


var fifteenMinNormalizedLoadAvg = 0.0;

var ps = require('ps-node');

// A simple pid lookup
ps.lookup({
    command: 'node',
    }, function(err, resultList ) {
    if (err) {
        throw new Error( err );
    }
    console.log("I found "+resultList.length+" results")

    resultList.forEach(function( process ){
        if( process ){

            console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
        }
    });
});

new CronJob('* * * * * *', function(){
  //prints the current date so I can make sure the cron is running like it should
  exec("date", console.log);

  fifteenMinNormalizedLoadAvg = os.loadavg()[2]/os.cpus().length;

  console.log("fifteen minute load avg, normalized by CPU number: "+
  fifteenMinNormalizedLoadAvg);
}, null, true, "America/Los_Angeles");
