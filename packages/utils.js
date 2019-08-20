const DEBUG = false;

function log(msg, debug) {
  if(typeof debug === "undefined")
    debug = DEBUG;
  if(debug)
    console.log(msg);
}

function logTime(name, debug) {
  if(typeof debug === "undefined")
    debug = DEBUG;
  if(debug)
    console.log(`${name}: ` + Date.now());
}

function start(debug) {
  logTime("start", debug);
}

function end(debug) {
  logTime("end  ", debug);
}

export {
  log,
  logTime,
  start,
  end,
  DEBUG
}