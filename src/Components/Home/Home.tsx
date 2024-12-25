import { useContext } from "react";
import { TypeAnimation } from "react-type-animation";
import { AuthContext } from "../Context/AuthContext";
import wavyHand from "../../assets/waving-hand-light-skin-tone-svgrepo-com.svg";
export default function Home() {
  const { userData } = useContext(AuthContext);
  console.log(userData);
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center home">
        <h1>
          <span>
            <img src={wavyHand} className="wavyHand" />
          </span>
          Welcome !
        </h1>
        <TypeAnimation
          sequence={[
            `Welcome To UMS System`,
            1000,
            `Welcome ${userData?.firstName} ${userData?.lastName}`,
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "20px" }}
          repeat={Infinity}
        />
      </div>
    </>
  );
}
