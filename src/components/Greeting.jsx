import "../styles/components/Greeting.css";

function capitalize(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function Greeting({ user }) {
  const firstName = user?.fullname?.split(" ")[0] || "User";
  const fullname = user?.fullname || "User";
  const capitalizedFirstName = capitalize(firstName);
  const capitalizedFullName = capitalize(fullname);

  return (
    <section className="greetings">
      <div className="greetings-text">
        <h1>Good Morning, {capitalizedFirstName}!</h1>
        <p>Check all your incoming and outgoing transactions here</p>
      </div>
      <div className="profile">
        <div className="profile-name">
          <h3>{capitalizedFullName}</h3>
          <p>Personal Account</p>
        </div>
        <img
          src={
            user?.avatarUrl ||
            `https://avatar.iran.liara.run/username?username=${user?.fullname}`
          }
          height="100px"
          width="100px"
        />
      </div>
    </section>
  );
}

export default Greeting;
