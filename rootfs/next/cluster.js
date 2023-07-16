const { fork } = require('node:child_process');
const fs = require('node:fs')
const standalone = `${__dirname}/js/server.js`;
const ports = process.env?.PORTS;
const overcommit = (undefined !== process.env?.OVERCOMMIT) ? true : false || false;
const { cpus } = require('node:os');

if(/^\d+\-\d+$/i.test(ports)){
  if(overcommit || ports.split('-').length <= cpus().length){
    for(let port=ports.split('-')[0]; port<=ports.split('-')[1]; port++){
      if(fs.existsSync(standalone)){
        const child = fork(standalone, [], {env:{PORT:port}});
        child.on('error', (error) =>{
          console.error(error);
        });
        child.on('close', (code) =>{
          console.warn(`child process on port ${port} closed with exit code ${code}`);
        });
      }else{
        console.error(`Nextjs standalone server.js missing in path "${standalone}"`);
      }
    }
  }else{
    console.warn(`you can't fork more nodejs processes than you have CPU cores\nUse env.OVERCOMMIT to do it anyway`);
  }
}else{
  console.error(`PORTS environment variable missing or wrong "${ports}"`);
}