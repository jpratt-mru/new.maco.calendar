import RoomCleaner from "../biz-logic/RoomCleaner";

const ROOM_PROP_NAME = "room";
const UNKNOWN_VALUE_MARKER = "???";

let roomCleaner;

beforeEach(() => {
  roomCleaner = new RoomCleaner();
});

test("if the incoming object doesn't have a key called 'room' (case-insensitive), then subject abbreviation defaults to '???'", () => {
  expect(roomCleaner.clean({})).toHaveProperty(
    ROOM_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );

  expect(roomCleaner.clean({ foo: 12 })).toHaveProperty(
    ROOM_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );
});

test("if the incoming object has a course that's not in a known form, then room defaults to '???'", () => {
  expect(roomCleaner.clean({ room: "123" })).toHaveProperty(
    ROOM_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );

  expect(roomCleaner.clean({ room: "no-numbers" })).toHaveProperty(
    ROOM_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );

  expect(roomCleaner.clean({ room: "EF123" })).toHaveProperty(
    ROOM_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );

  expect(roomCleaner.clean({ room: "EA-123" })).toHaveProperty(
    ROOM_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );
});

test("the room is always lowercase", () => {
  expect(roomCleaner.clean({ room: "T123" })).toHaveProperty(
    ROOM_PROP_NAME,
    "t123"
  );

  expect(roomCleaner.clean({ room: "eB1212" })).toHaveProperty(
    ROOM_PROP_NAME,
    "eb1212"
  );

  expect(roomCleaner.clean({ room: "Ec001" })).toHaveProperty(
    ROOM_PROP_NAME,
    "ec001"
  );

  expect(roomCleaner.clean({ room: "EA4123" })).toHaveProperty(
    ROOM_PROP_NAME,
    "ea4123"
  );

  expect(roomCleaner.clean({ room: "I149F" })).toHaveProperty(
    ROOM_PROP_NAME,
    "i149f"
  );
});
