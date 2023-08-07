import Nav from "./Nav";
import Footer from "./Footer";
import { useState } from "react";


function App() {
  
  const [mailState, setMailState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

const handleStateChange = (e) => {
  setMailState((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value
  }))
}

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
   const response = await fetch(
     "https://demiakinsola-personal-portfolio.onrender.com/send",
     {
       method: "POST",
       headers: { "Content-type": "application/json" },
       body: JSON.stringify({ mailState }),
     }
   );
    
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === "success") {
              setMailState({
          name: '',
          email: '',
          subject: '',
          message: ''
              })
          alert("Email sent");
  } else {
        alert("Email failed to send");
      }
    } catch(err) {
      console.log(err);
  }
}
  


  return (
    <div className="App">
      <Nav />
      <div className="Introduction">
        <section className="Text">
          <p className="name">
            Hi, I'm Oluwademilade Akinsola,
            <br />a BackEnd Developer.
          </p>
          <p>
            I have vast knowledge of backEnd languages and databases.
            <br />
            My goal is to be great at what I do as well as contribute my
            <br />
            quota in terms of API development to the technology industry.
          </p>
        </section>
        <section>
          <img
            src="https://media.istockphoto.com/id/1279651871/vector/a-woman-works-at-a-laptop-and-drinks-coffee-home-office-freelance-and-online-training.jpg?s=612x612&w=0&k=20&c=1GTAqS53MAUs2wL-Fgv7zq0d2GdrgAYpBSBkNXdd6YE="
            alt="A lady working on a laptop"
          />
        </section>
      </div>
      <section id="projects" className="Projects">
        <div className="row">
          <div className="col-6 Column">
            <a href="#">
              <p>Work in Progress</p>
            </a>
          </div>
          <div className="col-6 Column">
            <a href="#">
              <p>Work in Progress</p>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-6 Column">
            <a href="#">
              <p>Work in Progress</p>
            </a>
          </div>
          <div className="col-6 Column">
            <a href="#">
              <p>Work in Progress</p>
            </a>
          </div>
        </div>
      </section>
      <section className="Contact" id="contact">
        <p>Contact me via:</p>
        <form
          method="POST"
          id="contact-form"
        >
          <input
            className="inputs"
            type="text"
            name="name"
            value={mailState.name}
            placeholder="Your Name"
            onChange={handleStateChange}
            required
          />
          <input
            className="inputs"
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={mailState.email}
            onChange={handleStateChange}
            required
          />
          <input
            className="inputs"
            type="text"
            name="subject"
            placeholder="Mail Subject"
            value={mailState.subject}
            onChange={handleStateChange}
            required
          />
          <textarea
            className="textarea"
            style={{ width: "380px", height: "200px" }}
            type="textarea"
            name="message"
            placeholder="Your Message"
            required
            value={mailState.message}
            onChange={handleStateChange}
          ></textarea>
          <button
            className="Butn"
            id="but1"
            type="submit"
            value="submit"
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default App;
