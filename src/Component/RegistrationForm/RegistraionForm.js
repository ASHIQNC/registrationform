import React, { useState, useEffect } from "react";
import "./registrationform.css";
import { addStudentData } from "../../Service/apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Select from "react-select";

const RegistraionForm = () => {
  const [inputs, setInputs] = useState({
    studentname: "",
    mobilenumber: "",
    email: "",
    gender: "",
    coursemethod: "",
    dob: "",
    country: "",
  });

  const options = [
    { value: "ece", label: "ECE" },
    { value: "cs", label: "CS" },
    { value: "eee", label: "EEE" },
    { value: "arch", label: "ARCH" },
    { value: "mech", label: "MECH" },
  ];

  //courses dropdown state
  const [courses, setCourses] = useState([]);

  //state to store profile
  const [profile, setProfile] = useState("");
  //image preview
  const [imagePreview, setImagePreview] = useState("");
  //id cards
  const [id, setId] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const chooseImage = (e) => {
    setProfile(e.target.files[0]);
  };

  const chooseId = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setId(files);
  };
  useEffect(() => {
    //method to create url
    if (profile) {
      setImagePreview(URL.createObjectURL(profile));
    }
  }, [profile]);

  //this is the courses that the user is selecting from the dropdown
  const courseSubmit = (courses) => {
    const data = Array.from(courses);
    setCourses(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      studentname,
      mobilenumber,
      email,
      gender,
      coursemethod,
      dob,
      country,
    } = inputs;

    if (
      studentname === "" ||
      mobilenumber === "" ||
      email === "" ||
      gender === "" ||
      coursemethod === "" ||
      dob === "" ||
      country === ""
    ) {
      toast.error("please fill the inputfiels");
    } else {
      const headerConfig = {
        "Content-Type": "multipart/form-data",
      };

      const data = new FormData();

      data.append("studentname", studentname);
      data.append("mobilenumber", mobilenumber);
      data.append("email", email);
      data.append("gender", gender);
      data.append("coursemethod", coursemethod);
      data.append("dob", dob);
      courses.forEach((course) => {
        data.append("courses", course.value);
      });
      data.append("country", country);
      data.append("profile", profile);
      for (let i = 0; i < id.length; i++) {
        data.append("idcards", id[i]);
      }

      const result = await addStudentData(data, headerConfig);

      if (result.status >= 200 && result.status <= 300) {
        setInputs({
          ...inputs,
          studentname: "",
          mobilenumber: "",
          email: "",
          gender: "",
          coursemethod: "",
          dob: "",
          courses: "",
          country: "",
        });
        navigate("/details");
      } else {
        toast.error("unable to post");
      }
    }
  };
  return (
    <div className="registraionForm__Wrapper">
      <Container>
        <h1 className="text-center mt-4 mb-4">Registration Form</h1>
        <div className="registration__content">
          <div className="registraion__inputfield">
            <div className="mb-5 input__wrapper mt-5">
              <label
                for="exampleFormControlInput1"
                className="form-label label__style">
                Student Name :
              </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="studentname"
                style={{ width: "50%" }}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter the name"
              />
            </div>

            <div className="mb-5 input__wrapper">
              <label
                for="exampleFormControlInput1"
                className="form-label label__style">
                Mobile Number :
              </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="mobilenumber"
                style={{ width: "50%" }}
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Mobile Number"
              />
            </div>

            <div className="mb-5 input__wrapper">
              <label
                for="exampleFormControlInput1"
                className="form-label label__style">
                Email :
              </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="email"
                style={{ width: "50%" }}
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Email address"
              />
            </div>

            <div className="mb-5 input__wrapper__radio">
              <label
                for="exampleFormControlInput1"
                className="form-label label__style">
                Gender :
              </label>

              <div className="input__radio__Wrapper">
                <div className="input__gender">
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="gender"
                    value={"male"}
                    type="radio"
                    className="form-check-input"
                    id="exampleFormControlInput1"
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Male
                  </label>
                </div>
                <div className="input__gender mx-2">
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="gender"
                    value={"female"}
                    type="radio"
                    className="form-check-input"
                    id="exampleFormControlInput1"
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-5 input__wrapper">
              <label
                style={{ width: "20%" }}
                for="exampleFormControlInput1"
                className="form-label">
                Courses :
              </label>
              <Select
                options={options}
                value={courses}
                onChange={courseSubmit}
                isMulti
              />
            </div>

            <div className="mb-5 input__wrapper__Checkbox">
              <label
                for="exampleFormControlInput1"
                className="form-label label__style">
                Course Method:
              </label>
              {/*  */}
              <div className="input__checkbox">
                <div className="input__course__method">
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={"online"}
                    name="coursemethod"
                    type="checkbox"
                    className="form-check-input"
                    id="exampleFormControlInput1"
                  />
                  <label
                    className="form-check-label mx-2"
                    for="flexRadioDefault2">
                    Online
                  </label>
                </div>
                <div className="input__course__method mt-2">
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="coursemethod"
                    value={"offline"}
                    type="checkbox"
                    className="form-check-input"
                    id="exampleFormControlInput1"
                  />
                  <label
                    className="form-check-label mx-2"
                    for="flexRadioDefault2">
                    Offline
                  </label>
                </div>

                <div className="input__course__method mt-2">
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="coursemethod"
                    value={"hybrid"}
                    type="checkbox"
                    className="form-check-input"
                    id="exampleFormControlInput1"
                  />
                  <label
                    className="form-check-label mx-2"
                    for="flexRadioDefault2">
                    Hybrid
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-5 input__wrapper">
              <label
                for="exampleFormControlInput1"
                className="form-label label__style">
                DOB :
              </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="dob"
                style={{ width: "50%" }}
                type="date"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Mobile Number"
              />
            </div>

            <div className="mb-5 input__wrapper">
              <label
                for="exampleFormControlInput1"
                className="form-label label__style">
                Profile Photo :
              </label>
              <div style={{ width: "50%" }}>
                <img
                  src={imagePreview}
                  alt="profilepic"
                  style={{ width: "100px", height: "100px" }}
                />
                <input
                  name="profile"
                  onChange={(e) => {
                    chooseImage(e);
                  }}
                  type="file"
                  className="form-control mt-3"
                />
              </div>
            </div>

            <div className="mb-5 input__wrapper">
              <label
                for="exampleFormControlInput1"
                className="form-label label__style">
                Id Card :
              </label>
              <div style={{ width: "50%" }}>
                <input
                  name="idcards"
                  onChange={(e) => chooseId(e)}
                  type="file"
                  className="form-control"
                  multiple
                />
              </div>
            </div>

            <div className="mb-5 input__wrapper">
              <label
                for="exampleFormControlInput1"
                className="form-label label__style">
                Country :
              </label>
              <select
                onChange={(e) => {
                  handleChange(e);
                }}
                name="country"
                style={{ width: "50%" }}
                className="form-select"
                aria-label="Default select example">
                <option>select country</option>
                <option value={"india"}>India</option>
                <option value={"canada"}>Canada</option>
                <option value={"australia"}>Australia</option>
              </select>
            </div>
            <div className="button__style__wrapper">
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                type="submit"
                className="btn btn-primary button__style mb-5">
                Submit
              </button>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default RegistraionForm;
