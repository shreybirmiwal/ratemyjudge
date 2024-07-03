import React from 'react';
import Navbar from '../Components/Navbar.js';

function About() {
  return (
    <div className="w-full h-screen relative flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-900/30">
        <h1 className="text-4xl font-bold mb-4 text-center">About RateMyJudge.xyz</h1>
        <h2 className="text-xl font-semibold mb-6 text-center">Leveling the Playing Field in Public Forum Debate</h2>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl text-gray-800">

          <p className="mb-4">
            RateMyJudge.xyz was created to make debate rounds, especially in Public Forum, fairer and more transparent. Many high school debate judges have biases toward certain styles of debating - some prefer speed, others favor slow and deliberate arguments, some like theoretical debates, and others enjoy progressive arguments.
          </p>
          <p className="mb-4">
            Sometimes, judges do not have a paradigm posted or they judge differently in actuality compared to their posted paradigm. This can create an uneven playing field and confusion for debaters.
          </p>
          <p className="mb-4">
            Our community-run voting center offers open-source disclosure of judges' information. This transparency helps make debate safer, more educational, and fair for everyone involved.
          </p>
          <p>
            Created by Shrey Birmiwal, RateMyJudge.xyz is dedicated to improving the debate experience by providing valuable insights and fostering a fair environment for all participants.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
