import PropTypes from "prop-types";
import { useState } from "react";
import "./App.css";
import moment from "moment";

const DUMMY_DATA = [
  {
    name: "vybhav",
    location: "chennai",
    company: "wipro",
    doj: moment([2015, 7, 13]),
  },
  {
    name: "vybhav",
    location: "bangalore",
    company: "wipro",
    doj: moment([2015, 12, 1]),
  },
  {
    name: "rohith",
    location: "bangalore",
    company: "wipro",
    doj: moment([2015, 7, 13]),
  },

  {
    name: "rohith",
    location: "chennai",
    company: "wipro",
    doj: moment([2015, 7, 13]),
  },
  {
    name: "vybhav",
    location: "hyderabad",
    company: "lti",
    doj: moment([2021, 4, 8]),
  },
];

const Dropdown = ({
  id = "",
  label = "",
  options = [],
  onChange = () => {},
  formData = {},
}) => (
  <>
    {label && <label htmlFor={id}>{label}</label>}
    <select name={id} id={id} value={formData[id]} onChange={onChange}>
      {options.map(({ label, value }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </select>
  </>
);

Dropdown.propTypes = {
  formData: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

function App() {
  const [formData, setFormData] = useState({});

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ formData });

    const selectedDropdownFields = Object.keys(formData);

    const filteredData = DUMMY_DATA.filter((employeeInfo) => {
      const matched = selectedDropdownFields.every(
        (selectedDropdownField) =>
          employeeInfo[selectedDropdownField] ===
          formData[selectedDropdownField]
      );

      return matched && moment().isAfter([2019, 1, 1]);
    });
    console.log({ filteredData });
  };

  const handleReset = () => setFormData({});

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Dropdown
          id="company"
          label="Choose a company : "
          options={[
            { label: "Wipro", value: "wipro" },
            { label: "LTI", value: "lti" },
            { label: "Mindtree", value: "mindtree" },
            { label: "HSBC", value: "hsbc" },
          ]}
          onChange={onChange}
          formData={formData}
        />
        <br />
        <Dropdown
          id="location"
          label="Choose a location : "
          options={[
            { label: "chennai", value: "chennai" },
            { label: "Bangalore", value: "bangalore" },
            { label: "Hyderabad", value: "hyderabad" },
          ]}
          onChange={onChange}
          formData={formData}
        />
        <br />
        <Dropdown
          id="name"
          label="Choose a name : "
          options={[
            { label: "Vybhav", value: "vybhav" },
            { label: "Podala", value: "podala" },
            { label: "Rohith", value: "rohith" },
            { label: "Surya", value: "surya" },
            { label: "Gonela", value: "gonela" },
          ]}
          onChange={onChange}
          formData={formData}
        />
        <br />
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" onClick={handleReset} />
      </form>
    </div>
  );
}

export default App;
