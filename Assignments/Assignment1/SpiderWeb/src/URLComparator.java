/*
 * CS 502 - Assignment 1
 * Tanner Turba
 * January 30, 2024
 */
public class URLComparator extends AlphaNumericComparator {

    /**
     * Compares two urls, omitting the query and fragment.
     */
    @Override
    public int compare(String o1, String o2) {
        // Omitt the queries and fragments.
        String url1 = omittQueryAndFragment(o1);
        String url2 = omittQueryAndFragment(o2);

        // Return the result of the alpha-numeric comparison.
        return super.compare(url1, url2);
    }
    
    /**
     * Removes the query and fragment from a url.
     * @param url the url to modify.
     * @return the modified url.
     */
    private String omittQueryAndFragment(String url) {
        // Get index of query and fragment.
        int queryIndex = url.indexOf('?');
        int anchorIndex = url.indexOf('#');

        // Return the substring of everything else.
        if (queryIndex != -1) {
            return url.substring(0, queryIndex);
        }
        else if (anchorIndex != -1) {
            return url.substring(0, anchorIndex);
        }
        return url;
    }
}
