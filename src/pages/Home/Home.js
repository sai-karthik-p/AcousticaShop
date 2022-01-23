import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div
        style={{
          fontSize: "2rem",
          margin: "3rem 0.5rem 0.5rem 0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <span
          style={{
            fontSize: "3rem",
            marginRight: "0.8rem"
          }}
          className="material-icons"
        >
          storefront
        </span>
        <span>Welcome to Acoustica Shop!</span>
      </div>

      <div
        style={{
          fontSize: "1.3rem",
          margin: "1rem 0.5rem 0.5rem 0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <span>A one stop destination for all your shopping needs.</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <NavLink to="/products">
          <button className="btn btn-simple btn-with-icon">
            <span className="material-icons md-18">storefront</span>
            <span className="btn-text">Shop Now!</span>
          </button>
        </NavLink>
      </div>
    </>
  );
}
