import RoomCapacityIssueDetector from "../../biz-logic/issueDetectors/RoomCapacityIssueDetector";
import Rooms from "../../biz-logic/Rooms";

test("no issues if there are no rooms and no LearningEvents", () => {
  const roomList = [];
  const rooms = new Rooms(roomList);

  const learningEvents = [];
  let detector = new RoomCapacityIssueDetector(rooms, learningEvents);

  expect(detector.issues().length).toBe(0);
});

test("no issues if there are no rooms, but are LearningEvents", () => {
  const roomList = [];
  const rooms = new Rooms(roomList);

  const learningEvents = [{ room: "t225" }];

  let detector = new RoomCapacityIssueDetector(rooms, learningEvents);

  expect(detector.issues().length).toBe(0);
});

test("has an issue if a room is being used for a LearningEvent and is just one over", () => {
  const roomList = [["t225", 25]];
  const rooms = new Rooms(roomList);

  const learningEvents = [{ room: "t225", "sectioncapacity": "26" }];

  let detector = new RoomCapacityIssueDetector(rooms, learningEvents);

  expect(detector.issues().length).toBe(1);
});

test("has no issue if a room is being used for a LearningEvent and is **just** at capacity", () => {
  const roomList = [["t225", 25]];
  const rooms = new Rooms(roomList);

  const learningEvents = [{ room: "t225", "sectioncapacity": "25" }];

  let detector = new RoomCapacityIssueDetector(rooms, learningEvents);

  expect(detector.issues().length).toBe(0);
});

test("has no issue if a room is being used for a LearningEvent but that event doesn't have a valid sectioncapacity prop", () => {
  const roomList = [["t225", 25]];
  const rooms = new Rooms(roomList);

  const learningEvents = [{ room: "t225", "sectioncapacity": "??" }];

  let detector = new RoomCapacityIssueDetector(rooms, learningEvents);

  expect(detector.issues().length).toBe(0);
});

test("should not double-report the same room for the same course section", () => {
  const roomList = [["t225", 25]];
  const rooms = new Rooms(roomList);

  const learningEvents = [
    {
      room: "t225",
      "sectioncapacity": "26",
      course: "comp1501",
      section: "001"
    },
    {
      room: "b107",
      "sectioncapacity": "26",
      course: "comp1501",
      section: "501"
    },
    { room: "t225", "sectioncapacity": 26, course: "comp1501", section: "001" }
  ];

  let detector = new RoomCapacityIssueDetector(rooms, learningEvents);

  expect(detector.issues().length).toBe(1);
});

test("will report the same room for different courses", () => {
  const roomList = [["t225", 25]];
  const rooms = new Rooms(roomList);

  const learningEvents = [
    {
      room: "t225",
      "sectioncapacity": "26",
      course: "comp1501",
      section: "001"
    },
    {
      room: "t225",
      "sectioncapacity": "26",
      course: "comp1502",
      section: "001"
    }
  ];

  let detector = new RoomCapacityIssueDetector(rooms, learningEvents);

  expect(detector.issues().length).toBe(2);
});

test("will report the same room for different sections of the same course", () => {
  const roomList = [["t225", 25]];
  const rooms = new Rooms(roomList);

  const learningEvents = [
    {
      room: "t225",
      "sectioncapacity": "26",
      course: "comp1501",
      section: "001"
    },
    {
      room: "t225",
      "sectioncapacity": "26",
      course: "comp1501",
      section: "002"
    }
  ];

  let detector = new RoomCapacityIssueDetector(rooms, learningEvents);

  expect(detector.issues().length).toBe(2);
});
