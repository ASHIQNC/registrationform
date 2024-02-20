import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./details.css";
import { getStudentData } from "../../Service/apis";
import { BASE_URL } from "../../Service/baseUrl";

const Details = () => {
  const [data, setData] = useState([]);
  const getDetails = async () => {
    const result = await getStudentData();
    console.log(result);
    setData(result.data);
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <Container className="table__container-wrapper">
      <>
        <h1 className="text-danger mb-4 text-center">Student Details </h1>

        {data.length > 0 ? (
          <Table className="table__style" bordered responsive>
            <thead>
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Mobile Number
                </th>
                <th scope="col" className="px-6 py-4">
                  Email
                </th>
                <th scope="col" className="px-6 py-4">
                  Gender
                </th>
                <th scope="col" className="px-6 py-4">
                  Courses
                </th>
                <th scope="col" className="px-6 py-4">
                  Course Method
                </th>
                <th scope="col" className="px-6 py-4">
                  DOB
                </th>
                <th scope="col" className="px-6 py-4">
                  Profile Photo
                </th>
                <th scope="col" className="px-6 py-4">
                  ID Card
                </th>
                <th scope="col" className="px-6 py-4">
                  Country
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className=" dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {item.studentname}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.mobilenumber}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.gender}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <ul>
                      {item.courses.map((course) => (
                        <li>{course}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.coursemethod}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.dob}</td>
                  <td>
                    <img
                      className="rounded-5 text-center"
                      src={`${BASE_URL}/studentdata/${item.profile}`}
                      style={{ height: "100px", width: "100px" }}
                      alt="profile"
                    />
                  </td>

                  <td className="idCard__style">
                    {item.id.map((card) => (
                      <img
                        className="rounded-5 text-center mb-4"
                        src={`${BASE_URL}/studentdata/${card}`}
                        style={{ height: "100px", width: "100px" }}
                        alt="idcard"
                      />
                    ))}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.country}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          "No data available"
        )}
      </>
    </Container>
  );
};

export default Details;
