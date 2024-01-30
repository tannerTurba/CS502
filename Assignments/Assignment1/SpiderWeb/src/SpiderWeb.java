/*
 * CS 502 - Assignment 1
 * Tanner Turba
 * January 30, 2024
 */
import java.io.IOException;
import java.util.ArrayList;
import java.util.PriorityQueue;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class SpiderWeb {

    /**
     * The enterance call of the program. Error checks and continues, if there aren't errors.
     * @param args command line args.
     */
    public static void main(String args[]) {
        // Check total number of args.
        if (args.length != 3) {
            System.out.println("There must be three arguments!");
            return;
        }

        // Convert N and timout to integers
        String url = args[0];
        int n = -1;
        int timeout = -1;
        try {
            n = Integer.parseInt(args[1]);
            timeout = Integer.parseInt(args[2]);
        }
        catch (NumberFormatException e) {
            System.out.println("The second and third arguments must be a numeric value!");
            return;
        }

        // Extract the scheme from the url by getting the first five characters, replacing the ':' if it exists.
        String scheme = url.substring(0, 5).replace(":", "");
        if (!scheme.equalsIgnoreCase("http") && !scheme.equalsIgnoreCase("https")) {
            System.out.println("The scheme of the root URL must be 'https' or 'http'!");
            return;
        }

        // Check that 'N' is in the desired interval.
        if (!(1 <= n && n <= 10000)) {
            System.out.println("'N' must be in the interval [1, 10000]!");
            return;
        }

        // Check that the timeout is in the desired interval.
        if (!(1 <= timeout && timeout <= 10000)) {
            System.out.println("The timeout must be in miliseconds and in the interval [1, 10000]!");
            return;
        }

        try {
            // Call class constructor after error checking inputs.
            new SpiderWeb(url, n, timeout);
        } 
        catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Begin creating the "web" using the entered params.
     * @param url the url to start from.
     * @param n the number of urls to collect.
     * @param timeout the length of time before a timeout occurs.
     * @throws IOException
     */
    public SpiderWeb(String url, int n, int timeout) throws IOException {
        ArrayList<String> found = new ArrayList<>();
        String baseURL;
        int i = 0;
        found.add(url);

        // Continue to crawl webpages until urls are exhausted or number of found urls is satisfied.
        while (n > 1 && i < found.size()) {
            // Crawl the webpage.
            baseURL = found.get(i);
            Document doc = Jsoup.connect(baseURL).timeout(timeout).followRedirects(true).get();
            PriorityQueue<String> urls = getURLs(doc, baseURL);
    
            // Add valid urls to a list of "found" urls.
            while (!urls.isEmpty() && n > 1) {
                String foundURL = urls.poll();
                if (!found.contains(foundURL)) {
                    found.add(foundURL);
                    n--;
                }
            }
            i++;
        }

        // Make sure the list of found urls is sorted and print.
        found.sort(new URLComparator());
        StringBuilder sb = new StringBuilder();
        for (String u : found) {
            printURL(u, sb);
        }
        System.out.print(sb.toString());
    }

    /**
     * Gets the valid urls from a crawled webpage.
     * @param doc the Document object from the crawled webpage.
     * @param baseURL the url of the crawled webpage.
     * @return A PriorityQueue that contains all valid urls from the crawled webpage.
     */
    private PriorityQueue<String> getURLs(Document doc, String baseURL) {
        PriorityQueue<String> urls = new PriorityQueue<>(new URLComparator());
        Elements elements = doc.select("a");

        // For each anchor element, get the href attribute.
        for (Element anchor : elements) {
            Attribute hrefAttr = anchor.attribute("href");

            // If the href attribute exists, get its value.
            if (hrefAttr != null) {
                String href = hrefAttr.getValue();
                String foundURL = null;

                // Append the href to the base url, if its a relative url.
                if (href.contains("http")) {
                    foundURL = href;
                }
                else if (href.length() > 1 && href.charAt(0) == '/') {
                    foundURL = (baseURL + href).trim();
                }

                // Add to the collection of found urls, if it is not a duplicate.
                if (foundURL != null && !urls.contains(foundURL)) {
                    urls.add(foundURL);
                }
            }
        }
        return urls;
    }

    /**
     * Print a URL separate from its query.
     * @param url the URL to print
     * @param sb the StringBuilder object used to print.
     */
    private void printURL(String url, StringBuilder sb) {
        int queryIndex = url.indexOf('?');
        int fragmentIndex = url.indexOf('#');
        String query = null;

        // Separate the query and fragment from the URL.
        if (queryIndex != -1 && fragmentIndex != -1) {
            sb.append(String.format("%s\n", url.substring(0, queryIndex)));
            query = url.substring(queryIndex + 1, fragmentIndex);
        }
        else if (queryIndex != -1 && fragmentIndex == -1) {
            sb.append(String.format("%s\n", url.substring(0, queryIndex)));
            query = url.substring(queryIndex + 1, url.length());
        }
        else if (queryIndex == -1 && fragmentIndex != -1) {
            sb.append(String.format("%s\n", url.substring(0, fragmentIndex)));
        }
        else {
            sb.append(String.format("%s\n", url));
        }

        // If the query exists, print one key-value pair per line.
        if (query != null) {
            // Split up the pairs for sorting.
            PriorityQueue<String> queries = new PriorityQueue<>(new AlphaNumericComparator());
            for (String q : query.split("&")) {
                queries.add(q);
            }

            // Add each pair to the StringBuilder for printing.
            while (!queries.isEmpty()) {
                String[] pair = queries.poll().split("=");
                String key = pair[0];
                String value = "";
                if (pair.length == 2) {
                    value = pair[1];
                }
                sb.append(String.format("   %s: %s\n", key, value));
            }
        }
    }
}
