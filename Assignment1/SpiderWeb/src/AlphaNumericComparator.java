import java.util.Comparator;

public class AlphaNumericComparator implements Comparator<String> {

    @Override
    public int compare(String s1, String s2) {
        int i1 = 0, i2 = 0;
        while (i1 < s1.length() && i2 < s2.length()) {
            int comparison = Character.compare(s1.toLowerCase().charAt(i1), s2.toLowerCase().charAt(i2));
            i1++;
            i2++;
            
            if (comparison != 0) {
                return comparison;
            }
        }

        if (s1.length() > s2.length()) {
            return 1;
        }
        else if (s1.length() < s2.length()) {
            return -1;
        }
        else {
            return 0;
        }
    }
}
