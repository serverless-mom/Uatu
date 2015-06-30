var os=require('os')
var CronJob = require('cron').CronJob
var exec = require('exec')
//type-of-is is solely for debugging
var Type = require('type-of-is')
var util = require('util')

var fifteenMinNormalizedLoadAvg = 0.0
var currentData = {};

//prints the current date so I can make sure the cron is running like it should

function printExec(cmd){
  child = exec(cmd
    //TODO test on QA and prod how frequently we have to kill this child.
    , {timeout: 4500} //will kill this child process if it takes more than 4500ms to come back
    , function (error, stdout, stderr) {

      //this is fun but you can't redefine properties :()
      //TODO: make the commands an array that we iterate through and define properties.
      //Object.defineProperty(currentData, cmd, {value: stdout})


      console.log('stdout with command '+cmd+': ' + stdout)
      //okay not certain why, but stderr is coming out as '0' and error non-null
      //TODO: make that stop happening, maybe a result of OSX machine...
      //console.log('stderr: ' + stderr)
      //if (error !== null) {
      //  console.log('exec error: ' + error);
      //}
       console.log(util.inspect(currentData))
  });
}

function printCPU(){
    fifteenMinNormalizedLoadAvg = os.loadavg()[2]/os.cpus().length;
    console.log("fifteen minute load avg, normalized by CPU number: "+
    fifteenMinNormalizedLoadAvg)
}

function printFreeMemPercent(){
  console.log ("Free mem percentage: "+os.freemem()/os.totalmem() * 100)
}
//this takes cron notation which I guess always allowed seconds? ikr? weird?
new CronJob('* * * * * *', function(){
  printExec("date")
  printCPU()
  printFreeMemPercent()
  printExec("ps")
  printExec("df -h")
  printExec("top -l 1 | grep 'Chrome'|tail -n 1")



}, null, true, "America/Los_Angeles")
