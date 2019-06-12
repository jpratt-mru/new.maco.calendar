import StartTimeBuilder from "./StartTimeBuilder";
import DurationBuilder from "./DurationBuilder";

/**
 * Place any primary builders needed to make a learning event in this array.
 * They *are* run in order, if that matters.
 *
 * A *primary builder* is used to add properties to a learning event that
 * are necessary to allow the learning event to display on a calendar - we can
 * still make a learning event without these properties...but you just won't
 * be able to see it on the calendar!
 */
export const primaryBuilders = [new StartTimeBuilder(), new DurationBuilder()];
