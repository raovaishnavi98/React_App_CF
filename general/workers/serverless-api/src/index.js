const Router = require('../lib/router')
const popData = require('../jsonData/popDomain')
const ddosData = require('../jsonData/ddosData')
const trafficData = require('../jsonData/trafficData')


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const router = new Router()

  router.get('/', async () => {
    let value = await jsondata.get("hw");
    return new Response(value, {
      headers: { 
        'content-type': 'text/plain', 
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
    })
  });

  router.get('/popular-domains', async () => {
    let data = await jsondata.get("popData");
    // if the data does not exist, read the json from jsonData/popDomain.json, store it into KV
    if(!data || data == "{}") {
      data = JSON.stringify(popData)
      await jsondata.put("popData", data)
    }
    return new Response(data, {
      headers: { 
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
    })
  });

  router.get('/attack-layer3', async () => {
    let data = await jsondata.get("ddosData");  
    // if the data does not exist, read the json from jsonData/ddosData.json, store it into KV
    if(!data || data == "{}") {
      data = JSON.stringify(ddosData)
      await jsondata.put("ddosData", data)
    }
    return new Response(data, {
      headers: { 
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
    })
  });


  router.get('/traffic-change', async () => {
    let data = await jsondata.get("trafficData");
    // if the data does not exist, read the json from jsonData/trafficData.json, store it into KV
    if(!data || data == "{}") {
      data = JSON.stringify(trafficData)
      await jsondata.put("trafficData", data)
    }
    return new Response(data, {
      headers: { 
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
    })
  });
  
  const response = await router.route(request)
	return response
}
