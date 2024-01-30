
public class URLComparator extends AlphaNumericComparator {

    @Override
    public int compare(String o1, String o2) {
        String url1 = omittQueryAndAnchor(o1);
        String url2 = omittQueryAndAnchor(o2);
        return super.compare(url1, url2);
    }
    
    private String omittQueryAndAnchor(String url) {
        int queryIndex = url.indexOf('?');
        int anchorIndex = url.indexOf('#');

        if (queryIndex != -1) {
            return url.substring(0, queryIndex);
        }
        else if (anchorIndex != -1) {
            return url.substring(0, anchorIndex);
        }
        return url;
    }
}
