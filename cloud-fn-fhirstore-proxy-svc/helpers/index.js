function createRequestOptionsForHealthcareAPI (req) {
    const requestOptions = {
        url: req.forwardingUrl, 
        method: req.method, 
        ...(Object.keys(req.body).length>0 && {data: req.body}), //conditionally adds data propoerty to request options if req.body has data
        ...(req.method=='PATCH' && {headers: {"Content-Type": "application/json-patch+json"}})
      };

    return requestOptions;
}

module.exports = {
    createRequestOptionsForHealthcareAPI
  };