import "../css/CustomDropdown.css";

const Dropdown = ({ label, value, options, data, onType, formData}) => {

  function handleOnChange(event){
    onType(value, event.target.value)
  }

  return (
    <div className="dropdown-group">
      <select
        className={`dropdown-field ${data || formData? "has-value" : ""}`}
        value={data? data : formData}
        onChange={handleOnChange}
        required
      >
        <option disabled>{" "}</option>
        {options.map((option, index) => (
          <option
            className="register-dropdown-option"
            key={index}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
      <label className="register-dropdown-label">{label}</label>
    </div>
  );
};

export default Dropdown;
