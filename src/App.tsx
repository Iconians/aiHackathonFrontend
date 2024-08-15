import { useState } from "react";
import "./App.css";

export type propertyDataType = {
  brokered_by: string;
  status: string;
  price: string;
  bed: string;
  bath: string;
  acre_lot: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  house_size: string;
  prev_sold_date: string;
};

export type similarPropertyType = {
  property: propertyDataType;
  relevance_score: number;
};

function App() {
  const [formHide, setFormHide] = useState(false);
  const [estimatedRes, setEstimatedRes] = useState("");
  const [similarProp, setSimilarProp] = useState<similarPropertyType[] | []>(
    []
  );
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const city = formData.get("city");
    const state = formData.get("state");
    const size = formData.get("size");
    const rooms = formData.get("rooms");
    const condition = formData.get("condition");
    const bath = formData.get("bath");
    const acre_lot = formData.get("acre_lot");
    const data = {
      city,
      state,
      size,
      rooms,
      condition,
      bath,
      acre_lot,
    };
    setFormHide(true);
    fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setEstimatedRes(data.estimatedValue);
        // setSimilarProp(data.rankedProperties);
        setQuery(data.response);
      });
  };
  return (
    <>
      <div>
        <h1>Welcome to the property valuation tool</h1>
        <form
          onSubmit={handleSubmit}
          className={`form ${!formHide ? "form-visible" : "form-hidden"}`}
        >
          <label htmlFor="location">City:</label>
          <input type="text" id="city" name="city" />
          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" />
          <label htmlFor="size">Size (sq ft):</label>
          <input type="text" id="size" name="size" />
          <label htmlFor="rooms">Number of rooms:</label>
          <input type="text" id="rooms" name="rooms" />
          <label htmlFor="condition">Condition of property:</label>
          <input type="text" id="condition" name="condition" />
          <label htmlFor="bath">Number of baths:</label>
          <input type="text" id="bath" name="bath" />
          <label htmlFor="rooms">acreage:</label>
          <input type="text" id="acre_lot" name="acre_lot" />
          <button type="submit" className="button">
            Estimate Value
          </button>
        </form>

        <div>
          <p>{estimatedRes}</p>
          {similarProp?.map((prop) => (
            <div key={prop.relevance_score} className="card">
              <p> City: {prop.property.city}</p>
              <p>State: {prop.property.state}</p>
              <p>SquareFeet: {prop.property.house_size}</p>
              <p>Bedrooms {prop.property.bed}</p>
              <p>Bathrooms{prop.property.bath}</p>
              <p>Acreage{prop.property.acre_lot}</p>
              <p>Price: {prop.property.price}</p>
            </div>
          ))}
          <p>{query}</p>
        </div>
      </div>
    </>
  );
}

export default App;
