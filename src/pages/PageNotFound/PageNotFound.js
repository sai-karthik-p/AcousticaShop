export default function PageNotFound() {
  return (
    <>
      <div
        style={{
          fontSize: "2rem",
          margin: "3rem 1rem",
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
          error
        </span>
        <span>Error 404. Page not found!</span>
      </div>
    </>
  );
}
