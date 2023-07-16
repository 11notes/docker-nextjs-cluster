const { fork } = require('node:child_process');
const fs = require('node:fs')
const standalone = `${__dirname}/js/server.js`;
const portRange = process.env?.PORTS;
const ip = (undefined !== process.env?.IP && /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/i.test(process.env?.IP)) ? process.env?.IP : '0.0.0.0';
const overcommit = (undefined !== process.env?.OVERCOMMIT) ? true : false;
const { cpus } = require('node:os');

if(/^\d+\-\d+$/i.test(portRange)){
  const from = parseInt(portRange.match(/(\d+)\-(\d+)/i)[1], 10);
  const to = parseInt(portRange.match(/(\d+)\-(\d+)/i)[2], 10);
  const ports = Array.from(Array((to-from)+1), (_, i) => i+from);

  if(overcommit || ports.length <= cpus().length){
    for(const port of ports){
      if(fs.existsSync(standalone)){
        const child = fork(standalone, [], {env:{PORT:port, HOSTNAME:ip}});
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