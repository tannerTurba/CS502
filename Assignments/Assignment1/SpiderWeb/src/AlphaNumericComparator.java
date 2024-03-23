/*
 * CS 502 - Assignment 1
 * Tanner Turba
 * January 30, 2024
 */
import java.util.Comparator;

public class AlphaNumericComparator implements Comparator<String> {

    /**
     * Returns an int that represents the sort order of an alpha-numeric value.
     */
    @Override
    public int compare(String s1, String s2) {
        // Compare the two strings letter by letter.
        int i1 = 0, i2 = 0;
        while (i1 < s1.length() && i2 < s2.length()) {
            int comparison = Character.compare(s1.toLowerCase().charAt(i1), s2.toLowerCase().charAt(i2));
            i1++;
            i2++;
            
            // Return the comparision value, if they aren't the same value (denoted by zero).
            if (comparison != 0) {
                return comparison;
            }
        }

        // If a match has not been made after consuming one of the two strings, determine sort order by length.
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
