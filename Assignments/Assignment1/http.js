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
    rL.url = fullURL.substring(rL.protocol.length + rL.host.length + 3, fullURL.length);

    // Determine the port that is being used, based on protocol.
    if (rL.protocol.toLowerCase() == "http") {
        rL.port = 80;
    }
    else {
        rL.port = 443;
    }

    // Return the completed object.
    return rL;
}