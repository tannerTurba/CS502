/* 
* CS 502 - Assignment 1
* Tanner Turba
* January 30, 2024
*/

// Retain all headers so they are accessible from the getHeader() function.
let allHeaders = {};

/**
 * Parse a HTTP request to return its parts as an object.
 * @param {*} request The HTTP request to parse.
 * @returns The request object.
 */
function HttpRequest(request) {
    let r = request;
    const http = {
        headers: {},
        query: {},
        body: "",
        method: "",
        path: "",
        url: "",
        version: "",
        fragment: "",
        host: "",
        port: "",
        protocol: "",
        get: getHeader
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

/**
 * Gets the header value to the corresponding header key value.
 * @param {*} headerName The name of the header value to get.
 * @returns The header value to the corresponding key value.
 */
function getHeader(headerName) {
    return allHeaders[headerName];
}

/**
 * Gets the parts of the first line of an HTTP request.
 * @param {*} requestLine The first line of the HTTP request.
 * @returns An object that contains the parts of the first line of an HTTP request.
 */
function processRequestLine(requestLine) {
    // Object to return, containing all request line components.
    const rL = {
        method: "",
        url: "",
        version: "",
        host: "",
        port: "",
        query: {},
        fragment: "", 
        path: "",
        protocol: ""
    };

    // Assign the three main components of the request line.
    let requestParts = requestLine.trim().split(" ");
    rL.method = requestParts[0];
    rL.version = requestParts[2];
    let fullURL = requestParts[1];
    Object.assign(rL, processURL(fullURL));

    // Return the completed object.
    return rL;
}

/**
 * Processes a url and returns an object containing each field of that url.
 * @param {*} fullURL the url to process
 * @returns an object containing each field of the url
 */
function processURL(fullURL) {
    // Regular Expressions for each piece of a URL.
    const passwordRegex = /(?<=:)[^(\/|:|@|?|#)]*(?=@)/;
    const hostWithPasswordRegex = /(?<=\/\/)[^(\/|:|@|?|#)]*(?=(\/|:))/;
    const hostWOPasswordRegex = /(?<=@)[^(\/|:|@|?|#)]*(?=(\/|:))/;
    const portRegex = /(?<=:)[^(\/|:|@|?|#)]*(?=\/)/;
    const queryRegex = /(?<=\?)[^(\/|:|@|?|#)]*(?=#)/;
    const fragmentRegex = /(?<=#)[^(\/|:|@|?|#|\s)]*/;
    const pathRegex = /(?<=([^:\/]\/))[^(:|@|?|#)]*(?=\?)/;
    const protocolRegex = /^[^:]*/;

    // Object to return, containing all url components.
    const url = {
        url: "",
        host: "",
        port: "",
        query: {},
        fragment: "", 
        path: "",
        protocol: ""
    };

    // Split up the url using regex.
    if (fullURL.match(passwordRegex) == null) {
        url.host = fullURL.match(hostWithPasswordRegex)[0];
    }
    else {
        url.host = fullURL.match(hostWOPasswordRegex);
    }
    url.fragment = fullURL.match(fragmentRegex)[0];
    url.path = '/' + fullURL.match(pathRegex)[0];
    url.protocol = fullURL.match(protocolRegex)[0];
    url.url = fullURL.substring(url.protocol.length + url.host.length + 3, fullURL.length);

    // Split up the queries.
    let queries = fullURL.match(queryRegex)[0].split("&");
    queries.forEach((query) => {
        let pair = query.split("=");
        url.query[pair[0]] = pair[1];
    });
    
    // Determine the port that is being used, based on protocol if not defined.
    url.port = fullURL.match(portRegex)[0];
    if (url.port == "") {
        if (url.protocol.toLowerCase() == "http") {
            url.port = "80";
        }
        else {
            url.port = "443";
        }
    }

    // Return the completed object.
    return url;
}

var test = 'GET HTTP:\/\/charity.cs.uwlax.edu\/a\/b?c=d&e=f#ghi HTTP\/1.1\nHost: charity.cs.uwlax.edu\nConnection: keep-alive\nPragma: no-cache\nCache-Control: no-cache\nUpgrade-Insecure-Requests: 1\nUser-Agent: Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/55.0.2883.95 Safari\/537.36\nAccept: text\/html,application\/xhtml+xml,application\/xml;q=0.9,image\/webp,*\/*;q=0.8\nAccept-Encoding: gzip, deflate, sdch\nAccept-Language: en-US,en;q=0.8,nb;q=0.6\n\nThis is the body';
console.log(JSON.stringify(HttpRequest(test)));