const { elevenLogJSON } = require('/util');
const { fork } = require('node:child_process');
const fs = require('node:fs');
const { cpus } = require('node:os');
const standalone = process.env?.JS || `${__dirname}/js/server.js`;
const ip = (process.env?.IP && /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/i.test(process.env?.IP)) ? process.env?.IP : '0.0.0.0';
const overcommit = (process.env?.OVERCOMMIT) ? true : false;
const portRange = process.env?.PORTS || `8080-${8080+(cpus().length - 1)}`;

if(fs.existsSync(standalone)){
  if(/^\d+\-\d+$/i.test(portRange)){
    const from = parseInt(portRange.match(/(\d+)\-(\d+)/i)[1], 10);
    const to = parseInt(portRange.match(/(\d+)\-(\d+)/i)[2], 10);
    const ports = Array.from(Array((to-from)+1), (_, i) => i+from);  
    if(overcommit || ports.length <= cpus().length){
      elevenLogJSON('info', `forking {${ports.length}} processes on {${cpus().length}} available CPU's`);
      for(const port of ports){
        const child = fork(standalone, [], {env:{PORT:port, HOSTNAME:ip}});
        child.on('error', (error) =>{
          elevenLogJSON('error', error.tostring());
        });
        child.on('close', (code) =>{
          elevenLogJSON('warn', `child process on port ${port} closed with exit code ${code}`);
        });
      }
    }else{
      elevenLogJSON('error', 'you can\'t fork more nodejs processes than you have CPU cores. Use env.OVERCOMMIT to do it anyway');
    }
  }else{
    elevenLogJSON('error', `PORTS environment variable missing or wrong "${process.env?.PORTS}"`);
  }
}else{
  elevenLogJSON('error', `standalone server.js missing in path "${standalone}"`);
}