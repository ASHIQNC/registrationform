import { BASE_URL } from "./baseUrl";
import { commonStructure } from "./commonStructure";

export const addStudentData = async (body, header) => {
  return commonStructure(
    "POST",
    `${BASE_URL}/student/upload_data`,
    body,
    header
  );
};

export const getStudentData = async () => {
  return commonStructure("GET", `${BASE_URL}/student/get_Data`, {});
};
