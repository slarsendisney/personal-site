import React from "react";
import { Emojione } from "react-emoji-render";
import { Link } from "gatsby";

const Footer = () => (
  <footer>
    <div className="bg-secondary py-4 text-default">
      <div className="container px-4 mx-auto">
        <div className="-mx-4 flex flex-wrap justify-between">
          <div className="px-4 my-4 w-full xl:w-1/5">
            <h4 className="text-xl mb-3 font-bold">
              I&apos;m Sam Larsen-Disney.
            </h4>
            <p className="text-sm mb-3">
              I currently work as a UX Engineer at American Express. I enjoy
              teaching the next generation to code through my articles,
              presentations and at hackathons.
            </p>
            <Link to="/this-site">
              <button className="btn-sm-accent">About This Site</button>
            </Link>
          </div>

          <div className="px-4 my-4 w-full sm:w-auto">
            <div>
              <h4 className="text-xl mb-3 font-bold">Good Stuff</h4>
            </div>
            <ul className="text-sm">
              <li className="mb-2">
                <Link to="/about" className="hover:text-link ">
                  About Me
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/stats" className="hover:text-link ">
                  Site Stats
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/newsletter" className="hover:text-link ">
                  Newsletter
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/projects" className="hover:text-link ">
                  Projects
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/disclaimer" className="hover:text-link ">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          <div className="px-4 my-4 w-full sm:w-auto">
            <div>
              <h4 className="text-xl mb-3 font-bold">Recent Posts</h4>
            </div>
            <ul className="text-sm">
              <li className="mb-2">
                <a href="#" className="hover:text-link ">
                  Getting Started With HTML and CSS
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-link">
                  What Is Flex And When to Use It?
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-link">
                  How TailwindCSS Can Help Your Productivity?
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-link">
                  5 Tips to Make Responsive Website
                </a>
              </li>
              <li>
                <a href="/articles" className="hover:text-link">
                  See More
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
            <div>
              <h4 className="text-xl mb-1 font-bold">Connect</h4>
              <p>Lets start a discussion on the interwebs.</p>
            </div>
            <div className="text-4xl flex flex-wrap items-center ">
              <a
                href="https://twitter.com/SamLarsenDisney"
                className="hover:text-link"
                target="_blank"
                rel="noreferrer"
              >
                <i className="lab la-twitter "></i>
              </a>
              <a
                href="https://www.linkedin.com/in/samuel-larsen-disney"
                className="hover:text-link"
                target="_blank"
                rel="noreferrer"
              >
                <i className="lab la-linkedin-in mr-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-primary py-4 text-primary">
      <div className="container mx-auto px-4">
        <div className="-mx-4 flex flex-wrap justify-between">
          <div className="px-4 w-full text-center sm:w-auto sm:text-left text-sm">
            Copyright &copy; {new Date().getFullYear() + " "}
            Sam Larsen-Disney. All Rights Reserved.
          </div>
          <div className="px-4 w-full text-center sm:w-auto sm:text-left text-sm flex items-center">
            Made with <Emojione text="❤️" className="text-base mx-1 mt-1" /> by
            SLD
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
