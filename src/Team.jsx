import React from "react";
import "./Team.css";
import member1 from "./assets/member1.jpg"
import member2 from "./assets/member2.jpg"
import member3 from "./assets/member3.jpg"
import member4 from "./assets/member4.jpg"
import member5 from "./assets/member5.jpg"
import member6 from "./assets/member6.jpg"


const teamMembers = [
  { name: "Sathija Dissanayake", role: "Project Lead", image: member5},
  { name: "Mohommed Adheeb", role: "Backend Developer", image: member6},
  { name: "Ahmed Omer", role: "Frontend Developer", image:member1 },
  { name: "Dulani Kamkanamge", role: "Data Analyst", image:member2 },
  { name: "Methmi Apoorwa", role: "UI/UX Designer", image:member3 },
  { name: "Menaya Karunanayake", role: "Marketing Specialist", image:member4 }
];

const Team = () => {
  return (
    <section className="team-section">
      <h2>Meet Our Team</h2>
      <h4>Meet our expert team of digital strategists, AI specialists, and creatives, dedicated to driving growth with innovative solutions. Your success is our mission!</h4>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
