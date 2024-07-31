import React, { useState, useCallback, useEffect } from "react";
import { panValidation, postcodeValidation } from "./API/api";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer } from "./reducer/dataAddToArray";
import { Link, useNavigate } from "react-router-dom";

const FormComponent = () => {
  const [panStatus, setPanStatus] = useState("p");
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [post, setPost] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [multipleAddress, setMultipleAddress] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.customers);
  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  //form submit
  const formSubmit = (e) => {
    e.preventDefault();
    if (panStatus != true) {
      window.alert("INVALID PAN");
      return;
    }
    // Capture form values
    const newCustomer = {
      pan: e.target[0].value,
      name: e.target[1].value,
      email: e.target[2].value,
      mobile: e.target[3].value,
      address: [
        {
          address1: e.target[5].value,
          address2: e.target[6].value,
          postcode: e.target[7].value,
          state: state,
          city: city,
        },
      ],
    };
    dispatch(addCustomer(newCustomer));
    navigate("/customers");
  };
  //form submit

  const addAddressHandle = () => {
    setMultipleAddress([...multipleAddress, 1]);
  };

  // debounce for POST Code
  const debounce2 = (func) => {
    let timer;

    return function (...args) {
      setPostLoading(true);
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
      // setLoader(false)
    };
  };
  const handlePostChange = async (e) => {
    console.log(e.target.value);
    try {
      const response = await fetch(
        "https://lab.pixel6.co/api/get-postcode-details.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postcode: e.target.value }),
        }
      );
      const resp = await response.json();
      setCity(resp.city[0].name);
      setState(resp.state[0].name);
      console.log(resp);
    } catch {
      console.log("ERROR");
      setCity("");
      setState("");
    } finally {
      setPostLoading(false);
    }
  };
  const optimizedFn2 = useCallback(debounce2(handlePostChange), []);
  // debounce for POST Code

  //debouncing for PAN input
  const debounce = (func) => {
    let timer;

    return function (...args) {
      setLoader(true);

      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
      // setLoader(false)
    };
  };

  const handleSearchChange = (e) => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lab.pixel6.co/api/verify-pan.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ panNumber: e.target.value }),
          }
        );
        const resp = await response.json();
        // const resp = await panValidation(e.target.value).json();
        console.log(resp);
        setPanStatus(resp.isValid);
        setName(resp.fullName);
        console.log(resp);
      } catch {
        console.log("ERROR");
        setPanStatus("p");
        setName("");
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  };
  const optimizedFn = useCallback(debounce(handleSearchChange), []);
  //debouncing for PAN input

  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <div
          style={{ width: "380px", display: "flex", justifyContent: "center" }}
        >
          <img
            src="https://pixel6.co/wp-content/themes/new-pixel6-wp/assets/images/Pixel6.png"
            alt=""
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <form style={{ width: "400px" }} onSubmit={formSubmit}>
          {/* //pan div */}
          <div
            className="form-group"
            style={{
              marginBottom: "15px",
              marginTop: "30px",
              position: "relative",
              display: "flex",
            }}
          >
            <input
              type="text"
              name="pan"
              onChange={optimizedFn}
              maxLength="10"
              placeholder="Enter PAN"
              required
              style={{ width: "100%", padding: "8px" }}
            />
            {loader && (
              <img
                src="https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif"
                alt="Loading..."
                loading="lazy"
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                }}
              />
            )}
            {panStatus && !loader && panStatus != "p" && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 15.172L5.414 10.586L4 12L10 18L20 8L18.586 6.586L10 15.172Z"
                  fill="green"
                />
              </svg>
            )}
            {!panStatus && !loader && panStatus != "p" && (
              <p
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "1%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                }}
              >
                ❌
              </p>
            )}
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>

            {/* */}
            {/* */}
          </div>

          {/* //name div */}
          <div style={{ marginBottom: "15px", display: "flex" }}>
            <input
              type="text"
              value={name}
              required
              name="fullName"
              maxLength="140"
              placeholder="Full Name"
              style={{ width: "100%", padding: "8px" }}
            />
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </div>

          {/* //email div */}
          <div style={{ marginBottom: "15px", display: "flex" }}>
            <input
              type="email"
              name="email"
              required
              maxLength="255"
              placeholder="Email"
              style={{ width: "100%", padding: "8px" }}
            />
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </div>

          {/* //number div */}
          <div style={{ marginBottom: "15px", display: "flex" }}>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <span style={{ marginRight: "5px" }}>+91</span>
              <input
                type="number"
                name="mobile"
                value={mobile}
                required
                onChange={handleMobileChange}
                placeholder="Enter Mobile"
                style={{ padding: "8px", width: "100%" }}
              />
            </div>
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "96%",
            }}
          >
            <h2>Address</h2>
            <button
              style={{
                height: "30px",
                backgroundColor: "#007BFF", // blue background for the button
                color: "white", // white text color
                border: "none",
                borderRadius: "4px",
                padding: "0 15px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={addAddressHandle}
            >
              Add
            </button>
          </div>

          {/* //address div */}

          <div>
            <div style={{ marginBottom: "15px", display: "flex" }}>
              <input
                type="text"
                name="address"
                placeholder="Address Line 1"
                required
                style={{ width: "100%", padding: "8px" }}
              />
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </div>

            <div style={{ marginBottom: "15px", display: "flex" }}>
              <input
                type="text"
                name="address"
                placeholder="Address Line 2"
                style={{ padding: "8px", width: "92%" }}
              />
            </div>

            {/* //post code div */}
            <div style={{ marginBottom: "15px", display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  position: "relative",
                }}
              >
                <input
                  type="number"
                  name="postcode"
                  required
                  value={post}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Ensure only numbers are allowed and length is restricted to 6 digits
                    if (value.length <= 6) {
                      setPost(value);
                      optimizedFn2(e);
                    }
                  }}
                  placeholder="Enter Postcode"
                  style={{ padding: "8px", width: "100%" }}
                />
                {postLoading && (
                  <img
                    src="https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif"
                    alt="Loading..."
                    loading="lazy"
                    style={{
                      position: "absolute",
                      right: "30px",
                      top: "20%",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                )}
              </div>
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </div>

            {/* //state & city div */}
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <select
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    style={{ padding: "8px", width: "100%" }}
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnatak">Karnatak</option>
                    <option value="Tamilnadu">Tamilnadu</option>
                    <option value="MP">MP</option>
                    <option value="UP">UP</option>
                  </select>
                </div>
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </div>

              <div
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <select
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    style={{ padding: "8px", width: "100%" }}
                  >
                    <option value="" disabled>
                      Select City
                    </option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Banglore">Banglore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Kochi">Kochi</option>
                  </select>
                </div>
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </div>
            </div>
          </div>


          
          {multipleAddress?.map((_, index) => {
            return (
              <>
                <div key={index} style={{marginTop:'20px'}}>
                  <div style={{ marginBottom: "15px", display: "flex" }}>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address Line 1"
                      required
                      style={{ width: "100%", padding: "8px" }}
                    />
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </div>

                  <div style={{ marginBottom: "15px", display: "flex" }}>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address Line 2"
                      style={{ padding: "8px", width: "92%" }}
                    />
                  </div>

                  {/* //post code div */}
                  <div style={{ marginBottom: "15px", display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <input
                        type="number"
                        name="postcode"
                        required
                        // value={post}
                        // onChange={(e) => {
                        //   const value = e.target.value;
                        //   // Ensure only numbers are allowed and length is restricted to 6 digits
                        //   if (value.length <= 6) {
                        //     setPost(value);
                        //     optimizedFn2(e);
                        //   }
                        // }}
                        placeholder="Enter Postcode"
                        style={{ padding: "8px", width: "100%" }}
                      />
                      {/* {postLoading && (
                        <img
                          src="https://global.discourse-cdn.com/sitepoint/original/3X/e/3/e352b26bbfa8b233050087d6cb32667da3ff809c.gif"
                          alt="Loading..."
                          loading="lazy"
                          style={{
                            position: "absolute",
                            right: "30px",
                            top: "20%",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      )} */}
                    </div>
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </div>

                  {/* //state & city div */}
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        marginBottom: "15px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <select
                          name="state"
                          // value={state}
                          // onChange={(e) => setState(e.target.value)}
                          required
                          style={{ padding: "8px", width: "100%" }}
                        >
                          <option value="" disabled>
                            Select State
                          </option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Karnatak">Karnatak</option>
                          <option value="Tamilnadu">Tamilnadu</option>
                          <option value="MP">MP</option>
                          <option value="UP">UP</option>
                        </select>
                      </div>
                      <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                    </div>

                    <div
                      style={{
                        marginBottom: "15px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <select
                          name="city"
                          // value={city}
                          // onChange={(e) => setCity(e.target.value)}
                          required
                          style={{ padding: "8px", width: "100%" }}
                        >
                          <option value="" disabled>
                            Select City
                          </option>
                          <option value="Pune">Pune</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Banglore">Banglore</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Kochi">Kochi</option>
                        </select>
                      </div>
                      <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          <button
            type="submit"
            style={{
              padding: "12px",
              cursor: "pointer",
              width: "97%",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007BFF", // green background for the button
              color: "white", // white text color
              fontWeight: "bold",
              fontSize: "15px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // light shadow for elevation
              // smooth transition for background color change
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormComponent;
