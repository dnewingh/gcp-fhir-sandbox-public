function createRequestOptionsForHealthcareAPI (req) {
    let requestOptions = {
        url: req.forwardingUrl, 
        method: req.method,
        responseType: 'text', 
        ...(Object.keys(req.body).length>0 && {data: req.body}), //conditionally adds data propoerty to request options if req.body has data
        ...(req.method === 'PATCH' ? 
            {headers: {"Content-Type": "application/json-patch+json", "Accept": "*/*"}} 
            : {headers: {"Accept": "*/*"}}
        )
      };

    return requestOptions;
}

module.exports = {
    createRequestOptionsForHealthcareAPI
  };