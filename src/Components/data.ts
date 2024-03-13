export const LOCATIONS = [
  { id: 1, name: "New York" },
  { id: 2, name: "California" },
  { id: 3, name: "Texas" },
];

export const LOCATIONS_MAP = LOCATIONS.reduce(
  (acc: { [id: number]: string }, val) => {
    acc[val.id] = val.name;
    return acc;
  },
  {}
);

export const PASSED_STUDENT_IDS = [1, 4, 5, 10, 3];

export const PASSED_STUDENT_IDS_SET = new Set(PASSED_STUDENT_IDS);

export const STUDENTS = [
  { id: 1, name: "David", locationId: 1 },
  { id: 2, name: "Alex", locationId: 2 },
];
