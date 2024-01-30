import java.io.IOException;
import java.util.ArrayList;
import java.util.PriorityQueue;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class SpiderWeb {
    public static void main(String args[]) {
        if (args.length != 3) {
            System.out.println("There must be three arguments!");
            return;
        }

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

    public SpiderWeb(String url, int n, int timeout) throws IOException {
        ArrayList<String> found = new ArrayList<>();
        String baseURL;
        int i = 0;
        found.add(url);

        while (n > 1 && i < found.size()) {
            baseURL = found.get(i);
            Document doc = Jsoup.connect(baseURL).timeout(timeout).followRedirects(true).get();
            PriorityQueue<String> urls = getURLs(doc, baseURL);
    
            while (!urls.isEmpty() && n > 1) {
                String foundURL = urls.poll();
                if (!found.contains(foundURL)) {
                    found.add(foundURL);
                    n--;
                }
            }
            i++;
        }

        found.sort(new URLComparator());
        StringBuilder sb = new StringBuilder();
        for (String u : found) {
            printURL(u, sb);
        }
        System.out.print(sb.toString());
    }

    private PriorityQueue<String> getURLs(Document doc, String baseURL) {
        PriorityQueue<String> urls = new PriorityQueue<>(new URLComparator());
        Elements elements = doc.select("a");

        for (Element anchor : elements) {
            Attribute hrefAttr = anchor.attribute("href");
            if (hrefAttr != null) {
                String href = hrefAttr.getValue();
                String foundURL = null;
                if (href.contains("http")) {
                    foundURL = href;
                }
                else if (href.length() > 1 && href.charAt(0) == '/') {
                    foundURL = (baseURL + href).trim();
                }

                if (foundURL != null && !urls.contains(foundURL)) {
                    urls.add(foundURL);
                }
            }
        }
        return urls;
    }

    private void printURL(String url, StringBuilder sb) {
        int queryIndex = url.indexOf('?');
        int anchorIndex = url.indexOf('#');
        String query = null;

        if (queryIndex != -1 && anchorIndex != -1) {
            sb.append(String.format("%s\n", url.substring(0, queryIndex)));
            query = url.substring(queryIndex + 1, anchorIndex);
        }
        else if (queryIndex != -1 && anchorIndex == -1) {
            sb.append(String.format("%s\n", url.substring(0, queryIndex)));
            query = url.substring(queryIndex + 1, url.length());
        }
        else if (queryIndex == -1 && anchorIndex != -1) {
            sb.append(String.format("%s\n", url.substring(0, anchorIndex)));
        }
        else {
            sb.append(String.format("%s\n", url));
        }

        if (query != null) {
            PriorityQueue<String> queries = new PriorityQueue<>(new AlphaNumericComparator());
            for (String q : query.split("&")) {
                queries.add(q);
            }

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
