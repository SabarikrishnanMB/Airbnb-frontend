import { React } from "react";
import "./home.css";
import Banner from "./Banner";
import Card from "./Card";
import { useHistory, Link } from "react-router-dom";

function Home() {
  const history = useHistory();
  return (
    <>
      <div className="home">
        <Banner />
        <h2>Inspiration for your next trip</h2>

        <div className="home_section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Link to="/s/pondy">
                  <Card
                    src="https://res.cloudinary.com/thrillophilia/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_auto,h_600,q_auto,w_auto/v1/filestore/3xlpsrsfae3c3dlutxk7gbyvww1z_C9mfEbPFPG.jpg"
                    title="Pondicherry"
                    desc="Stay and experience the French Connection in India."
                  />
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/s/ooty">
                  <Card
                    src="https://pix10.agoda.net/hotelImages/1199341/-1/ee4a31f09f8bb5a126ace8eb2bea38f8.jpg?ca=8&ce=1&s=1024x768"
                    title="Ooty"
                    desc="Get close to nature this vacation... Enjoy the Nature and Explore It..."
                  />
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/s/chennai">
                  <Card
                    src="https://www.theparkhotels.com/images/site-specific/kolkata/home/HERO-FACADE-NIGHT.jpg"
                    title="Chennai"
                    desc="Business or Pleasure trip we got you covered for a comfortable stay."
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="home_section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Card
                  src="https://a0.muscache.com/im/pictures/eb9c7c6a-ee33-414a-b1ba-14e8860d59b3.jpg?im_w=720"
                  title="Online Experiences"
                  desc="Unique activities we can do together, led by a world of hosts."
                />
              </div>
              <div className="col-md-4">
                <Card
                  src="https://a0.muscache.com/im/pictures/15159c9c-9cf1-400e-b809-4e13f286fa38.jpg?im_w=720"
                  title="Unique Stays"
                  desc="Spaces that are more than just a place to sleep."
                />
              </div>
              <div className="col-md-4">
                <Card
                  src="https://a0.muscache.com/im/pictures/fdb46962-10c1-45fc-a228-d0b055411448.jpg?im_w=720"
                  title="Entire Homes"
                  desc="Comfortable private places, with room for friends and family."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="home_section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Card
                  src="https://a0.muscache.com/im/pictures/fa91c6d9-c37e-4bb3-bdc1-0edb3044adb4.jpg"
                  title="Gashes Fluss Haus"
                  desc="Walk back past tall trees, over a small wooden bridge with built-in love seats."
                  price="₹5,563/ night"
                />
              </div>
              <div className="col-md-4">
                <Card
                  src="https://a0.muscache.com/im/pictures/a0464a64-e8fc-4bcc-bda0-61ca8bfdac5f.jpg?im_w=1200"
                  title="Underground Home with View"
                  desc="Unique modern tiny 'hobbit house' located on bucolic 9 acre farm."
                  price="₹6,463/ night"
                />
              </div>
              <div className="col-md-4">
                <Card
                  src="https://a0.muscache.com/im/pictures/47d2e3eb-2e32-4a37-98fa-87b493bc480f.jpg?im_w=1200"
                  title="Airstream On The River"
                  desc="Located within walking distance to Carrier Park,and the climbing gym."
                  price="₹15,264/ night"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
