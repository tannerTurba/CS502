let allHeaders = {};

function HttpRequest(request) {
    let r = request;
    const http = {
        headers: {},      // An object containing all headers, keyed on header-name.
        query: {},        // An object containing all query parameters, keyed on query-name.
        body: "",
        method: "",
        path: "",
        url: "",
        version: "",
        fragment: "",
        host: "",           // May be given in the header.
        port: "",         // Default ports 80 and 433 must be supported.
        protocol: "",   // May be found in URL or Version. Either HTTP or HTTPS.
        get: getHeader     // Function that returns the value for the specified header, otherwise null.
    };
    
    // Separate body from rest of request, if it exists.
    if (request.includes("\n\n")) {
        r = request.split("\n\n");
        http.body = r[1];
        r = r[0];
    }

    // Split request by each line. The first line is the request line and the rest are the headers.
    r = r.split("\n");
    let requestLine = r[0];
    Object.assign(http, processRequestLine(requestLine));

    // Enter each header into the http object.
    let headers = r.slice(1);
    headers.forEach((header) => {
        let pair = header.split(": ");
        http.headers[pair[0]] = pair[1].trim();
    });
    allHeaders = http.headers;

    // All processing finished, return the object.
    return http;
}

function getHeader(headerName) {
    return allHeaders[headerName];
}

function processRequestLine(requestLine) {
    // Object to return, containing all request line components.
    const rL = {
        method: "",
        url: "",
        version: "",
        host: "",
        port: "80",
        query: {},
        fragment: "", 
        path: "",
        protocol: ""
    };

    // Assign the three main components of the request line.
    let requestParts = requestLine.trim().split(" ");
    let fullURL = requestParts[1];

    rL.method = requestParts[0];
    rL.version = requestParts[2];

    // Regular Expressions for each piece of a URL.
    const passwordRegex = /(?<=:)[^(\/|:|@|?|#)]*(?=@)/;
    const hostWithPasswordRegex = /(?<=\/\/)[^(\/|:|@|?|#)]*(?=(\/|:))/;
    const hostWOPasswordRegex = /(?<=@)[^(\/|:|@|?|#)]*(?=(\/|:))/;
    const portRegex = /(?<=:)[^(\/|:|@|?|#)]*(?=\/)/;
    const queryRegex = /(?<=\?)[^(\/|:|@|?|#)]*(?=#)/;
    const fragmentRegex = /(?<=#)[^(\/|:|@|?|#|\s)]*/;
    const pathRegex = /(?<=([^:\/]\/))[^(:|@|?|#)]*(?=\?)/;
    const protocolRegex = /^[^:]*/;

    // Split up the url using regex.
    if (fullURL.match(passwordRegex) == null) {
        rL.host = fullURL.match(hostWithPasswordRegex)[0];
    }
    else {
        rL.host = fullURL.match(hostWOPasswordRegex);
    }
    rL.port = fullURL.match(portRegex)[0];
    if (rL.port == "") {
        rL.port = 80;
    }
    let queries = fullURL.match(queryRegex)[0].split("&");
    queries.forEach((query) => {
        let pair = query.split("=");
        rL.query[pair[0]] = pair[1];
    });
    rL.fragment = fullURL.match(fragmentRegex)[0];
    rL.path = '/' + fullURL.match(pathRegex)[0];
    rL.protocol = fullURL.match(protocolRegex)[0];

    if (rL.protocol.toLowerCase() == "http") {
        rL.port = 80;
    }
    else {
        rL.port = 443;
    }

    rL.url = fullURL.substring(rL.protocol.length + rL.host.length + 3, fullURL.length);

    // Return the completed object.
    return rL;
}

let obj = HttpRequest('GET HTTP:\/\/charity.cs.uwlax.edu\/a\/b?c=d&e=f#ghi HTTP\/1.1\nHost: charity.cs.uwlax.edu\nConnection: keep-alive\nPragma: no-cache\nCache-Control: no-cache\nUpgrade-Insecure-Requests: 1\nUser-Agent: Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/55.0.2883.95 Safari\/537.36\nAccept: text\/html,application\/xhtml+xml,application\/xml;q=0.9,image\/webp,*\/*;q=0.8\nAccept-Encoding: gzip, deflate, sdch\nAccept-Language: en-US,en;q=0.8,nb;q=0.6\n\nThis is the body');
console.log(JSON.stringify(obj));
console.log(obj.get("Connection"));