A small web application for managing college events, built by a team of four as a Collaborative DevOps Project Using GitHub for the M.Sc. (Computer Science) DevOps practical at P.D.E.A.'s Baburaoji Gholap College, Sangvi, Pune.

Live demo: https://dineshajetrao.github.io/college-event-management/

Project Objective

The goal of this project is to practise a complete DevOps workflow on GitHub:

Plan -> Code -> Commit -> Push -> Review -> Build/Test -> Deploy

We built a working event management system and used GitHub Issues, branches, pull requests, code review and GitHub Actions (CI/CD) to plan, develop, test and deploy it.

Team Members and Contributions
Member	Branch	Issue	Contribution
Dinesh Ajetrao	feature/student-registration, feature/ci-cd, feature/web-ui	#2, #4	Repository setup, student registration and validation, CI/CD pipeline, web interface, deployment
Chaitanya Patil	feature/event-management	#3	Event creation and event registration logic with tests
Gitanjalee Dhanke	feature/login	#1	Login module with tests
Srushti Kendale	feature/report, testing	#5	Event report generator, test cases and bug fixing
Features
Student registration with validation (name, email format, 10-digit phone, password of at least 6 characters, no duplicate emails)
Login for students and for the organiser (admin)
Event management: admin can create and delete events
Event registration: students can register for events and cancel from "My Registrations"; duplicate registrations are blocked
Report: admin can see the number of registrations for each event
Automated testing and deployment on every push using GitHub Actions
Demo accounts
Role	Username	Password
Admin (organiser)	admin	admin123
Student	student	student123

New students can also create their own account from the Register tab.

Technologies Used
Area	Technology
Language	JavaScript (Node.js and browser)
Front end	HTML, CSS
Testing	Jest
Version control	Git, GitHub
Project management	GitHub Issues, GitHub Projects board
CI/CD	GitHub Actions
Hosting	GitHub Pages
Project Structure
college-event-management/
├── .github/
│   └── workflows/
│       └── ci.yml            # CI/CD pipeline (build, test, deploy)
├── docs/                     # Documentation and screenshots
│   └── screenshots/
├── public/                   # Web interface
│   ├── index.html
│   ├── style.css
│   └── app.js
├── src/                      # Application logic
│   ├── registration.js       # Student registration and validation
│   ├── login.js              # Login
│   ├── event.js              # Event creation and event registration
│   └── report.js             # Registration report
├── tests/                    # Jest test files
├── build.js                  # Build script (creates the dist folder)
├── package.json
├── .gitignore
└── README.md
Installation and Running Locally

Prerequisites: Git and Node.js (LTS version).

Clone the repository:
   git clone https://github.com/dineshajetrao/college-event-management.git
Go into the project folder:
   cd college-event-management
Install dependencies:
   npm install
Run the tests:
   npm test
Build the project:
   npm run build
Open dist/index.html in your browser (or right-click it in VS Code and choose Open with Live Server).
DevOps Workflow
Branching strategy
main is protected by process: nobody commits to it directly.
Every member works on their own feature branch (feature/...) and the testing branch is used for test and bug-fix work.
Changes reach main only through pull requests.
Issues and project board

Work was planned as GitHub Issues and tracked on a project board with the columns Open -> In Progress -> Completed:

Issue	Title
#1	Create Login Module
#2	Implement Student Registration
#3	Add Event Management
#4	Validate Registration Form
#5	Test Login Module
Commits

Every member made small, meaningful commits with clear messages (for example Add login module, Implement event creation, Fix login test bug) so each person's contribution can be traced in the commit history.

Pull requests and code review
A member finishes work on their feature branch and pushes it.
They open a pull request into main (the description links the issue, for example Closes #1).
The CI checks run automatically on the pull request.
A different team member reviews the code, leaves comments and approves it.
After approval and a green check, the pull request is merged into main.
CI/CD pipeline (GitHub Actions)

The workflow file is .github/workflows/ci.yml.

Developer -> Git push -> GitHub repository -> GitHub Actions
          -> Build -> Test -> Deploy to GitHub Pages
Job	When it runs	Steps
build-and-test	On every push and every pull request	Checkout code, set up Node.js 20, install dependencies, run tests, build the project, upload the site
deploy	Only on main, and only after build-and-test passes	Publish the built site to GitHub Pages

If a test fails, the pipeline stops and nothing is deployed.


GitHub workflow

Repository	Branches

Issues and project board	Pull request with approved review

Passing CI/CD pipeline	
Application
	

Login and registration	Events and registration
Admin report	
Limitations and Future Scope
Data is stored in the browser (localStorage), so it is not shared between users or devices.
Passwords are stored without hashing, which is acceptable only for a demo.
A future version could add a backend server and database, password hashing, email confirmation, event capacity limits and date-based filtering.
Acknowledgements

Developed under the guidance of Ms. A. C. Suryawanshi and Mr. Sudarshan Lakhdive, Department of Computer Science, P.D.E.A.'s Baburaoji Gholap College, Sangvi, Pune.
