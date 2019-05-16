const UNKNOWN_VALUE_MARKER = "???";
const ROOM_PROP_NAME = "room";

class CourseCleaner {
  validatedRoom = room => {
    const expectedForm = /^(ea|eb|ec|[a-z])\d{1,}[a-z]?$/gi;
    if (!expectedForm.test(room)) {
      return UNKNOWN_VALUE_MARKER;
    } else {
      return room.toLowerCase();
    }
  };

  clean = obj => {
    if (!obj.hasOwnProperty(ROOM_PROP_NAME)) {
      obj = Object.defineProperty(obj, ROOM_PROP_NAME, {
        value: UNKNOWN_VALUE_MARKER
      });
    } else {
      obj = Object.defineProperty(obj, ROOM_PROP_NAME, {
        value: this.validatedRoom(obj[ROOM_PROP_NAME])
      });
    }
    return obj;
  };
}

export default CourseCleaner;
