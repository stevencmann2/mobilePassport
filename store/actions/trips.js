export const TRIPID = "TRIPID";

export const trackTrip = tripId => {
  return { type: TRIPID, tripId };
};
