var ComfyWeb = require( "webwebweb" );
const fs = require('fs-extra')

async function read () {
  try {
    const packageObj = await fs.readJson('./lastCommand.json')
    return packageObj
  } catch (err) {
    return { "success": "false" };
    console.error(err)
  }
}

async function write  (whatToWrite) {
  try {
    await fs.writeJson('./lastCommand.json', {lastCommand: whatToWrite})
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

ComfyWeb.APIs[ "/lastCommand" ] = async ( qs, body, opts ) => {
  const whatWasRead = await read();
  return whatWasRead;
};

ComfyWeb.APIs[ "/command" ] = async ( qs, body, opts ) => {
  await write(qs['command']);
  console.log(JSON.stringify(qs))
};
ComfyWeb.Run( 8099 );