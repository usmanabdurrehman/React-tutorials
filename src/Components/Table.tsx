import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from "@chakra-ui/react";
import {
  LOCATIONS,
  LOCATIONS_MAP,
  PASSED_STUDENT_IDS,
  PASSED_STUDENT_IDS_SET,
  STUDENTS,
} from "./data";

export default function TableComponent() {
  return (
    <Table variant="simple" mt={10}>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Location</Th>
        </Tr>
      </Thead>
      <Tbody>
        {STUDENTS.map((student) => (
          <Tr>
            <Td>{student.id}</Td>
            <Td>{student.name}</Td>
            <Td>{LOCATIONS_MAP[student.locationId]}</Td>
            <Td>
              {PASSED_STUDENT_IDS_SET.has(student.id) ? (
                <Badge colorScheme="green">Passed</Badge>
              ) : (
                <Badge colorScheme="red">Failed</Badge>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
