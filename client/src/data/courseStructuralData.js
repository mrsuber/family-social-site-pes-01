import {logo} from '../images'
export const courseStructuralData = [
  // {
  //   companyName:"Google",
  //   companyHeadOfficeLocation:"Austin, Texas, United States",
  //
  // },
  {
    learningTitle:"Foundations",
    companyHeadOfficeLocation:"Cameroon | Buea",
    logo:logo,

    companyLevel1:[
      {
        name:"How this Course Will Work",
        courseStatus:"Incomplete",

        courseNumber:"001",
        logo:logo,
        menu:[
          {
            name:'Welcome To Msb Tutoring',
            detail:"This program is dedicated to providing the best information sources to take you from zero to a full-stack developer.",
            ancorName:"welcome"
          },
          {
            name:'Introduction',
            detail:"In this unit, we’ll learn about how the web works and start thinking about the basics of computer and web programming.\n Each of the following sections and lessons represents essential baseline knowledge. Even if you have no intention of becoming a web developer yourself, this material should help you gain a useful understanding of the moving parts involved in creating and serving content on the web.\n We will start by getting familiar with the internet and your own computer. Next, we’ll work on setting up a development environment and learning about Git and GitHub. Then, we’ll go over the basics of front-end technologies like HTML, CSS, and Javascript before stepping into the back end with a brief foray that covers the basic concepts of back-end technologies.\n By the end of this unit, you should not only understand how the web works but also be able to identify and differentiate between all the technologies that you will use to build your own web applications. You will be able to build a simple webpage, style it, and add minor elements of interactivity while working comfortably from the command line.\n This section intentionally covers a very broad range of topics. It’s silly to go diving straight into server-side programming without having a context for what it is and why it’s useful (and why you should learn it!).",
            ancorName:"introduction"
          },
          {
            name:'How It Works',
            detail:"This curriculum works by pulling together the best content from across the internet for learning a particular topic. In each lesson, we’ll introduce the topic and try to provide some useful context before pointing you to external resources made by others.\n Most lessons will contain questions that you should be able to answer before moving on. Some of the lessons will ask you to complete exercises. In addition, we provide several projects throughout the curriculum to help you grow your understanding by actually building things.\n Try not to think of programming, as a class in school. It’s not material you learn all at once to take a test, and then pass or fail. You can think of it as a snowball. You, yourself, are a snowball. You’re rolling down a hill full of snow and the further you roll; the more snow will stick to you. Sure, snow will also fall off you, and you’ll forget things often, but that’s just part of the process. Don’t be scared if you get to a project and you feel like you haven’t retained or memorized anything. That’s natural and happens to everyone. The information will come back to you as you start solving your problems one at a time, relying on Google and the Odin Community for help.",
            ancorName:"howItWorks"
          },
          {
            name:'A Note About Language',
            detail:"Please be aware that this curriculum is written in English and maintained by English speakers who are not able or expected to translate it for you. As you develop into a programmer, you will find that the world you are entering into is firmly rooted in the English language. This means that the syntax of your programming language, the documentation that teaches you how to use it, and the majority of the people in the community are all expecting to communicate with you in English.\nIf you are a non-English speaker, or English is not a primary language for you, this fact is not meant to discourage you, but to prepare you.\nAs another part of this preparation, we highly recommend spending extra time on topics and terms that you do not understand right away. We also encourage you to seek out additional resources that teach about these topics in your own native language so you can understand them more fully.\nIn addition to this, you might also consider using a translation dictionary in your own language alongside our curriculum so you can readily reference it as you go. We do not have any recommendations on these since there are such a wide variety of languages spoken throughout the world, finding one may perhaps be a good first step in learning how to find useful tools online by searching. This is a skill you will utilize and improve as you progress in your learning to be a developer.\n",
            ancorName:"language"
          },
          {
            name:'What Comes Next',
            detail:"Once you’ve completed this course, you should feel comfortable with the building blocks of web programming but itching to dig deeper. Though we spend a fair bit of time digging into each of the major topics in this course, it’s really just a taste of what comes next (and all the cool stuff you can do with it).\nThe last lesson of this course will give you an opportunity to choose between a Full Stack JavaScript and Full Stack Rails path, both of which are designed to take the foundation built in this course and build it into an applied understanding of the material. Each path will focus on taking these raw building blocks and honing them into a highly functional skillset.\nThis program is maintained by professionals. We have chosen some of the best resources available and curated a guide on how to go through them. If there are no good resources, we write our own. With that said, know that everything in the curriculum is intentionally included and vital for you to become a successful programmer.\nAs you move forward, in the curriculum each portion is built on everything that came before it, so skipping things will create pockets of non-understanding in your knowledge that start to affect your ability to solve problems and understand the task at hand.\nAdditional resources are the only thing that is considered optional unless explicitly stated. These are here in case you feel like you need or want to dive deeper into a topic to get a better understanding.\n DO NOT SKIP ANYTHING!",
            ancorName:"whatComesNext"
          }

        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-how-this-course-will-work"
          }
        ],
        people:[ ]
      },

      {
        name:"Introduction to Web Development",
        courseStatus:"incomplete",
        courseNumber:"002",
        logo:logo,
        menu:[
          {
            name:'What Do Web Developers Do?',
            detail:"In short, web developers build and maintain websites.\nWeb developers often work for clients who are trying to get their product or service onto the web. The work is typically very project focused and involves collaborating with a team that helps to coordinate the client’s needs into the end product. The client could be a tech company, an organization, or a government. The work could involve front-end, back-end, or full-stack web development.\nWeb development could be a good profession for you if you like solving logical problems, building useful things, and experimenting with new technologies. Web developers are in high demand, generally have a good work/life balance, and command comfortable salaries. Google your specific location to get a better sense of your local web development job opportunities.\n For more details, Wikipedia describes the breadth of the web development profession in their entry on web design.",
            ancorName:"WhatDoWebDevelopersDo",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650456852/msbGeanologyProfilePics/wiki1_gwa5pf.png"
          },
          {
            name:'Types of Web Developers',
            detail:"Earlier, we mentioned that web development work could be in the front end, the back end, or the full stack. What exactly do these terms mean?\n The front end is the stuff you see on the website in your browser, including the presentation of content and user interface elements like the navigation bar. Front-end developers use HTML, CSS, JavaScript, and their relevant frameworks to ensure that content is presented effectively and that users have an excellent experience.\n The back end refers to the guts of the application, which live on the server. The back end stores and serves program data to ensure that the front end has what it needs. This process can become very complicated when a website has millions of users. Back-end developers use programming languages like Java, Python, and Ruby to work with data.\n Full-stack developers are comfortable working with both the front and back ends. At The Odin Project, we focus on teaching you full-stack development, covering all aspects of web development.\n For more detail, Udacity has a great blog post on this topic: 3 Web Dev Careers Decoded: Front-End vs Back-End vs Full Stack",
            ancorName:"TypesofWebDevelopers",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650456962/msbGeanologyProfilePics/frontVsBackVsfullStack_o2ap9k.png"

          },
          {
            name:'Types of Careers',
            detail:"Now that you know about the different types of web developers, let’s cover what we mentioned earlier about the different types of clients and employers you may work with.\n Large tech companies, such as Google, Facebook, and Amazon, have very stringent hiring requirements. If you successfully meet these expectations, they offer excellent pay, benefits, and opportunities.\n Startups are a bit like the wild west. For a junior developer, it can feel like a trial by fire because of the pace of development. Startups often offer slightly lower salaries and require longer hours, but they may also offer equity in the company and highly unique environments.\nAs a freelancer, you could command a strong hourly wage and the freedom to schedule and design your own products. However, you would be responsible for getting your own work (which means less coding time), managing billing from clients (which can be difficult), and being solely responsible. Strong people skills are necessary for this path.\nAs a consultant for a web consultancy, you would give up some of your freelancing wage potential but be able to focus more on the code and less on the hustle. This option also provides a good work/life balance and pay.\nFinally, large, older companies still need web developers. These companies offer a good work/life balance, pay, and benefits but often move slower than a company that is highly focused on tech.",
            ancorName:"TypesofCareers"
          },
          {
            name:'Tools of the Trade',
            detail:"These are some of the basic tools you will use regularly. You may not know what they are now, but you most certainly will going forward.",
            ancorName:"ToolsoftheTrade"
          },
          {
            name:'Computer',
            detail:"A computer is an electronic device that manipulates information, or data. It has the ability to store, retrieve, and process data. You may already know that you can use a computer to type documents, send email, play games, and browse the Web. You can also use it to edit or create spreadsheets, presentations, and even videos.",
            ancorName:"whatComesNext",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650457042/msbGeanologyProfilePics/computer_j4qktk.png"
          },
          {
            name:'Google',
            detail:"Google is a fully-automated search engine that uses software known as web crawlers that explore the web on a regular basis to find sites to add to our index. In fact, the vast majority of sites listed in our results aren't manually submitted for inclusion, but are found and added automatically when our web crawlers crawl the web.\n Google Search works in essentially three stages:\nCrawling: Google searches the web with automated programs called crawlers, looking for pages that are new or updated. Google stores those page addresses (or page URLs) in a big list to look at later. We find pages by many different methods, but the main method is following links from pages that we already know about.\nIndexing: Google visits the pages that it has learned about by crawling, and tries to analyze what each page is about. Google analyzes the content, images, and video files in the page, trying to understand what the page is about. This information is stored in the Google index, a huge database that is stored on many computers.\n Serving search results: When a user searches on Google, Google tries to determine the highest quality results. The 'best' results have many factors, including things such as the user's location, language, device (desktop or phone), and previous queries. For example, searching for 'bicycle repair shops' would show different answers to a user in Paris than it would to a user in Hong Kong. Google doesn't accept payment to rank pages higher, and ranking is done algorithmically.",
            ancorName:"google",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650457279/msbGeanologyProfilePics/google_jaw3vq.png"
          },
          {
            name:'Text Editor',
            detail:"A text editor is a computer program that lets a user enter, change, store, and usually print text (characters and numbers, each encoded by the computer and its input and output devices, arranged to have meaning to users or to other programs). Typically, a text editor provides an 'empty' display screen (or 'scrollable page') with a fixed-line length and visible line numbers. You can then fill the lines in with text, line by line. A special command line lets you move to a new page, scroll forward or backward, make global changes in the document, save the document, and perform other actions. After saving a document, you can then print it or display it. Before printing or displaying it, you may be able to format it for some specific output device or class of output device. Text editors can be used to enter program language source statements or to create documents such as technical manuals.\nA popular text editor in IBM's large or mainframe computers is called XEDIT. In UNIX systems, the two most commonly used text editors are EMACS and Vi . In personal computer systems, word processor s are more common than text editors. However, there are variations of mainframe and UNIX text editors that are provided for use on personal computers. An example is KEDIT, which is basically XEDIT for Windows.",
            ancorName:"textEditor",

          },
          {
            name:'Command Line Interface (CLI)',
            detail:"Abbreviated as CLI, a Command Line Interface connects a user to a computer program or operating system. Through the CLI, users interact with a system or application by typing in text (commands). The command is typed on a specific line following a visual prompt from the computer. The system responds to the text, and the user may then type on the next command line that appears. Through this command and response interaction, the user is able to issue a series of commands, which are executed by the system or program. Systems and software can provide users with both CLI and Graphical User Interface (GUI) options.\nProgrammers, experienced computer users, or administrators may utilise a CLI. There are specific situations when typing text into the interface will provide faster results than simply using a GUI. Plus, CLIs can offer greater control over an operating system via succinct commands. Operating system (OS) command line interfaces are normally programs that come with the OS. There are software applications that only offer a CLI. This software delivers a prompt, the user responds, and the application reacts to the commands successively.",
            ancorName:"cli",

          },
          {
            name:'Stack Overflow',
            detail:"Stack Overflow is a question and answer website for professional and enthusiast programmers. It is the flagship site of the Stack Exchange Network, created in 2008 by Jeff Atwood and Joel Spolsky.",
            ancorName:"StackOverflow",

          },
          {
            name:'GIT',
            detail:"Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.Git is easy to learn and has a tiny footprint with lightning fast performance. It outclasses SCM tools like Subversion, CVS, Perforce, and ClearCase with features like cheap local branching, convenient staging areas, and multiple workflows.",
            ancorName:"GIT",

          },
          {
            name:'GitHub',
            detail:"GitHub, Inc. is a provider of Internet hosting for software development and version control using Git. It offers the distributed version control and source code management functionality of Git, plus its own features.",
            ancorName:"GitHub",
          },
          {
            name:'Motivation',
            detail:"Learning to code is incredibly rewarding but can also be difficult and frustrating. The strongest assets you can have as a student are a desire to build, a problem-solving mind, and persistence in the face of setbacks.\n The web development industry has a long history of successful developers with varying backgrounds, so people tend to care more about what you’ve actually built than how you got there.",
            ancorName:"Motivation",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650457765/msbGeanologyProfilePics/multivation_qc9xlq.png"
          },
          {
            name:'Conclusion',
            detail:"Hopefully, you’ve gained a better idea of what a web developer actually does and what your life might look like if you decided to take it on as a career. This has only been a teaser into the world of web development.\nIn this course, “Foundations” you’ll take a journey through the entire spectrum of topics that you will eventually need to know. This course jumps around to a variety of topics that you may be totally unfamiliar with, providing you a small taste of each and then moving on.\nThe following courses will dive deep into these topics. You will build dozens of scripts, projects, and websites to cement those skills that will get you hired. Getting all the way there is going to be challenging. In fact, you should check out the post “Why Learning to Code is So Damn Hard” so you have a good idea of what the journey ahead is like. But what worthwhile thing is truly easy?",
            ancorName:"Conclusion",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"
          }


        ],
        additionalRead:[
          {
            title:"Quora: How can I Become a Really Good Web Developer?",
            url:"https://www.quora.com/Computer-Programming/How-can-I-become-a-really-good-web-developer-starting-from-now-at-age-20-before-age-25"
          },

          {
            title:"Quora: What makes a great web developer?",
            url:"https://blog.bitsrc.io/best-practices-in-using-iframes-with-react-6193feaa1e08"
          },
          {
            title:"Jared the Nerd: What makes a good web developer?",
            url:"https://jaredthenerd.com/2013/05/what-makes-a-good-developer/"
          },
          {
            title:"FreeCodeCamp: Things I Wish Someone Had Told Me When I Was Learning How To Code",
            url:"https://www.freecodecamp.org/news/things-i-wish-someone-had-told-me-when-i-was-learning-how-to-code-565fc9dcb329/"
          },
          {
            title:"TechCrunch: Don’t Believe Anyone who Tells you Learning to Code is Easy",
            url:"https://techcrunch.com/2014/05/24/dont-believe-anyone-who-tells-you-learning-to-code-is-easy/"
          },
          {
            title:"Code Quizzes: Deliberate Programming Practice",
            url:"https://codequizzes.wordpress.com/2013/04/28/deliberate-programming-practice/"
          },
          {
            title:"Roadmap to becoming a web developer in 2022",
            url:"https://github.com/kamranahmedse/developer-roadmap"
          },


        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
          {
            name:"Entry on web design wikipedia",
            link:"https://en.wikipedia.org/wiki/Web_design"
          },
          {
            name:"Frontend VS Backend Vs FullStack",
            link:"https://www.udacity.com/blog/2020/12/front-end-vs-back-end-vs-full-stack-web-developers.html"
          },
          {
            name:"Computer",
            link:"https://edu.gcfglobal.org/en/computerbasics/what-is-a-computer/1/"
          },

          {
            name:"Computer on wikipedia",
            link:"https://en.wikipedia.org/wiki/Computer"
          },
          {
            name:"Google",
            link:"https://developers.google.com/search/docs/basics/how-search-works"
          },
          {
            name:"Git",
            link:"https://git-scm.com/"
          },
          {
            name:"Stack Overflow",
            link:'https://stackoverflow.com/'
          },
          {
            name:"github",
            link:"https://github.com/"
          }
          ,
          {
            name:"Thinkful",
            link:"https://www.thinkful.com/blog/why-learning-to-code-is-so-damn-hard/"
          }
        ],
        people:[]
      },

      {
        name:"Motivation and Mindset",
        courseStatus:"incomplete",
        courseNumber:"003",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"Learning to code is incredibly rewarding but can also be difficult and frustrating. Like any skill worth knowing, it takes time to acquire, and it can’t be learned in a weekend or even a month. With that said, we believe anyone can learn how to program as long as they are willing to put in the time and effort.\nSo before we get into the meat of the curriculum, we’re going to go over the following to help you get the most out of This curriculum: the things that will help you succeed in your goal of learning to code and the pitfalls that you should try to avoid.",
            ancorName:"Introduction",

          },

          {
            name:'Motivation',
            detail:"Take a moment to think about why you have decided to learn programming.==>Do you want to have a fulfilling career that pays well?==>Are you excited by the creative outlet programming provides? ==>Are you determined to develop the skills and abilities to build any app you can think of? ==>Do you want to start your own company by turning an app idea into reality?.\nYour motivation could be a combination of these reasons or something else entirely. Whatever it is, hold on tightly to your motivation - this will be what pulls you through to the end of this journey, giving you a definitive goal to aim towards.To give your motivation a bit of a boost, you can read about the success of others:",
            ancorName:"Motivation",
            popup1Name:"A woman who taught herself enough to land a job in 5 months",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650455934/msbGeanologyProfilePics/woman_that_learn_cooding_ccguen.png",

            // popup2Name:"A 32 year old who taught himself programming using The Odin Project",
            // popup2:"",
          },

          {
            name:'Growth Mindset',
            detail:"Your mindset is very important when teaching yourself any new skills, not just programming. Your mindset will have more of an impact on your chances of success than just about anything else.Someone with the fixed mindset believes if they don’t get something on their first attempt, they never will. They believe that they simply aren’t smart enough to be able to do or understand some things.\nHowever, there is a wide body of research showing that intelligence is not fixed but can instead be developed. Someone with the growth mindset believes they can get better at anything with effort and persistence.What does this mean for you? It means you can learn new skills and develop new talents with persistence and grit.\nThere will be many times throughout The Project that you will get stuck on a concept or a programming problem and may find yourself questioning your ability to learn programming. When you find yourself in this position, remind yourself that you may not get it yet but that with persistence and grit you will. Struggling with something is growth. It doesn’t matter how long you struggle with a concept or project; all that matters is that you have the grit and tenacity to see it through. That’s how real learning happens.While you’re working through the curriculum, embrace the struggles you encounter with difficult concepts and complex projects. Be sure to celebrate your persistence at overcoming those struggles!\nWhen you find yourself questioning your abilities, reflect on the successes you have already achieved while learning to program: the projects you have completed and the concepts you once didn’t understand but now do. This is all the proof you need that you can do it.\nTo learn more about the growth mindset, check out these resources:",
            ancorName:"GrowthMindset",

          },

          {
            name:'The Learning Process',
            detail:"Learning concepts and then practicing them will help you to more fully understand how things work and fit together. Projects are the ultimate method for ensuring that your theoretical understanding aligns with how the programming concepts and techniques actually operate.\nWhen learning, your mind will consistently switch between focus mode and diffuse mode. Focus mode occurs when you are consciously focusing on learning, reading, watching videos, or working on a project. Diffuse mode occurs subconsciously, at times when you are not actively learning, such as when you’re doing the dishes, exercising, or sleeping. In this state, your mind goes about the business of connecting what you have been learning to the other things you know. This is where breakthroughs happen.\nIt’s important to know that your mind goes through these two states when learning because you can utilise this to make your learning more efficient. When stuck on a concept or project, taking a break to refresh and let your subconscious work on making connections more often than not yields a solution to your problem. The trick is to put effort into solving the problem first and then take a break.\nIn short, understand it, practice it, and finally teach it.\nTeaching what you know to others is a great way to solidify what you have learned and can often reveal holes in your knowledge that you wouldn’t have identified otherwise.\nYou can practice this method of learning by helping others in our community.(the odin project community)",
            ancorName:"TheLearningProcess",
            popup1Name:"To learn more about the best ways to learn, learning how to learn on Coursera is highly recommended",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650455929/msbGeanologyProfilePics/corsera_learn_howtolearn_i8dv86.png",

            // popup2Name:"The Ruby Rogues have a podcast on How to Learn, which should be motivational and useful to you, so check it out for some useful thoughts on learning.",
            // popup2:"",
          },
          {
            name:'What To Do When You’re Stuck',
            detail:"You will inevitably get stuck at some point in the curriculum, perhaps due to a concept that you are having difficulty understanding or perhaps due to something not working correctly in a project. Whatever it is, use the following tools to get unstuck:\n==>Google it: You can be certain someone else out there has encountered the same problem as you at some point. A quick Google search can often lead to a solution.\n==>Take a break: Allow your diffuse learning state to work on the problem.\n==>Come prepared with your research on Developer Chats. People will be more willing to help you when they can see you have already put effort into trying to figure out the solution on your own",
            ancorName:"WhatToDoWhenYou’reStuck",

          },
          {
            name:'Managing Your Study Time',
            detail:"You will have more success with Odin by putting consistent time into it rather than working on it once a week. Building a habit of studying every day at a specific time and with a specific goal will ensure that you make consistent progress.\nIt may take you longer than others to grasp concepts, or it may take you less time. This doesn’t mean you’re smarter or dumber than others, it means you’ve had differing life experiences that may or may not have prepared you for learning this stuff. Someone who grew up around an engineer may have some advantages over someone who didn’t, but it doesn’t mean you can’t learn those skills.\nThe Odin Project isn’t like college or university, it is self paced and allows you to get a really solid grasp of concepts before moving on. In school, you’re forced to keep up or you will fail. The difference here is that coming into The Odin Project, you’re not expected to have much knowledge; there are no prerequisites. We’ve had people be successful coming through here that only knew how to check their email with a computer. We’ve also seen success from computer science degree holders. Treating The Odin Project like a static timeline is understandable, but is a sign of misplaced expectations. You simply don’t know what you don’t know yet, and that’s OK! There’s no due-dates on things in The Odin Project so you can spend the time to do it right and discuss the topics.\nDeadlines cause un-needed stress. Since The Odin Project is a free and open platform, you are not beholden to a deadline. Creating your own deadlines is a good way to rush concepts that should not be rushed. This course is very research based, meaning you will have to do research to complete tasks and projects. There’s no telling if you can find the article or post that helps you in the right way, quickly to meet your deadlines, but I bet you learned a TON along the way that you can use in the future. People that do this kind of research and strive to write better solutions tend to become better developers in the future. There’s no knowing how long it could take you to learn how to query stuff to find your answers. There are no solid guidelines on that. If you’re doing The Odin Project because you need a high paying job right-now, you’re not going to become a solid developer within the timeframe you have set. Stress and anxiety absolutely do not help you learn either. Relax and just enjoy the ride.\nLong story short: Don’t worry, just go learn",
            ancorName:"ManagingYourStudyTime",

          },

          {
            name:'Pitfalls to Avoid',
            detail:"The following are some of the pitfalls that beginners often encounter when learning how to program. Try your best to avoid these.\n==>Procrastination::Procrastination will be your biggest enemy when trying to make progress.==>Solution:: The Pomodoro Technique(The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.[1] It uses a timer to break work into intervals, typically 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for tomato, after the tomato-shaped kitchen timer Cirillo used as a university student.) is a way of managing your time in order to stay focused. The idea is to set a timer for 25 minutes and to work on a task until the timer goes off. If you get distracted or interrupted during the 25 minutes, start the 25 minutes of work over again. Once you’ve successfully focused on work for 25 minutes, take a 5 minute break. When your break is over, repeat the 25 minutes of work and 5 minute break. After you’ve completed four 25 minute blocks of work, take a longer 15-30 minute break.\nThe Pomodoro technique is great for avoiding procrastination as it forces you to work without distractions. Since the work time only lasts 25 minutes before taking a break, it’s not overwhelming, making it harder to rationalize procrastination.",
            ancorName:"PitfallstoAvoid",

          },

          {
            name:'Not Taking Breaks',
            detail:"As you get into the material, you may feel compelled to continuously study for long periods of time. It might seem like you are getting more work done at first, but this often leads to burnout, which consequently results in lower productivity.\nIt may seem counterintuitive, but you will actually get more done if you regularly step back to recharge your brain and body. Studies show that performance increases after breaks of all durations: from extended vacations down to microbreaks of 30 seconds. John Trougakos, Associate Professor of Management at the University of Toronto, says that mental concentration is similar to a muscle. Our focus becomes fatigued after sustained use and needs a rest period to recover, just like a bodybuilder resting between sets at the gym.\n==>Solution: Use the previously mentioned Pomodoro Technique to time how often and how long to take your well-deserved breaks. Feel free to play around and experiment with different frequencies and durations of breaks.\nWhat to do during your break: ==>1 listen to music ==>2 journal ==>3 doodle ==>4 meditate ==>5 play a quick game ==>3 go for a short walk outside",
            ancorName:"NotTakingBreaks",

          },

          {
            name:'Digital Distractions',
            detail:"Digital distractions are email and Facebook notifications and time-wasting websites, such as social media. These distractions break your focus and make procrastination tempting. Therefore, they should be avoided during study time.\n==>Solution: Turn off notifications and add a blocker to your internet to limit your time on distracting sites.",
            ancorName:"DigitalDistractions",

          },
          {
          name:'Physical Distractions',
          detail:"Physical distractions are distractions from your environment, like a TV in the background or other people talking. These distractions can be just as damaging to your focus as digital distractions.\n==>Solution: Find a quiet place to study where you can go to focus in your home. If that’s not an option, you can use noise cancelling headphones to block out noisy distractions in your environment.",
          ancorName:"PhysicalDistractions",

        },

        {
        name:'Rabbit Holes',
        detail:"Because we cover so much material on The Odin Project and link to so many high quality courses and tools, it is easy for students to get pulled into rabbit holes by spending time trying to learn all there is to know about a subject that they aren’t ready for or won’t benefit them much. We have put a lot of effort into structuring the curriculum so that all of the important things that you need to know about web development are covered exactly when you need to know them.\n==>Solution: Stick to the path laid out as much as possible. Try to limit time spent going down rabbit holes as these sidetracks can really ruin your momentum.",
        ancorName:"RabbitHoles",

      },

      {
      name:'Comparing Yourself to Others',
      detail:"Students often compare themselves to others who are farther along in their coding journey or have more experience. This is a recipe for depression and frustration.\nSolution: Only compare yourself to your past self. Have your abilities and knowledge improved from where you were last week, last month, or last year? Be proud of the progress that you’ve made!",
      ancorName:"ComparingYourselftoOthers",

    },

    {
    name:'Conclusion',
    detail:"Learning any new skill is a journey full of speed bumps and obstacles to be overcome. We hope that the principles laid out here will put you in a much better position to succeed and to get the most out of The Odin Project.\nWithout further ado, let’s jump in to learning web development!",
    ancorName:"Conclusion",

  },

        ],
        additionalRead:[
          {
            title:"A woman who taught herself enough to land a job in 5 months",
            url:"https://newcodegirl.blogspot.com/2015/04/i-made-it-job-contract-signed.html"
          },
          {
            title:"A 32 year old who taught himself programming using The Odin Project",
            url:"https://www.reddit.com/r/learnprogramming/comments/34r807/im_32_years_old_and_just_started_my_first/",
          },
          {
            title:"Believe you can get better",
            url:"https://www.ted.com/talks/carol_dweck_the_power_of_believing_that_you_can_improve",
          },
          {
            title:"Grit",
            url:"https://www.ted.com/talks/angela_lee_duckworth_grit_the_power_of_passion_and_perseverance"
          },
          {
            title:"You can learn anything",
            url:"https://www.khanacademy.org/college-careers-more/talks-and-interviews/talks-and-interviews-unit/conversations-with-sal/a/the-learning-myth-why-ill-never-tell-my-son-hes-smart"
          },
          {
            title:"coursera learn how to learn",
            url:"https://www.coursera.org/learn/learning-how-to-learn"
          },
          {
            title:"The Ruby Rogues have a podcast on How to Learn, which should be motivational and useful to you, so check it out for some useful thoughts on learning.",
            url:"https://web.archive.org/web/20211129082738/https://devchat.tv/ruby-rogues/131-rr-how-to-learn/"
          },

          {
            title:"To learn more about the Pomodoro Technique, read this great article.",
            url:"https://medium.com/life-hacks/more-productivity-with-the-pomodoro-technique-d7ce8926ec0c#.hcqsv37u4"
          },

          {
            title:"If you want to try it out, TomatoTimer is an easy-to-use Pomodoro timer.",
            url:"https://www.toptal.com/project-managers/tomato-timer"
          },


          {
            title:"Read this article for more information on breaks & productivity.",
            url:"https://simpleprogrammer.com/taking-breaks-will-boost-productivity/"
          },

          {
            title:"Managing inspiration and motivation",
            url:"https://markmanson.net/how-to-get-motivated"
          },

          {
            title:"Learning to code when it gets dark",
            url:"https://www.freecodecamp.org/news/learning-to-code-when-it-gets-dark-e485edfb58fd#.yjh0fehje"
          },

          {
            title:"Improve your typing skills with Keybr.com Use this keyboard trainer if you find your typing speed is holding you back. We recommend to spend 5 mins everyday after you start your PC.",
            url:"https://www.keybr.com/"
          },

          {
            title:"Practice typing with Monkeytype! A minimalistic, customisable typing website. Test yourself in various modes, track your progress and improve your typing speed. It has a great community and frequently receives new features. Even though it has so many features, the experience is still very polished.",
            url:"https://monkeytype.com/"
          },

          {
            title:"Why Procrastinators Procrastinate Learn about the Instant Gratification Monkey, Rational Decision Maker, Panic Monster, and how to navigate the Dark Playground.",
            url:"https://waitbutwhy.com/2013/10/why-procrastinators-procrastinate.html"
          },


        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
        ],
        people:[]
      },

      {
        name:"Asking For Help",
        courseStatus:"incomplete",
        courseNumber:"004",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"Along your programming journey, you will inevitably need to ask questions in an online coding community like ours, or in conversations with your colleagues. While asking questions may seem rather simple, in a programming environment it is essential to ask well formed questions with as much context as needed so you can get the most out of asking for help. In essence, “help others help you!” This lesson will provide you with the tools to effectively ask questions in communities such as our Discord chat, Stack Overflow, and in the workplace!",
            ancorName:"Introduction",

          },

          {
            name:'Lesson Overview',
            detail:"This section contains a general overview of topics that you will learn in this lesson.==>1.)Explain techniques for asking programming questions. ==>2.)Explain and avoid qualities of “bad” questions. ==>3.)Ask effective and well formed questions",
            ancorName:"lessonOvervie",

          },

          {
            name:'Tips for Getting The Best Help Possible. 1.)Always provide your code and the surrounding context.',
            detail:"You can ask theoretical, vague questions, but you’re going to get theoretical, vague answers that probably won’t be helpful to you and cause frustration on both ends as you and the person helping you dance around the real issue. The only time code doesn’t need to be provided is if you are asking a purely conceptual question outside of a specific project or code snippet. Additionally, provide as much context as is necessary, and zero in on the specific problem, such as pointing people to a specific function or line number in your code so people can give you the most relevant answers and quickly assist you.",
            ancorName:"tips1",

          },

          {
            name:'Ask about the problem at hand, not the solution itself.',
            detail:'A lot of learners ask exactly how to approach a given task or assignment in this curriculum, such as the below:“How do I complete Step 5 of the Rock Paper Scissors Assignment”? Keep in mind that you’re actually supposed to figure out how to solve the assignments yourself, and figuring out an approach is essential to your learning journey. A much better question might look like this:“Hey, I’m trying to return a string that displays the winner in Rock Paper Scissors, but I’m getting a syntax error on line 12. How can I fix this? Here’s my code.”  In sharing your attempt, people know what you’ve tried and won’t suggest things that might not have worked out for you. It also allows them to debug your current iteration of code, rather than sending you down a path that has you start all over again when you might be very close to a solution. Now, if you’re completely stuck with where to start, it’s completely fine to let people know that you’re stuck. Asking where you can start and what you can research to get on the right track empowers you to be able to resolve issues largely on your own in the future, and might even empower you to help others with the same issue later on. It is also recommended that you share your pseudo code so people can nudge you in the right direction or correct any misunderstandings you may have.',
            ancorName:"tips2",

          },

          {
            name:'Don’t take asking for more context to heart!',
            detail:'People who volunteer in coding communities are here to help! But a question you may feel is coherent and “obvious” probably isn’t if you are being asked for more context. While something may seem “obvious” to a beginner, it’s sometimes nowhere near “obvious” to an expert. An expert knows about many, many more situations that could cause an issue someone is experiencing, and would want to refrain from sending a learner down the wrong path. People take time out of their day to help, so make it as easy as possible for them to help you! There’s probably a good reason why they need more information, so trust their judgement and experience when they ask. Many people who help in coding chats are unpaid volunteers, and are in no way obligated to answer your query. But because they truly do want to help you, they will ask for more information when needed!',
            ancorName:"tips3",

          },

          {
            name:'Assignment 1',
            detail:'Read and bookmark this amazing article by Gordon Zhu. It is a great reference to refer to whenever you find yourself needing to ask for help, and you might find yourself solving your own problem as you think about the points listed in the article. The video linked in this article is no longer available but that is not an issue since we explain debugging in detail later in the curriculum.',
            ancorName:"Assignment1",
            popup1Name:"How to be great at asking coding questions",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650455921/msbGeanologyProfilePics/ask_right_questions_gditlv.png",

            popup2Name:"Read about the “XY Problem”, which is a common pitfall programmers new or experienced alike fall into when asking questions.",
            popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650462433/msbGeanologyProfilePics/xyproblem_wnm8y4.png",
          },

          {
            name:'Assignment 2',
            detail:'While asking for help is encouraged, it’s important to avoid becoming a “help vampire” and be respectful of the communities or persons you are asking for help. This resource goes in depth to identify what a “help vampire” is, gives those who help others the tools to empower folks to ask questions effectively, and help the “help vampire” effectively.',
            ancorName:"Assignment2",
            popup1Name:"Help Vampires",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650464104/msbGeanologyProfilePics/helpVampire_iulvxj.png",

            popup2Name:"Check out this article from the world’s most popular programming help resource, Stack Overflow.",
            popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650463759/msbGeanologyProfilePics/stackoverflow_t8k37v.png",

            },


        ],
        additionalRead:[
          {
            title:"amazing article by Gordon Zhu.",
            url:"https://medium.com/@gordon_zhu/how-to-be-great-at-asking-questions-e37be04d0603"
            },

        {
          title:"XY Problem",
          url:"https://xyproblem.info/"
          },
        {
          title:"How do I ask a good question?",
          url:"https://stackoverflow.com/help/how-to-ask"
          },
        {
          title:"Help Vampires",
          url:"https://slash7.com/2006/12/22/vampires/"
          },
        ],

        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/"
          },
        ],
        people:[]
      },

      {
        name:"Join the developer Communities",
        courseStatus:"incomplete",
        courseNumber:"005",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"Working and collaborating with other people is an important part of working as a web developer. In addition to other communities you will be introduce in like the The Odin Project developer Community which involve following on facebook for socializing, on discord for chatting and more, this program have its own private social media platform for socializing and comunicating directly with the instructor and other students in the programe with its own chat system and more features to be worked on and upgraded giving you a place with lots of room to improve practicing your skills as a new web developer.",
            ancorName:"Introduction",

          },

          {
            name:'Why a community is awesome for you',
            detail:"Learning web development will be a long and arduous journey, but you can make the marathon a lot more fun by getting involved in communities. No matter what pace you are doing our curriculum, there will always be people a few steps ahead of you that are willing to help. Furthermore, helping others that are a few steps behind you is a great way to deepen your own understanding and make your learning stick.When you’re slogging through the desert of despair, where your code doesn’t work or even make sense to you anymore, you can find an oasis of knowledge and encouragement in our community. Veterans at The Odin Project love to help fill in knowledge gaps and provide new insights and perspectives on how to improve your code. We’ve all been there before!.Remember that project you struggled so hard to figure out and that you’re so proud of finishing? Through our community, you will get to share your work and progress with those who fully appreciate how much hard work went into it.",
            ancorName:"Whyacommunityisawesome",
            popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },

          {
            name:'Why a community is awesome for this Program',
            detail:"We are working hard to update existing lessons and produce new content,make the website more rubust for learning, so we would love to hear your feedback on the lessons and projects. We hope you find the lessons fun, engaging, and informative and find the projects challenging but achievable. So please let us work together like on big happy family",
            ancorName:"WhyacommunityisawesomeForthisprogram",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },

          {
            name:'Before asking for help',
            detail:"As most of the projects are designed to push you to your limit, please remember that there is always a community to turn to! You don’t need to know how to solve every problem straight away, BUT you do need to have a general idea of where you are going. This becomes really important when asking your questions because sometimes the problem is your approach and not your code.If you’re feeling stuck, it’s a good time to pause and take a breather. Break the problem down into little pieces and then decide what is really holding you back. We call this technique rubber duck debugging.\nYou should also do a Google search to find relevant information for your problem. Read about how to use Google to solve your programming questions. You can also look back at previous lessons for tools that you can apply to the current task.\nIf these methods don’t yield a solution for you, then it’s time to reach out to the communities and ask for help.",
            ancorName:"Before asking for help",
            popup1Name:"rubber duck debugging",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518495/msbGeanologyProfilePics/rubber_debubing_duck_ltwsp7.png",
            popup2Name:"How to use google",
            popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'Asking for help',
            detail:"So you’ve spent some time struggling to solve the problem on your own, and now it’s time to fire up the Odin Discord and ask for help. The first thing to keep in mind is don’t ask to ask. While this is a simple idea (with a pretty catchy motto!), it can help you get answers to your questions much faster and will make it easier to others to feel comfortable offering you help.In addition, when you ask your questions, you should help the community help you by putting together a great question.\nWhen asking your question, please remember to include the context: ==>1.)What do you think the problem is? ==>2.)What exactly do you want to happen? ==>3.)What is actually happening? ==>4.)How did you get there? ==>5.)What have you tried so far?\nIf you can’t pinpoint the problem, you can share a screenshot. This is especially useful for showing the output of commands in the command line. In Discord, drag and drop your screenshot image file into the chat box to upload it or simply use the PrtScn and paste keyboard shortcuts. If you don’t know how to take a screenshot on your computer, this is a good time to ask Google.\nScreenshots are great for showing the output of commands or error messages in the command line. Screenshots are also great for showing the output from your code such as how the output looks visually on a webpage or console outputs in the browser. However, you should always include the corresponding files containing the error. Even if it is a short amount of code, providing it in the discord server in the proper format along with a screenshot of the output is helpful to those debugging it rather than just a screenshot. When you do share a screenshot of the output or how it looks visually make sure to push your project to GitHub or put your corresponding code in a replit so that others can comb through and debug the code. The screenshot of the output and the correlating code that can recreate the problem will help make it easier to understand the problem for people helping you. You’ll learn all about GitHub very soon. \nSometimes there might be no one around to help you with your issue. That is the ideal time to get familiar with the Discord search function. Search for specific keywords or error messages to see if anyone else had a similar issue before and how they solved it!",
            ancorName:"Asking for help",
            popup1Name:"Don't ask to ask, just ask",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'Formatting your questions',
            detail:"Asking your questions in a readable format helps everyone debug them better. Here are some ways to go about that:\nIf you’re having trouble on the command line, make sure to include both your input and the error message you’re getting.\nIn the chat rooms, code can be displayed differently from normal sentences by using backticks (``), which can be found above the Tab key on US and UK keyboards. Backticks are not the same as single quotation marks (‘’), which are found to the left of the Enter key.\nFor a single line of code: use one backtick before and after your code.`Your Code`For multiple lines of code: use three backticks on a separate line above and below your code.```Your Multiple Lines of Code``` You can also use code highlighting to add color to your multi-line code by specifying the language: ```JavaScript Your Cod ```",
            ancorName:"Formatting your questions",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'Formatting your questions',
            detail:"1.) Have fun with giphys: type /giphy hi to say hi to everyone. 2.)Type !help for more information on chat commands. 3.)Show your appreciation to those who help you with @username ++. 4.)Don’t forget to visit all the available rooms!",
            ancorName:"Formatting your questions",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'How to Help Others Solve Coding Problems',
            detail:"Not only is it important to know how to ask an effective question, it is also important to know how to help others effectively. Please take a moment to review these guidelines so that you will have proper expectations of the help you will receive in our Discord community. In addition, come back and review these guidelines when you are ready to start helping others.",
            ancorName:"How to Help Others Solve Coding Problems",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'1. Instead of answering the question, guide them to the answer',
            detail:"Unless the problem is a simple typo or syntax error, it is more beneficial to guide them to find their own answer. This approach will teach good debugging skills and will increase their ability to solve future problems.\nStart by asking probing questions, such as “What have you already tried?”, “What do you expect this function to do?”, or “What do you think that error means?”.",
            ancorName:"Instead of answering the question",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'2. Help only when you are certain of the answer',
            detail:"If you are not 100% certain of the answer, you may end up doing more harm than good, so please let someone else answer it.\nDo not worry about how long someone has to wait for an answer. The right answer is worth the wait.",
            ancorName:"Help only when you are certain",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'3. Help only when no one else is currently helping',
            detail:"If somebody is already getting help, do not jump in the middle of the conversation. We know you mean well, but it is overwhelming for the person receiving help to follow multiple conversations.",
            ancorName:"Help only when no one else is currently",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'4. Help only when you have plenty of time',
            detail:"If you do not have much time to help, please let someone else answer the question.",
            ancorName:"Help only when you have plenty of time",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'5. Adjust your expectations to their level',
            detail:"If the question does not reveal where they are in the curriculum, ask them so that you can adjust your expectations to their knowledge level.",
            ancorName:"Adjust your expectations",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'6. Ask for clarifications',
            detail:"If the question seems confusing or ambiguous, ask for more clarity, or politely link them to our bot command !question, which links to the How to be great at asking coding questions article.",
            ancorName:"Ask for clarifications",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'7. Ask for live code',
            detail:"If the question needs to have live code to fully understand or debug, ask them to use replit to provide it. If the problem is difficult to isolate, they should recreate the problem with isolated code.",
            ancorName:"Ask for live code",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'8. Do not answer googleable questions',
            detail:"Learning how to research these questions is a very important skill for developers, so we need to empower them to find their own answer. When we answer these questions, it hinders their personal growth and makes them codependent on our community.\nInstead of answering these questions, politely ask them to google their question or use our bot command !google with the search terms.",
            ancorName:"Do not answer googleable",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'9. Do not answer questions covered in our curriculum.',
            detail:"If you know that the answer is provided in our curriculum, ask them where they are at in the curriculum.\nIf they have not reached that portion of the curriculum, let them know they will learn it in the future.\nIf they have already been through that portion of the curriculum, politely direct to review that lesson.",
            ancorName:"Do not answer questions",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'10. Answer the question before pointing out other problems',
            detail:"When helping someone it can be easy to spot other problems in their code. Resolve the original question, before pointing out any other problems that need attention.",
            ancorName:"nswer the question before",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'11. Encourage students to use a debugger',
            detail:"It is common for students to not understand the importance of using a debugger to look at the values of their variables at different points in their program. When students are getting unexpected values, politely encourage them to use a debugger with our bot command !debug.",
            ancorName:"Encourage student",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'12. Watch for students that need to take a step back',
            detail:"It is common for students to focus too hard on a problem and not be able to clearly see everything. When this situation arises, politely encourage them to step back from the problem and take a break. Often times, stepping away from a problem will help them see the bigger picture and how to solve it.",
            ancorName:"Watch for students",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'13. Watch for students that are in over their head',
            detail:"It is common for students to skip a lesson/project or think they know more than they actually do. When this situation arises, politely encourage them to go back and reread a section of the curriculum for more understanding.",
            ancorName:"Watch for students that are in over",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'14. Admit when the problem goes beyond your current knowledge',
            detail:"It is common for the actual issue to go beyond the initial question. If it goes beyond your current knowledge, it is important to admit that you are unsure of the correct answer and let someone else help.\nAfter digging deeper into the problem, they might be able to continue troubleshooting on their own or they can wait for someone more experienced to help.",
            ancorName:"Admit when the problem",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'15. Be patient',
            detail:"Helping others solve a problem is not always easy. Remember to be patient as they struggle through the problem.",
            ancorName:"Be patient",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'16. Duck out of the conversation if you get frustrated',
            detail:"Sometimes there are misunderstandings and interactions go poorly. You are a volunteer and are not obligated to help when things get out of hand. Politely duck out of the conversation and let someone else step up.",
            ancorName:" Duck out of the conversation",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'',
            detail:"",
            ancorName:"",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'Assignment1',
            detail:"First, create a free GitHub account. As you will discover, GitHub is an integral part of the development workflow.",
            ancorName:"Assignment1",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },

          {
            name:'Assignment2',
            detail:"Finally, sign in to our Discord server. Pop in and say hello! We’ve created an introductions room which is a great place to introduce yourself and we’re always happy to welcome new community members. We have chat rooms for every development topic covered in our curriculum. Log into the chat and start exploring!",
            ancorName:"Assignment1",
            // popup1Name:"Don't ask to ask, just ask",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650519401/msbGeanologyProfilePics/Dont_askto_ask_jwz7aj.png",
            // popup2Name:"How to use google",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650518731/msbGeanologyProfilePics/how_to_use_google_ysgags.png"
          },
        ],
        additionalRead:[
          {
            title:"GitHub account.",
            url:"https://github.com/"
          },
          {
            title:"Discord account.",
            url:"https://discord.com/invite/fbFCkYabZB"
          },

          {
            title:"Replit account.",
            url:"https://replit.com/"
          },

        ],

        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
          {
            name:"Don't ask to ask, just ask",
            link:"https://dontasktoask.com/"
          },
          {
            name:"How to be great at asking coding questions",
            link:"https://medium.com/@gordon_zhu/how-to-be-great-at-asking-questions-e37be04d0603"
          },
        ],
        people:[]
      },


      {
        name:"How Does the Web Work?",
        courseStatus:"incomplete",
        courseNumber:"006",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"Before you can understand how to program the web, you need a more rigorous understanding of the web itself than you likely have now. These concepts provide a more holistic understanding of the ecosystem in which you will be working and will enable you to talk intelligently with other developers about your work.",
            ancorName:"Introduction",

          },

          {
            name:'Lesson Overview',
            detail:"This section contains a general overview of topics that you will learn in this lesson.==>1)Describe what the internet is. ==>2)Describe what packets are and how they are used to transfer data. ==>3)Understand the differences between a web page, web server, web browser and search engine. ==>4)Briefly explain what a client is. ==>5)Briefly explain what a server is. ==>6)Explain what IP addresses are. ==>7)Explain what DNS servers are.",
            ancorName:"Lesson Overview",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },
          {
            name:'Assignment1',
            detail:"This article from Mozilla on “How does the Internet work?” . ",
            ancorName:"Assignment1",
            popup1Name:"How the web works",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650524569/msbGeanologyProfilePics/how_the_web_works_mozila_keype7.png",
            // popup2Name:"",
            // popup2:"",


          },


        ],
        additionalRead:[
          {
            title:"Watch this BBC short for an overview of how the internet works.",
            url:"https://github.com/"
          },

          {
            title:"Watch How the Internet Works in 5 Minutes",
            url:"https://www.youtube.com/watch?t=46s&v=7_LPdttKXPc&feature=youtu.be"
          },

          {
            title:"difference between webpage, website, web server, and search engine",
            url:"https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines"
          },

          {
            title:"How the Web works",
            url:"https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works#clients_and_servers"
          },
          {
            title:"If you’re in for a bit more reading, you can check out the Introduction to HTTP online book at LaunchSchool. This book also touches on some topics covered later in the curriculum, such as developer tools and security. Additionally, you can learn about HTTP tools, which you may find helpful in the future.",
            url:"https://launchschool.com/books/http"
          },
        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
          {
            name:"How does the Internet work?",
            link:"https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work"
          },
        ],
        people:[]
      },

      {
        name:"Installation overview",
        courseStatus:"incomplete",
        courseNumber:"006",
        logo:logo,
        menu:[

          {
            name:'Introduction',
            detail:"The first step for building any website is having the right tools. For us, that means setting up a development environment for writing good code.\n Many online development courses use in-browser code editors or “sandboxes,” which give you the tools and programs needed to accomplish the task at hand and nothing else. You’ll use some of these sandboxes throughout the early stages of this project since they’re great for getting started quickly. However, the best way to set yourself up for long-term success is to operate in a real development environment.\nWe won’t lie to you: installing packages, editors, and even entire operating systems can be very frustrating. However, having the experience of setting up a development environment to run the code you’ll write is an invaluable, real-world skill you’ll carry with you for the rest of your career.",
            ancorName:"introduction",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },
          {
            name:'The Installation Plan',
            detail:"In the following sections, we’ll go over the steps for setting up your environment. There is no need to install anything in this lesson, this is an informative lesson. These sections are the most important steps in the entire curriculum. Please take the extra time to double check what you’re typing or you may cause more headaches for yourself down the road.In the next few lessons, we will walk through these installation steps together:\nIn the next few lessons, we will walk through these installation steps together: ==>Installing a supported operating system (OS). ==>Installing Google Chrome web browser. ==>Installing a code editor. ==>Creating an SSH key (a personal “password” that will identify you to GitHub, Heroku, and many other sites you’ll be using). At the end of the next lesson, you’ll be up and running with many of the tools you need to write and run code! It may seem like a lot of steps, but we’ll get through it as painlessly as possible together! If anything goes wrong, remember to use these steps: ==>Examine the terminal output for the actual error. ==>Google, Google, Google. ==>Never be afraid to ask for help! \n For Chromebook users, your OS choice has effectively been made for you. However, if your device supports the Linux Beta, there are instructions in the next lesson on how to set this up on your device.",
            ancorName:"The Installation Plan",
            popup1Name:"operating System",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650541937/msbGeanologyProfilePics/operatingsystem_g3zzxq.png"

          },

          {
            name:'OS Options macOS',
            detail:"If you’re using a Mac, you’re in great shape. The instructions assume a Unix-based system. By installing just a few programs, you will be up and running with your education in no time!",
            ancorName:"OS Options macOS",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },
          {
            name:'Linux (Official Ubuntu Flavors)',
            detail:"Linux is a free and open-source operating system that works well with all programming languages. Most development tools are written to work natively with Linux. Your tools will likely be updated more often, have more information available for troubleshooting, and just plain run better on Linux. We’ll be using Ubuntu, one of the most popular and user-friendly distributions available, or the lighter weight alternative Xubuntu. if you don’t use a Mac, we recommend that you use Linux. It’s that simple.",
            ancorName:"linux",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },

          {
            name:'Windows',
            detail:"Windows is not natively supported by The Odin Project, or on our Discord server; however, if you’re currently using Windows you can use either a virtual machine or dual boot to keep your Windows install while creating your development environment in Linux.A virtual machine is an emulation of a computer that runs within your existing OS. It allows you to use another operating system inside of a program on your current operating system (e.g. Running Linux inside of Windows). Virtual machines are as simple to install as any other program and are risk free. If you don’t like Linux, you can easily remove the virtual machine. Virtual machines are a great way for new developers to get started quickly.",
            ancorName:"windows",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },

          {
            name:'Dual-booting',
            detail:"Dual-booting means installing two operating systems on your computer, which can give you the option to boot either Linux or Windows when your computer first starts up. The advantage of dual-booting over a virtual machine is that the OS can use all of your computer’s resources, resulting in much faster operation. There is some risk to installing a dual-boot system because you’re changing your hard drive partitions, but you’ll be okay as long as you take your time and read the instructions.Dual-booting can be as easy as inserting a flash drive and clicking a few buttons. The benefits of dual-booting cannot be overstated. You will allow Linux to access the full capabilities of your hardware, have a clean and distraction-free environment for coding, and learn the platform used by many senior developers and servers around the world.",
            ancorName:"dual-booting",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },
          {
            name:'NOTICE FOR WINDOWS 11 USERS:',
            detail:"Windows 11 released in October 2021. VirtualBox (the program that runs your Virtual Machine) does not currently support Windows 11 as a host operating system. This means that VirtualBox may not properly install or run on Windows 11, or that you could face serious bugs that hinder performance or cause crashes.If you are using Windows 11 on the computer that you will be installing a Linux environment to, it is recommended that you install Linux via Dual-Booting, rather than installing via a virtual machine.You can see the currently supported operating systems for VirtualBox hosting in this section of their documentation.",
            ancorName:"notice for wind",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },

          {
            name:'Concerned About Installing A New OS?',
            detail:"“Woah, woah, woah! I like my OS just fine the way it is!” If you don’t have an Apple computer, you are likely using Windows. Don’t worry! The options above don’t mean you need to get rid of Windows. Linux will gladly share the hard drive with Windows. We know you’ve probably learned a lot of tips and tricks for your favorite OS and don’t want to lose everything you have on your computer. However, most OSs are developed with non-technical folks in mind, so they hide or make it difficult to use many of the languages and frameworks we’ll need to install. Having to work around these difficulties causes many new developers to give up before they’ve even started their journey to full-stack nirvana.\nModifying or dual booting a computer to work with the tools you’ll need will make it much easier to start programming, can help create a distraction-free environment, and will look good on your resume. Take a deep breath, and let’s look at your options.",
            ancorName:"new os",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },
          {
            name:'Here are a few great reasons to install Linux:Tested',
            detail:"Tested - We’ve tested our directions with macOS, Ubuntu, and official Ubuntu flavors. We did the research so that you can get tools installed with as few issues as possible, getting you to coding sooner. Time spent wrestling with your operating system is time taken from learning how to code.",
            ancorName:"tested",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },

          {
            name:'Here are a few great reasons to install Linux:Community Support',
            detail:"Community Support - Using the tools we recommend makes it easier for us to help when you run into trouble.",
            ancorName:"Community Support",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },
          {
            name:'Here are a few great reasons to install Linux:Work Like The Pros ',
            detail:"Work Like The Pros - Many developers use a Unix-based operating system.",
            ancorName:"pros",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },

          {
            name:'Here are a few great reasons to install Linux:Performance ',
            detail:"Performance - You are worried about installing Linux because your machine is slow/older and has limited space? When performance is a priority, Linux is a great choice. It uses fewer system resources than Windows and will occupy less hard drive space.",
            ancorName:"pros",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },

          {
            name:'We can only support what is provided within the scope of our curriculum. We do not support native Windows or any version of Windows Subsystem for Linux (WSL) as a development environment.',
            detail:"Using Windows and WSL has been discussed many times and it is not feasible to do so at this time. Please do not ask us to support Windows, and please do not bring it up in the Discord. We are constantly evaluating our curriculum to keep content as fresh and accessible as possible, and Windows/WSL has not proven to be a path of low resistance.With that out of the way, we need to set up an appropriate development environment!",
            ancorName:"pros",
            // popup1Name:"hope you remember Why Learning to Code is So Damn Hard",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650458160/msbGeanologyProfilePics/whysohard_hisblw.png"

          },
        ],
        additionalRead:[
          {
            title:"VirtualBox",
            url:"https://www.virtualbox.org/manual/UserManual.html#hostossupport"
          },
        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
        ],
        people:[]
      },

      {
        name:"Prerequisites",
        courseStatus:"incomplete",
        courseNumber:"007",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"If you are already using MacOS, Ubuntu, or an official flavor of Ubuntu as your operating system and have Google Chrome as an installed browser, you can skip this section. Otherwise Continue reading.Please Note: We can only support the operating systems indicated above. Our instructions have been tested with MacOS, Ubuntu, and official flavors of Ubuntu. We do not recommend installing an OS that is only based on Ubuntu (like Mint, Pop!_OS, ElementaryOS, etc).",
            ancorName:"Introduction",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },
          {
            name:'OS Installation',
            detail:"This curriculum only supports using a laptop, desktop or supported Chromebook. We cannot help you set up a developer environment on a RaspberryPi or any other device.",
            ancorName:"OS Installation",
            popup1Name:"Virtual Machine (Recommended)",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603154/msbGeanologyProfilePics/vm_gjep3e.png",
            popup2Name:"Ubuntu/Windows Dual-Boot",
            popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603351/msbGeanologyProfilePics/ubuntu_and_windows_dsxryl.png",
            popup3Name:"Chrome OS/CloudReady",
            popup3:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603515/msbGeanologyProfilePics/chromeos_wcg1ss.png",


          },
          {
            name:'Linux - Step 1: Download Google Chrome',
            detail:"==>Open your Terminal ==>Run the following command to download latest Google Chrome .deb package, ```wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb```",
            ancorName:"Step 1: Download Google Chrome",
            // popup1Name:"Virtual Machine (Recommended)",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603154/msbGeanologyProfilePics/vm_gjep3e.png",
            // popup2Name:"Ubuntu/Windows Dual-Boot",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603351/msbGeanologyProfilePics/ubuntu_and_windows_dsxryl.png",
            // popup3Name:"Chrome OS/CloudReady",
            // popup3:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603515/msbGeanologyProfilePics/chromeos_wcg1ss.png",


          },
          {
            name:'Linux - Step 2: Install Google Chrome',
            detail:" ==>Enter the following command in your terminal to install Google Chrome .deb package, ```sudo apt install ./google-chrome-stable_current_amd64.deb``` ==>Enter your password, if needed",
            ancorName:"Step 2: Download Google Chrome",
            // popup1Name:"Virtual Machine (Recommended)",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603154/msbGeanologyProfilePics/vm_gjep3e.png",
            // popup2Name:"Ubuntu/Windows Dual-Boot",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603351/msbGeanologyProfilePics/ubuntu_and_windows_dsxryl.png",
            // popup3Name:"Chrome OS/CloudReady",
            // popup3:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603515/msbGeanologyProfilePics/chromeos_wcg1ss.png",


          },

          {
            name:'Linux - Step 3: Delete the installer file',
            detail:"==> ```rm google-chrome-stable_current_amd64.deb``` ==>Enter your password, if needed",
            ancorName:"Step 3: Download Google Chrome",
            // popup1Name:"Virtual Machine (Recommended)",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603154/msbGeanologyProfilePics/vm_gjep3e.png",
            // popup2Name:"Ubuntu/Windows Dual-Boot",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603351/msbGeanologyProfilePics/ubuntu_and_windows_dsxryl.png",
            // popup3Name:"Chrome OS/CloudReady",
            // popup3:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603515/msbGeanologyProfilePics/chromeos_wcg1ss.png",


          },
          {
            name:'Linux - Step 4: Using Google Chrome',
            detail:"You can start chrome in two ways, ==> use the ```google-chrome``` command from the terminal (Don’t worry about the messages printed in the terminal) ==>Click Google Chrome from the Applications menu",
            ancorName:"Step 4: Download Google Chrome",
            // popup1Name:"Virtual Machine (Recommended)",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603154/msbGeanologyProfilePics/vm_gjep3e.png",
            // popup2Name:"Ubuntu/Windows Dual-Boot",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603351/msbGeanologyProfilePics/ubuntu_and_windows_dsxryl.png",
            // popup3Name:"Chrome OS/CloudReady",
            // popup3:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603515/msbGeanologyProfilePics/chromeos_wcg1ss.png",


          },

          {
            name:'MacOS - Step 1: Download Google Chrome',
            detail:"Visit Google Chrome download page, ==> Click Download Chrome for Mac",
            ancorName:"Step 1: Download Google Chromea",
            // popup1Name:"Virtual Machine (Recommended)",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603154/msbGeanologyProfilePics/vm_gjep3e.png",
            // popup2Name:"Ubuntu/Windows Dual-Boot",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603351/msbGeanologyProfilePics/ubuntu_and_windows_dsxryl.png",
            // popup3Name:"Chrome OS/CloudReady",
            // popup3:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603515/msbGeanologyProfilePics/chromeos_wcg1ss.png",


          },

          {
            name:'MacOS - Step 2: Install Google Chrome',
            detail:"Open the Downloads folder, Double click the file googlechrome.dmg, Drag the Google Chrome icon to the Applications folder icon",
            ancorName:"Step 2: Download Google Chromea",
            // popup1Name:"Virtual Machine (Recommended)",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603154/msbGeanologyProfilePics/vm_gjep3e.png",
            // popup2Name:"Ubuntu/Windows Dual-Boot",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603351/msbGeanologyProfilePics/ubuntu_and_windows_dsxryl.png",
            // popup3Name:"Chrome OS/CloudReady",
            // popup3:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603515/msbGeanologyProfilePics/chromeos_wcg1ss.png",


          },

          {
            name:'MacOS - Step 3: Delete the installer file',
            detail:"Open Finder,==>Click the arrow next to Google Chrome in the sidebar==>Go to the Downloads folder==>Drag googlechrome.dmg to the trash",
            ancorName:"Step 3: Download Google Chromea",
            // popup1Name:"Virtual Machine (Recommended)",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603154/msbGeanologyProfilePics/vm_gjep3e.png",
            // popup2Name:"Ubuntu/Windows Dual-Boot",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603351/msbGeanologyProfilePics/ubuntu_and_windows_dsxryl.png",
            // popup3Name:"Chrome OS/CloudReady",
            // popup3:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603515/msbGeanologyProfilePics/chromeos_wcg1ss.png",


          },

          {
            name:'MacOS - Step 4: Using Google Chrome',
            detail:"Go to your Applications folder==>Double click Google Chrome",
            ancorName:"Step 4: Download Google Chromea",
            // popup1Name:"Virtual Machine (Recommended)",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603154/msbGeanologyProfilePics/vm_gjep3e.png",
            // popup2Name:"Ubuntu/Windows Dual-Boot",
            // popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603351/msbGeanologyProfilePics/ubuntu_and_windows_dsxryl.png",
            // popup3Name:"Chrome OS/CloudReady",
            // popup3:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650603515/msbGeanologyProfilePics/chromeos_wcg1ss.png",


          },
        ],
        additionalRead:[
          {
            title:"UbuntuFlavors",
            url:"https://wiki.ubuntu.com/UbuntuFlavors"
          },
          {
            title:"About Oracle VM",
            url:"https://www.virtualbox.org/manual/UserManual.html#hostossupport"
          },
          {
            title:"Download VirtualBox",
            url:"https://www.virtualbox.org/wiki/Downloads"
          },
          {
            title:"Download Ubuntu",
            url:"https://releases.ubuntu.com/20.04/"
          },

          {
            title:"Create Ubuntu Live USB",
            url:"https://itsfoss.com/create-live-usb-of-ubuntu-in-windows/"
          },
          {
            title:" installation guide",
            url:"https://ubuntu.com/tutorials/install-ubuntu-desktop#0"
          },
          {
            title:"Workaround to Install Ubuntu 20.04 with Intel RST systems",
            url:"https://askubuntu.com/questions/1233623/workaround-to-install-ubuntu-20-04-with-intel-rst-systems/1233644#1233644"
          },
          {
            title:"Download Chrome",
            url:"https://www.google.com/chrome/"
          },
        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
        ],
        people:[]
      },

      {
        name:"Text Editors",
        courseStatus:"incomplete",
        courseNumber:"008",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"A text editor is by far the most used developer tool regardless of what type of developer you are. A good text editor can help you write better code with real-time code checking, syntax highlighting, and automatic formatting.",
            ancorName:"Introduction",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Why can’t I use Microsoft Word?',
            detail:"Rich text editors, such as Microsoft Word and Libre-Office Writer, are great for writing a paper, but the features that make them good at creating nicely formatted documents make them unsuitable for writing code. A document created with these rich text editors has more than just text embedded in the file. These files also contain information on how to display the text on the screen and data on how to display graphics embedded into the document. In contrast, plain text editors, such as VSCode and Sublime, don’t save any additional information. Saving only the text allows other programs, like Ruby’s interpreter, to read and execute the file as code.",
            ancorName:"Why can’t I use Microsoft Word?",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },
          {
            name:'Code Editors',
            detail:"You can think of code editors as specialized web development tools. They are highly customizable and offer many features that will make your life easier. There is nothing worse than spending 2 hours trying to figure out why your program isn’t working only to realize that you missed a closing bracket. Plugins, syntax highlighting, auto-closing of brackets and braces, and linting are just a few of the benefits of using a code editor. There are many text editors out there to choose from, but we suggest starting with Visual Studio Code.",
            ancorName:"Code Editors",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Visual Studio Code or atom',
            detail:"Atom and Visual Studio Code, or just VSCode as it’s commonly referred to, is an excellent free code editor. It has outstanding add-on support and great Git integration. VSCode is the most popular code editor among Odin’s students and moderators, so support is easy to find in the community.\nWhich editor you use is generally a matter of preference, but for the purposes of this course, we are going to assume you’re using VSCode, mainly because it’s free, it’s easy to use, and it works pretty much the same on every operating system. Keep in mind that this means you will not be able to get help if you are using a different text editor other than VSCode or Atom for the curriculum.\nAs a reminder, if you’re using a virtual machine, you should install VSCode on your VM. You’re welcome to also install it on your host (i.e., your Windows main OS), but you’ll want to be sure that you have this critical tool inside your VM.",
            ancorName:"Visual Studio Code",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'VSCode Installation on linux Step 1: Download VSCode',
            detail:"Open your Terminal.==>Run the following command to download the latest VSCode .deb package ==> ``` wget -O code-latest.deb 'https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64' ```",
            ancorName:"VSCode Installation",
            // popup1Name:"VSCode Installation",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Step 2: Install VSCode',
            detail:"Enter the following command in your terminal to install the VSCode .deb package ==> ``` sudo apt install ./code-latest.deb ```==>If prompted, enter your password",
            ancorName:"Step 2: Install VSCode",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Step 3: Delete the installer file',
            detail:" ``` rm code-latest.deb ``` ",
            ancorName:"Step 3: Delete",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },
          {
            name:'Step 4: Using VSCode',
            detail:"You can start VSCode in two ways,==>Click Visual Studio Code from the Applications menu ==>use the code command from the terminal ```code```",
            ancorName:"Step 4: Using VSCode",
            // popup1Name:"Alternative Installation of VSCode",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },


          {
            name:'Atom Installation on linux Step 1 : Add repository from official Atom Site',
            detail:"==> ``` wget -qO - https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add - ``` ==> ``` sudo sh -c 'echo 'deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main' > /etc/apt/sources.list.d/atom.list' ``` ==>Press Enter if it ask your permission.",
            ancorName:"Atom Installation",
            // popup1Name:"VSCode Installation",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Step 2 : Update the Ubuntu System',
            detail:"==> ``` sudo apt-get update ``` ==> It will take some time. Be patient.",
            ancorName:"update system",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Step 3 : Install Atom Editor',
            detail:" ``` sudo apt-get install atom ``` ==> It will download and install the Atom editor on your Ubuntu 14.04. ",
            ancorName:"Step 3: install",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },
          {
            name:'Step 4: Using Atom',
            detail:"==>Click Atom from the Applications menu ",
            ancorName:"Step 4: Using VSCode",
            // popYou can then install extensions to enhance the functionalities of Atom editor. Here are top 5 packages you should consider to install in Atom.up1Name:"Alternative Installation of VSCode",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

        ],
        additionalRead:[
          {
            title:"You can then install extensions to enhance the functionalities of Atom editor. Here are top 5 packages you should consider to install in Atom.",
            url:"https://codeforgeek.com/5-mhttps://codeforgeek.com/5-must-have-packages-atom-editor/ust-have-packages-atom-editor/"
          },

          {
            title:"These handy little PDFs on VSCode’s shortcuts for linux",
            url:"https://go.microsoft.com/fwlink/?linkid=832144"
          },

          {
            title:"Getting started with VSCode video",
            url:"https://code.visualstudio.com/docs/introvideos/basics"
          },
        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
          {
            name:"Install Atom",
            link:"https://codeforgeek.com/install-atom-editor-ubuntu-14-04/"
          },
        ],
        people:[]
      },

      {
        name:"Command Line Basics",
        courseStatus:"incomplete",
        courseNumber:"009",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"Feeling scared of the command line? You’re not alone. We have this image of developers staring intently at a black screen with white or green text flashing across as they wildly enter incomprehensible commands to hack into the corporate mainframe (no doubt while guzzling soda and wiping neon orange Cheetos dust off their keyboard).\nThat black screen or window is the command line interface (CLI), where you’re able to enter commands that your computer will run for you. While there’s no need for you to reenact the scene above, working with the command line is a critical skill for you to learn as a developer. The command line is like our base of operations, from which we can launch other programs and interact with them. It has a syntax of its own to learn, but since you’ll be entering the same commands dozens of times, you’ll quickly pick up the commands you need most.\nIn this introductory lesson to the command line, you’ll learn how to navigate around your computer and how to manipulate files and directories (also known as folders) directly from the comfort of the command line. You’ll soon see that this isn’t as difficult as you may think. The commands you will learn in this lesson are very straightforward. So don’t let the prospect of using the command line for the first time intimidate you.",
            ancorName:"Introduction",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },
          {
            name:'Test Drive Your Terminal',
            detail:"Open a terminal on your computer.",
            detail2:"Linux: open the programs menu and search for “Terminal”. You can also open the terminal by pressing CTRL + ALT + T on your keyboard.",
            detail3:"Before we do anything, take a look at the following text: $ whoami This is a terminal command because it begins with a $. The $ is saying “Hey! Enter what follows in your terminal.” This means that we must exclude the $ when entering any command. In the example above, we would only enter whoami in our terminal. This is a common indicator so make sure that you aren’t entering $ before a command. Now that you are aware of what $ does, take your terminal for a test run! Make sure your terminal is open, type the command mentioned above, and press enter on your keyboard.==>It returns your username. Cool!",
            ancorName:"Test Drive Your Terminal",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },
          {
            name:'Why learn this now?',
            detail:"You will be making heavy use of the command line throughout this curriculum, and the upcoming installations project will need you to install many different software programs using the command line. Additionally, you will primarily be using Git within the command line (more on this later). As part of the bigger picture, you may well be using the command line on a daily basis in your career as a software developer, making it an indispensable skill in your toolset.",
            ancorName:"Why learn this now?",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Lesson Overview',
            detail:"This section contains a general overview of topics that you will learn in this lesson.==>1Describe what the command line is.==>2Open the command line on your computer.==>3Use the command line to navigate directories and display directory contents.==>4Use the command line to create a new directory and a new file.==>5Use the command line to rename or destroy a directory and a file.==>6Use the command line to open a file or folder in a program.==>Where will cd on its own navigate you to? ==>Where will cd .. navigate you to?==>How do you display the name of the directory you are currently in?==>How do you display the contents of the directory you are currently in?",
            ancorName:"Lesson Overview",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Assignment',
            detail:"Note: Many of these resources assume you’re using a Mac or Linux environment. If you did our previous installation lesson, you should already have Linux installed in dual-boot or a virtual machine. Or, you might be using MacOS. If you don’t have MacOS, or any version of Linux installed, please return to the operating system installation guide.",
            detail2:"Before diving into the command line lesson, you’ll want to know how to create a file. You can do so with the ```touch``` command. Open your terminal and enter ```ls``` (the ```l``` is a lowercase ```L```). ls will show you the files and folders in the current directory (or will show nothing if the current directory is empty). Create a file called ```test.txt``` by entering this in your terminal: ```touch test.txt```. Now enter ls once again. You should see ```test.txt``` listed in the output. You can also create more than one file at once using the ```touch``` command. Enter ```touch index.html script.js style.css``` and press the enter. Then enter ```ls``` once more. You should see the files in the output. Here is a small way that the terminal reveals its power. How long would it have taken to create all three of those files with your mouse? Thanks, terminal.",
            ancorName:"Assignment",
            popup1Name:"Command line basics",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650886744/msbGeanologyProfilePics/command_line_basics_eooxdq.png",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Use the Command Line Like a Pro',
            detail:"There’s something important that you need to know about programmers. Programmers are lazy. Like, really lazy. When forced to do something over and over again, the odds are good that they’ll figure out a way to automate it instead. The good news is that you get to take advantage of the many shortcuts they’ve created along the way. It’s time to learn how to use the command line like a pro (which is to say, in a really lazy way).",
            detail2:"First, you might have already noticed that copying and pasting inside the command line doesn’t work the way that you’d expect. When you’re inside the command line, you’ll need to use ```Ctrl+Shift+C``` (Mac: ```Cmd+C```) to copy and ```Ctrl+Shift+V``` (Mac: ```Cmd+V```) to paste. For example, to copy and paste commands from your browser into the command line, you’ll highlight the command text and use ```Ctrl+C``` as usual and then paste it in your terminal using ```Ctrl+Shift+V```. Test it out!",
            detail3:"Second, you need to learn about ```tab``` completion. Seriously, this tip will save you so much time and frustration. Let’s say that you’re in the command line and that you need to move into a folder that’s far away, something like ```~/Documents/Odin-Project/foundations/javascript/calculator/```. That’s a long command to type out, and everything needs to be exactly right in order for it to work. Nope, we’re way too lazy for that! Basically, by hitting Tab, the command line will automatically complete commands that you’ve started typing once there’s only one option. For example, it’s pretty common to have a ```Documents``` folder and a ```Downloads``` folder in the ```home``` directory. If you’ve typed ```cd D``` and then press Tab, the command line will let you know that it’s not sure which one you want by showing you the different options that match what you’ve typed so far: ```bash $ cd D Documents/ Downloads/ $ cd D``` But once you’ve typed in a little bit more, it will complete the name for you, making it possible to write out the full file path above by typing as little as cd ```Doc[tab]O[tab]f[tab]j[tab]cal[tab]``` (depending on what other folders exist on your computer). Test it out, and get comfortable with how this works. You’re gonna love it. ",
            detail4:"Third, there’s a really handy shortcut for opening everything within a project directory: . Once you’ve installed a text editor, you can use this shortcut to open up an entire project and all its files in one go. This shortcut is also commonly used with Git (later on it’s covered in detail) with commands like ```git add .``` to add all the files inside of a directory into Git’s staging area. For example, if you have VS Code installed, you can cd into the project directory and then type ```code .``` (with the period) to open up all the project files. See the next section of this lesson for a more detailed example.",
            ancorName:"Use the Command Line Like a Pro",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'A Note on typing passwords',
            detail:"A Note on typing passwords: When using a command in the terminal that requires you to enter your password for authentication (such as ```sudo```), the characters should not be visible to you as you type them. While you might think the terminal isn’t responding, don’t worry! This is a security feature to protect confidential information, like how password fields on websites use asterisks or dots. By not displaying the characters you write, the Terminal keeps your password secure.",
            ancorName:"A Note on typing passwords",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Opening files in VSCode from the Command Line',
            detail:"On Windows and Linux, you can open VSCode from the command line by typing ```code```, and you can open folders or files by adding the name of the location after it: ```code my_awesome_project/.``` ",
            detail2:"MacOS can do this too, but you need to set it up. After installing VSCode, launch it any way you’re comfortable with. Once it’s running, open the Command Palette with ```CMD + Shift + P```. In the little dialog that appears, type ```shell``` command. One of the choices that appears will be Shell Command: Install 'code' command in PATH. Select that option, and restart the terminal if you have it open.",
            ancorName:"Opening files in VSCode from the Command Line",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },
          {
            name:'Exercise',
            detail:"In this exercise, you will practice creating files and directories and deleting them. You’ll need to enter the commands for this exercise in your terminal. If you can’t recall how to open a terminal, scroll up for a reminder.==>1Create a new directory in your home directory with the name test.==>Navigate to the test directory.==>Create a new file called test.txt. Hint: use the touch or echo command.==>4Create a new file called test.txt. Hint: use the touch or echo command.==>5Navigate back out of the test directory. ==>6Delete the test directory.",
            detail1:"That’s it–you’re done with command line basics! If you commit to doing most things from the command line from here on out, these commands will become second nature to you. Moving and copying files is much more efficiently done through the command line, even if it feels like more of a hassle at this point.",
            ancorName:"Exercise",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },


        ],
        additionalRead:[
          {
            title:"The Art of Command Line",
            url:"https://github.com/jlevy/the-art-of-command-line#readme"
          },

          {
            title:"Unix/Linux Command Cheat Sheet contains a list of important commands that you can refer to regularly as you become familiar with using Linux. You can print it out so you can have a physical copy with you when you’re not at your computer.",
            url:"https://files.fosswire.com/2007/08/fwunixref.pdf"
          },

          {
            title:"Command Line Flashcards by flashcards.github.io.",
            url:"https://flashcards.github.io/command_line/introduction.html"
          },

          {
            title:"Video Series from LearnLinuxTv contains 24 videos explaining the basics of the command line. Videos are brief enough for beginners but, at the same time, detailed enough to get you started and light your inner curiosity.",
            url:"https://www.youtube.com/playlist?list=PLT98CRl2KxKHaKA9-4_I38sLzK134p4GJ"
          },
        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
          {
            name:"command line basics",
            link:"https://www.softcover.io/read/fc6c09de/unix_commands/basics"
          },
        ],
        people:[]
      },

      {
        name:"Setting Up Git",
        courseStatus:"incomplete",
        courseNumber:"010",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"Git is a very popular version control system. You’ll become very familiar with this piece of software throughout TOP, so don’t worry too much about understanding it at this point. There are many lessons focused on Git later in the curriculum.",
            detail1:"GitHub is a service that allows you to upload your code using Git and to manage your code with a nice web interface. GitHub and Git are not the same thing or even the same company.",
            ancorName:"Introduction",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Step 1: Install Git on linux',
            detail:"Open the popup and follow instructions",
            ancorName:"Step 1: Install Git on linux",
            popup1Name:"instaling git",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650888541/msbGeanologyProfilePics/install_git_jd0icr.png",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Step 2.1: Setup Git',
            detail:"This is the first step in configuring git and github",
            ancorName:"Setup Git",
            popup1Name:"Setup Git",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650889082/msbGeanologyProfilePics/setting_up_git_rjsjuv.png",
            popup2Name:"setup Git and Github",
            popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1651294332/msbGeanologyProfilePics/ssh_key_for_github_niq3zn.png",


          },

          {
            name:'Step 3: Let us know how it went!',
            detail:"You’ve completed the basic installations section, good job! As you progress through the Paths there will be other tools to install, so keep an eye out! ",
            detail1:"You probably felt like you were way in over your head, and you probably didn’t understand much of what you were doing. That’s 100% normal. Hang in there. You can do this! And we’ve got your back.",
            ancorName:"Step 3: Let us know how it went!",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },


        ],
        additionalRead:[
          {
            title:"",
            url:""
          },
        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
        ],
        people:[]
      },

      {
        name:"Introduction to Git",
        courseStatus:"incomplete",
        courseNumber:"011",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"Git is like a really epic save button for your files and directories. Officially, Git is a version control system.\n",
            detail1:"A save in a text editor records all of the words in a document as a single file. You are only ever given one record of the file, such as ```essay.doc```, unless you make duplicate copies (which is difficult to remember to do and keep track of):```essay-draft1.doc, essay-draft2.doc, essay-final.doc```",
            detail2:"However, a save in Git records differences in the files and folders AND keeps a historical record of each save. This feature is a game changer. As an individual developer, Git enables you to review how your project grows and to easily look at or restore file states from the past. Once connected to a network, Git allows you to push your project to GitHub or other alternatives such as: Bitbucket, Beanstalk, or GitLab for sharing and collaborating with other developers.",
            detail3:"Please note, we only support GitHub within our curriculum, and will not help troubleshoot the alternatives.",
            detail4:"While Git works on your local machine, GitHub is a remote storage facility on the web for all your coding projects. This means that by learning Git, you will get to showcase your portfolio on GitHub! This is really important because almost all software development companies consider using Git to be an essential skill for modern web developers. Having a GitHub portfolio will provide proof to future potential employers as to what you are capable of.",
            detail5:"In this lesson, we will briefly explore the history of Git, what it is, and what it’s useful for.\n In the next lesson, we will go over the basic workflow for using Git, which should enhance your understanding and demonstrate why Git is so useful.Finally, you will set up a project with Git that will serve as a template for your future projects.",
            detail6:"For now, let’s learn what Git is and why it’s so powerful!",
            ancorName:"Introduction",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Lesson Overview:',
            ancorName:"Lesson Overview:",
            detail:"This section contains a general overview of topics that you will learn in this lesson.",
            detail1:"Explain what Git and GitHub are and the differences between the two.",
            detail2:"Describe the differences between Git and a text editor in terms of what they save and their record keeping.",
            detail3:"Describe why Git is useful for an individual developer and a team of developers.",
            detail4:"Does Git work at a local or remote level? What about GitHub",
            detail5:"",
            detail6:"",
            popup1Name:"",
            popup1:"",
            popup2Name:"",
            popup2:"",


          },

          {
            name:'Assignment',
            ancorName:"Assignment",
            detail:"Read Chapter 1.1 through 1.4 to learn the differences between local, centralized, and distributed version control systems.",
            detail1:"If you haven’t yet installed Git, visit the Setting Up Git lesson.",
            detail2:"",
            detail3:"",
            detail4:"",
            detail5:"",
            detail6:"",
            popup1Name:"1.1 Getting Started - About Version Control ",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650976729/msbGeanologyProfilePics/1.1getting_started_about_git_wqxaol.png",
            popup2Name:"1.2 Getting Started - A Short History of Git",
            popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650977107/msbGeanologyProfilePics/git2_abq1fv.png",
            popup3Name:"Getting Started - What is Git?",
            popup3:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650977345/msbGeanologyProfilePics/git_3_qspcar.png",


          },

          {
            name:'',
            detail:"",
            detail1:"",
            detail2:"",
            detail3:"",
            detail4:"",
            detail5:"",
            detail6:"",
            ancorName:"",
            popup1Name:"",
            popup1:"",
            popup2Name:"",
            popup2:"",


          },


        ],
        additionalRead:[
          {
            title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
            url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
          },
          {
            title:"Watch this video for some history on Git and GitHub, and make sure you know the difference between the two. Git is a technology used in the command line while GitHub is a website you can visit.",
            url:"https://www.youtube.com/watch?v=1h9_cB9mPT8&feature=youtu.be&t=13s"
          },
          {
            title:"Take a look at The Odin Project’s very own GitHub repository. This is where all the lessons are stored! While you’re there, look at all our contributors to gain an appreciation for how Git records all collaborative efforts and how GitHub visually represents this.",
            url:"https://github.com/TheOdinProject/curriculum"
          },
          {
            title:"Git and GitHub in plain English",
            url:"https://blog.red-badger.com/2016/11/29/gitgithub-in-plain-english"
          },
        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
          {
            name:"Book of version contorl",
            link:"https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"
          },
          {
            name:"What is version control?",
            link:"https://www.atlassian.com/git/tutorials/what-is-version-control"
          },

          {
            name:"What is Git",
            link:"https://www.atlassian.com/git/tutorials/what-is-git"
          },
        ],
        people:[]
      },

      {
        name:"Git Basics",
        courseStatus:"incomplete",
        courseNumber:"012",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"In this lesson, we’ll cover common Git commands used to manage your projects and to upload your work onto GitHub. We refer to these commands as the basic Git workflow. When you’re using Git, these are the commands that you’ll use 70-80% of the time. So if you can get these down, you’ll be more than halfway done mastering Git!",
            // detail1:"",
            // detail2:"",
            // detail3:"",
            // detail4:"",
            // detail5:"",
            // detail6:"",

            ancorName:"Introduction",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Lesson Overview',
            detail:"This section contains a general overview of topics that you will learn in this lesson.",
            detail1:"How to create a repository on GitHub",
            detail2:"How to get files to and from GitHub",
            detail3:"How to take “snapshots” of your code",
            detail4:"How do you create a new repository on GitHub?",
            detail5:"Explain the two-stage system that Git uses to save files.",
            detail6:"How do you add files to the staging area in git?How do you commit the files in the staging area and add a descriptive message? and How do you look at the history of your previous commits?",

            ancorName:"Lesson Overview",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

          {
            name:'Assignment',
            detail:"Before you start!",
            detail1:"Github recently updated the way it names the default branch. This means you need to make sure you are using a recent version of git (2.28 or later). You can check your version by running: ```git --version```",
            detail2:"If you haven’t already, set your local default git branch to ```main```. You can do so by running: ```git config --global init.defaultBranch main```",
            detail3:"",
            detail4:"",
            detail5:"",
            detail6:"",

            ancorName:"Assignment",
            popup1Name:"setting up first git and github repo",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1651305390/msbGeanologyProfilePics/creating_repo_mljkrl.png",
            // popup2Name:"",
            // popup2:"",


          },

              {
                name:'Note/warning',
                detail:"When trying to make simple changes to the files in your repo, such as attempting to fix a typo in your README.md you might be tempted to make this change directly via Github. However, it is best to avoid this as it will cause issues that require more advanced Git knowledge than we want to go over at this stage (it is covered in a future lesson), for now it is advised to make any changes via your local files then commit and push them using Git commands in your terminal once ready.",
                detail1:"",
                detail2:"",
                detail3:"",
                detail4:"",
                detail5:"",
                detail6:"",
                ancorName:"Note/warning",
                popup1Name:"",
                popup1:"",
                popup2Name:"",
                popup2:"",


              },
              {
                name:'Cheatsheet',
                detail:"This is a reference list of the most commonly used Git commands. (You might consider bookmarking this handy page.) Try to familiarize yourself with the commands so that you can eventually remember them all:",
                detail1:"Commands related to a remote repository: ==> git clone git@github.com:USER-NAME/REPOSITORY-NAME.git",
                detail2:"==>git push or git push origin main (Both accomplish the same goal in this context)",
                detail3:"Commands related to the workflow:==>git add .",
                detail4:'==>git commit -m "A message describing what you have done to make this snapshot different"',
                detail5:"Commands related to checking status or log history ==> git status ==>git log",
                detail6:'The basic Git syntax is program | action | destination. For example, ==>1 git add . is read as git | add | ., where the period represents everything in the current directory; ==>2 git commit -m "message" is read as git | commit -m | "message"; and ==>3. git status is read as git | status | (no destination).',
                ancorName:"Cheatsheet",
                popup1Name:"",
                popup1:"",
                popup2Name:"",
                popup2:"",


              },
          {
            name:'Git Best Practices',
            detail:"There’s a lot to learn about using Git. But it is worth taking the time to highlight some best practices so that you can be a better collaborator. Git is not only helpful when collaborating with others. It’s also useful when working independently. You will be relying more and more on your own commit history in the future when revisiting old code.",
            detail1:"Two helpful best practices to consider are atomic commits and leveraging those atomic commits to make your commit messages more useful to future collaborators.",
            detail2:"An atomic commit is a commit that includes changes related to only one feature or task of your program. There are two main reasons for doing this: first, if something you change turns out to cause some problems, it is easy to revert the specific change without losing other changes; and second, it enables you to write better commit messages.",
            // detail3:"",
            // detail4:"",
            // detail5:"",
            // detail6:"",

            ancorName:"Git Best Practices",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },
          {
            name:'Conclusion',
            detail:"You may not feel completely comfortable with Git at this point, which is normal. It’s a skill that you will get more comfortable with as you use it.",
            detail1:"The main thing to take away from this lesson is the basic workflow. The commands you’ve learned here are the ones you will be using the most often with Git.",
            detail2:"Don’t worry if you don’t know all the commands yet or if they aren’t quite sticking in your memory yet. They will soon be seared into your brain as you use them over and over in future projects.",
            detail3:"In later Git lessons, we will cover some of the more advanced Git features, such as branches. They will further expand your abilities and make you more productive.",
            detail4:"For now, concentrate on using the basics of Git that you’ve learned here for all of your projects from now on. You will soon know each of the basic Git commands from memory!",
            detail5:"",
            detail6:"",

            ancorName:"Conclusion",
            popup1Name:"",
            popup1:"",
            popup2Name:"",
            popup2:"",


          },
          {
            name:'Bonus: Changing the Git Commit Message Editor',
            detail:"As a bonus to this section, if you are using Visual Studio Code (and you should be if you’re following this curriculum) and you don’t want to get stuck writing a commit message in Vim because you accidentally used git commit without the message flag (-m), this command will make Visual Studio Code open a new tab with the ability to write your commit message and an optional description below it: git config --global core.editor 'code --wait'.",
            detail1:"There will be no confirmation or any output on the terminal after entering this command. To make a commit with Visual Studio Code as the text editor, make sure to use the git commit command without the -m flag. Just type git commit and no message after that. Once you do this, a new tab will open. Now you can write your message, and provide more information if you want, right below it. After typing your commit message, save it and exit the tab.",
            detail2:"With that out of the way, now you can choose to use either git commit -m <your message here> or git commit and enter your message with Visual Studio Code!",
            // detail3:"",
            // detail4:"",
            // detail5:"",
            // detail6:"",
            ancorName:"Bonus: Changing the Git Commit Message Editor",
            // popup1Name:"",
            // popup1:"",
            // popup2Name:"",
            // popup2:"",


          },

        ],
        additionalRead:[
          {
            title:"For more information on the change from master to main see GitHub’s Renaming Repository.",
            url:"https://github.com/github/renaming"
          },
        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
        ],
        people:[]
      },

      //
      // {
      //   name:"Git Basics",
      //   courseStatus:"incomplete",
      //   courseNumber:"012",
      //   logo:logo,
      //   menu:[
      //     {
      //       name:'',
      //       detail:"",
      //       detail1:"",
      //       detail2:"",
      //       detail3:"",
      //       detail4:"",
      //       detail5:"",
      //       detail6:"",
      //       ancorName:"",
      //       popup1Name:"",
      //       popup1:"",
      //       popup2Name:"",
      //       popup2:"",
      //
      //
      //     },
      //
      //
      //   ],
      //   additionalRead:[
      //     {
      //       title:"",
      //       url:""
      //     },
      //   ],
      //   source:[
      //     {
      //       name:"TheodinProject",
      //       link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
      //     },
      //   ],
      //   people:[]
      // }


    ],


  },
  {
    learningTitle:"HTML Foundations",
    companyHeadOfficeLocation:"Cameroon | Buea",
    logo:logo,
    companyLevel1:[
      {
        name:"Introduction to HTML and CSS",
        courseStatus:"Incomplete",

        courseNumber:"001",
        logo:logo,
        menu:[
          {
            name:'Introduction',
            detail:"So here it is: it’s time to actually start making things. This section will teach you the basics of HTML and CSS, the two foundational building blocks of pretty much everything on the web.",
            detail1:"",
            detail2:"",
            detail3:"",
            detail4:"",
            detail5:"",
            detail6:"",
            ancorName:"Introduction",
            popup1Name:"",
            popup1:"",
            popup2Name:"",
            popup2:"",
          },

          {
            name:'Lesson Overview',
            detail:"This section contains a general overview of topics that you will learn in this lesson.",
            detail1:"Get a basic overview of HTML, CSS and how they work together.",
            detail2:"",
            detail3:"",
            detail4:"",
            detail5:"",
            detail6:"",
            ancorName:"Lesson Overview",
            popup1Name:"",
            popup1:"",
            popup2Name:"",
            popup2:"",
          },

          {
            name:'HTML and CSS',
            detail:"HTML and CSS are two languages that work together to create everything that you see when you look at something on the internet. HTML is the raw data that a webpage is built out of. All the text, links, cards, lists, and buttons are created in HTML. CSS is what adds style to those plain elements. HTML puts information on a webpage, and CSS positions that information, gives it color, changes the font, and makes it look great!",
            detail1:"If you want to get technical, HTML and CSS aren’t programming languages because they are only concerned with presenting information. They are not used to program any logic. JavaScript, which you will be learning in the next section, is a programming language because it’s used to make webpages do things. Yet, there is quite a lot you can do with just HTML and CSS, and you will definitely need them both. The following lessons focus on giving you the tools you need to be successful once you get to the JavaScript content as you continue through our curriculum!",
            detail2:"",
            detail3:"",
            detail4:"",
            detail5:"",
            detail6:"",
            ancorName:"HTML and CSS",
            popup1Name:"",
            popup1:"",
            popup2Name:"",
            popup2:"",
          },

          {
            name:'Assignment',
            detail:"Read HTML vs CSS vs JavaScript. It’s a quick overview of the relationship between HTML, CSS, and JavaScript.",
            detail1:"",
            detail2:"",
            detail3:"",
            detail4:"",
            detail5:"",
            detail6:"",
            ancorName:"Assignment",
            popup1Name:"HTML vs CSS vs JavaScript",
            popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1651238585/msbGeanologyProfilePics/Html-css-js_mzjfnq.png",
            popup2Name:"",
            popup2:"",
          },
        ],
        KnowledgeCheck:[
          {
            check:"What do HTML and CSS stand for?"
          },
          {
            check:"Between HTML and CSS, which would you use for putting paragraphs of text on a webpage?"
          },
          {
            check:"Between HTML and CSS, which would you use for changing the font and background color of a button?"
          },

        ],
        additionalRead:[
          {
            title:"This FreeCodeCamp article goes into a little more depth than the assigned one. It covers things we’ll be teaching explicitly in later lessons though, so don’t worry about memorizing any of the details.",
            url:"https://www.freecodecamp.org/news/html-css-and-javascript-explained-for-beginners/"
          },
          {
            title:"Bookmark DevDocs.io. Read the “Welcome” message. Massive API documentation collection that even works offline. An essential collection of reference material for everything covered and more. (Maintained by FreeCodeCamp)",
            url:"https://www.freecodecamp.org/news/html-css-and-javascript-explained-for-beginners/"
          },
        ],
        source:[
          {
            name:"TheodinProject",
            link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
          },
        ],
      people:[]
    },

    {
      name:"Elements and Tags",
      courseStatus:"Incomplete",

      courseNumber:"002",
      logo:logo,
      menu:[
        {
          name:'Introduction',
          detail:"HTML (HyperText Markup Language) defines the structure and content of webpages. We use HTML elements to create all of the paragraphs, headings, lists, images, and links that make up a typical webpage. In this lesson, we will explore how HTML elements work.",
          detail1:"",
          detail2:"",
          detail3:"",
          detail4:"",
          detail5:"",
          detail6:"",
          ancorName:"Introduction",
          popup1Name:"",
          popup1:"",
          popup2Name:"",
          popup2:"",
        },
        {
          name:'Lesson Overview',
          detail:"This section contains a general overview of topics that you will learn in this lesson.",
          detail1:"Explain what HTML Tags are",
          detail2:"Explain what HTML elements are",
          detail3:"",
          detail4:"",
          detail5:"",
          detail6:"",
          ancorName:"Lesson Overview",
          popup1Name:"",
          popup1:"",
          popup2Name:"",
          popup2:"",
        },
        {
          name:'Elements and Tags',
          detail:"Almost all elements on an HTML page are just pieces of content wrapped in opening and closing HTML tags.",
          detail1:"Opening tags tell the browser this is the start of an HTML element. They are comprised of a keyword enclosed in angle brackets <>. For example, an opening paragraph tag looks like this: <p>.",
          detail2:"Closing tags tell the browser where an element ends. They are almost the same as opening tags; the only difference is that they have a forward slash before the keyword. For example, a closing paragraph tag looks like this: </p>.",
          detail3:"You can think of elements as containers for content. The opening and closing tags tell the browser what content the element contains. The browser can then use that information to determine how it should interpret and format the content.",
          detail4:"There are some HTML elements that do not have a closing tag. These are known as empty elements because they don’t wrap any content. We will encounter a few of these in later lessons, but for the most part, elements will have both opening and closing tags.",
          detail5:"HTML has a vast list of predefined tags that you can use to create all kinds of different elements. It is important to use the correct tags for content. Using the correct tags can have a big impact on two aspects of your sites: how they are ranked in search engines; and how accessible they are to users who rely on assistive technologies, like screen readers, to use the internet.",
          detail6:"Using the correct elements for content is called semantic HTML. We will explore this in much more depth later on in the curriculum.",
          ancorName:"Elements and Tags",
          popup1Name:"A full paragraph element looks like this:",
          popup1:"https://cdn.statically.io/gh/TheOdinProject/curriculum/5e4a39cf0c23dd96f988bbf8197a9370a50dc2c4/html_css/v2/foundations/html-foundations/imgs/element-diagram.png",
          popup2Name:"",
          popup2:"",
        },

        {
          name:'',
          detail:"",
          detail1:"",
          detail2:"",
          detail3:"",
          detail4:"",
          detail5:"",
          detail6:"",
          ancorName:"",
          popup1Name:"",
          popup1:"",
          popup2Name:"",
          popup2:"",
        },

      ],

      additionalRead:[
        {
          title:"vast list of predefined tags",
          url:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
        },
        {
          title:"Watch Kevin Powell’s Introduction to HTML Video",
          url:"https://www.youtube.com/watch?v=LGQuIIv2RVA&list=PL4-IK0AVhVjM0xE0K2uZRvsM7LkIhsPT-"
        },
        {
          title:"Don’t Fear the Internet’s video about HTML",
          url:"http://www.dontfeartheinternet.com/02-html/"
        },
      ],
      KnowledgeCheck:[
        {
          check:"What is an HTML tag?"
        },
        {
          check:"What are the three parts of an HTML element?"
        },
      ],
      source:[
        {
          name:"TheodinProject",
          link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
        },
      ],
    people:[]
  },
    {
    name:"HTML Boilerplate",
    courseStatus:"Incomplete",

    courseNumber:"003",
    logo:logo,
    menu:[
      {
        name:'Introduction',
        detail:"All HTML documents have the same basic structure or boilerplate that needs to be in place before anything useful can be done. In this lesson, we will explore the different parts of this boilerplate and see how it all fits together.",
        detail1:"",
        detail2:"",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"Introduction",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
      {
        name:'Lesson Overview',
        detail:"This section contains a general overview of topics that you will learn in this lesson.",
        detail1:"How to write the basic boilerplate for an HTML document",
        detail2:"How to open HTML documents in your browser",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"Lesson Overview",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
      {
        name:'Creating an HTML File',
        detail:"To demonstrate HTML boilerplate, we first need an HTML file to work with.",
        detail1:"Create a new folder on your computer and name it html-boilerplate. Within that folder create a new file and name it index.html.",
        detail2:"You’re probably already familiar with a lot of different types of files, for example doc, pdf, and image files.",
        detail3:"To let the computer know we want to create an HTML file, we need to append the filename with the .html extension as we have done when creating the index.html file.",
        detail4:"It is worth noting that we named our HTML file index. We should always name the HTML file that will contain the homepage of our websites index.html. This is because web servers will by default look for an index.html page when users land on our websites - and not having one will cause big problems.",
        detail5:"",
        detail6:"",
        ancorName:"Creating an HTML File",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
      {
        name:'The DOCTYPE',
        detail:"Every HTML page starts with a doctype declaration. The doctype’s purpose is to tell the browser what version of HTML it should use to render the document. The latest version of HTML is HTML5, and the doctype for that version is simply <!DOCTYPE html>.",
        detail1:"The doctypes for older versions of HTML were a bit more complicated. For example, this is the doctype declaration for HTML4:",
        detail2:'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
        detail3:"However, we probably won’t ever want to be using an older version of HTML, and so we’ll always use <!DOCTYPE html>.",
        detail4:"Open the index.html file created earlier in your text editor and add <!DOCTYPE html> to the very first line.",
        detail5:"",
        detail6:"",
        ancorName:"The DOCTYPE",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
      {
        name:'HTML Element',
        detail:"After we declare the doctype, we need to provide an <html> element. This is what’s known as the root element of the document, meaning that every other element in the document will be a descendant of it.",
        detail1:"This becomes more important later on when we learn about manipulating HTML with JavaScript. For now, just know that the HTML element should be included on every HTML document.",
        detail2:"Back in the index.html file, let’s add the <html> element by typing out its opening and closing tags, like so:",
        detail3:'<!DOCTYPE html><html lang="en"></html>',
        detail4:"What is the lang attribute?",
        detail5:"lang specifies the language of the text content in that element. This attribute is primarily used for improving accessibility of the webpage. It allows assistive technologies, for example screen readers, to adapt according to the language and invoke correct pronunciation.",
        detail6:"",
        ancorName:"HTML Element",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },

      {
        name:'Head Element',
        detail:"The <head> element is where we put important meta-information about our webpages, and stuff required for our webpages to render correctly in the browser. Inside the <head>, we should not use any element that displays content on the webpage.",
        detail1:"",
        detail2:'',
        detail3:'',
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"Head Element",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
      {
        name:'The Charset Meta Element',
        detail:'We should always have the meta tag for the charset encoding of the webpage in the head element: <meta charset="utf-8">.',
        detail1:"Setting the encoding is very important because it ensures that the webpage will display special symbols and characters from different languages correctly in the browser.",
        detail2:"There are many more elements that can go within the head of an HTML document. However, for now it’s only crucial to know about the two elements we have covered here. We will introduce more elements that go into the head throughout the rest of the curriculum.",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"The Charset Meta Element",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
      {
        name:'Title Element',
        detail:"Another element we should always include in the head of an HTML document is the title element:",
        detail1:"<title>My First Webpage</title>",
        detail2:"The title element is used to give webpages a human-readable title which is displayed in our webpage’s browser tab.",
        detail3:"If we didn’t include a title element, the webpage’s title would default to its file name. In our case that would be index.html, which isn’t very meaningful for users; this would make it very difficult to find our webpage if the user has many browser tabs open.",
        detail4:"Back in our index.html file, let’s add a head element with a charset meta element and a title within it. The head element goes within the HTML element and should always be the first element under the opening <html> tag:",
        detail5:'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>My First Webpage</title></head></html>',
        detail6:"",
        ancorName:"Title Element",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
      {
        name:'Body Element',
        detail:"The final element needed to complete the HTML boilerplate is the <body> element. This is where all the content that will be displayed to users will go - the text, images, lists, links, and so on.",
        detail1:"To complete the boilerplate, add a body element to the index.html file. The body element also goes within the HTML element and is always below the head element, like so:",
        detail2:'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>My First Webpage</title></head><body></body></html>',
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"Body Element",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
      {
        name:'Viewing HTML Files in the Browser',
        detail:"The HTML boilerplate in the index.html file is complete at this point, but how do you view it in the browser? There are a couple of different options:",
        detail1:"A note: In order to avoid branching our lesson’s instructions to accommodate for all of the differences between browsers, we are going to be using Google Chrome as our primary browser for the remainder of this course. All references to the browser will pertain specifically to Google Chrome. We strongly suggest that you use Google Chrome for all of your testing going forward.",
        detail2:"1. You can drag and drop an HTML file from your text editor into the address bar of your browser.",
        detail3:"2. You can find the HTML file in your file system and then double click it. This will open up the file in the default browser your system uses.",
        detail4:"3.You can use the terminal to open the file in your browser.==>Ubuntu - Navigate to the directory containing the file and use google-chrome index.html ==>macOS - Navigate to the directory containing the file and use open ./index.html",
        detail5:"Using one of the methods above, open up the index.html file we have been working on. You’ll notice the screen is blank. This is because we don’t have anything in our body to display.",
        detail6:'Back in the index.html file, let’s add a heading (more on these later) to the body, and save the file: ``` <!DOCTYPE html><html lang="en"> <head>  <meta charset="UTF-8">  <title>My First Webpage</title> </head> <body>   <h1>Hello World!</h1>  </body></html>``` Now, if you refresh the page in the browser, you should see the changes take effect, and the heading “Hello World!” will be displayed.',
        ancorName:"Viewing HTML Files in the Browser",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
      {
        name:'Assignment',
        detail:"Build some muscle memory by deleting the contents of the index.html file and trying to write out all the boilerplate again from memory. Don’t worry if you have to peek at the lesson content the first few times if you get stuck. Just keep going until you can do it a couple of times from memory.",
        detail1:"Run your boilerplate through an HTML validator. Validators ensure your markup is correct and are an excellent learning tool, as they provide feedback on syntax errors you may be making often and aren’t aware of, such as missing closing tags and extra spaces in your HTML.",
        detail2:"",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"Assignment",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
      {
        name:'',
        detail:"",
        detail1:"",
        detail2:"",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
    ],
    additionalRead:[
      {
        title:"Watch and follow along to Kevin Powell’s brilliant Building Your First Web Page video",
        url:"https://www.youtube.com/watch?list=PL4-IK0AVhVjM0xE0K2uZRvsM7LkIhsPT-&t=93&v=V8UAEoOvqFg&feature=youtu.be"
      },
      {
        title:" HTML validator",
        url:"https://validator.w3.org/"
      },
      {
        title:" Read through this article about what charsets you should use with your HTML pages.",
        url:"https://www.bitdegree.org/learn/html-encoding"
      },
      {
        title:" If you wish, you can add the lang attribute to individual elements throughout the webpage. Read through this doc for a better understanding of the lang attribute.",
        url:"https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang"
      },
    ],
    KnowledgeCheck:[
      {
        check:"What is the purpose of the doctype declaration?"
      },
      {
        check:"What is the HTML element?"
      },
      {
        check:"What is the purpose of the head element?"
      },
      {
        check:"What is the purpose of the body element?"
      },
    ],
    source:[
      {
        name:"TheodinProject",
        link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
      },
    ],
  people:[]
},
    {
  name:"Working with Text",
  courseStatus:"Incomplete",

  courseNumber:"004",
  logo:logo,
  menu:[
    {
      name:'Introduction',
      detail:"Most content on the web is text-based, so you will find yourself needing to work with HTML text elements quite a bit.",
      detail1:"In this lesson, we will learn about the text-based elements you are likely to use the most.",
      detail2:"",
      detail3:"",
      detail4:"",
      detail5:"",
      detail6:"",
      ancorName:"Introduction",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
    {
      name:'Lesson Overview',
      detail:"This section contains a general overview of topics that you will learn in this lesson.",
      detail1:"How to create paragraphs",
      detail2:"How to create headings",
      detail3:"How to create bold text",
      detail4:"How to create italicized text",
      detail5:"The relationships between nested elements",
      detail6:"How to create HTML comments",
      ancorName:"Lesson Overview",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
    {
      name:'Paragraphs',
      detail:"When the browser encounters new lines like this in your HTML, it will compress them down into one single space. The result of this compression is that all of the text is clumped together into one long line.",
      detail1:"If we want to create paragraphs in HTML, we need to use the paragraph element, which will add a newline after each of our paragraphs. A paragraph element is defined by wrapping text content with a <p> tag.",
      detail2:"",
      detail3:"",
      detail4:"",
      detail5:"",
      detail6:"",
      ancorName:"Paragraphs",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
    {
      name:'Headings',
      detail:"Headings are different from other HTML text elements: they are displayed larger and bolder than other text to signify that they are headings.",
      detail1:"There are 6 different levels of headings starting from <h1> to <h6>. The number within a heading tag represents that heading’s level. h1 is the most important and is larger than the other headings, and h6 is the lowest level and therefore the smallest of the headings.",
      detail2:"Headings are defined much like paragraphs. For example, to create an h1 heading, we wrap our heading text in a <h1> tag.",
      detail3:"Using the correct level of heading is important as levels provide a hierarchy to the content. An h1 heading should always be used for the heading of the overall page, and the lower level headings should be used as the headings for content in smaller sections of the page.",
      detail4:"",
      detail5:"",
      detail6:"",
      ancorName:"Headings",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
    {
      name:'Strong Element',
      detail:"The <strong> element makes text bold. It also semantically marks text as important; this affects tools, like screen readers, that users with visual impairments will rely on to use your website. The tone of voice on a screen reader will change to communicate the importance of the text within a strong element. To define a strong element we wrap text content in a <strong> tag.",
      detail1:"You can use strong on its own:<strong>Lorem ipsum dolor</strong>",
      detail2:"But you will probably find yourself using the strong element much more in combination with other text elements, like this:  <p>Lorem ipsum <strong>dolor sit</strong> amet, consectetur adipiscing elit.</p>",
      detail3:"Sometimes you will want to make text bold without giving it an important meaning. You’ll learn how to do that in the CSS lessons later in the curriculum.",
      detail4:"",
      detail5:"",
      detail6:"",
      ancorName:"Strong Element",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
    {
      name:'Em Element',
      detail:"The em element makes text italic. It also semantically places emphasis on the text, which again affects things like screen readers. To define an emphasised element we wrap text content in a <em> tag.",
      detail1:"To use em on its own:<em>Some emphasized text</em>",
      detail2:"Again, like the strong element, you will find yourself mostly using the em element with other text elements:<p>Lorem ipsum <em>dolor sit</em> amet, consectetur adipiscing elit.</p>",
      detail3:"",
      detail4:"",
      detail5:"",
      detail6:"",
      ancorName:"Em Element",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
    {
      name:'Nesting and Indentation',
      detail:"You may have noticed that in all the examples in this lesson we indent any elements that are within other elements. This is known as nesting elements.",
      detail1:"When we nest elements within other elements, we create a parent and child relationship between them. The nested elements are the children and the element they are nested within is the parent.",
      detail2:"In the following example, the body element is the parent and the paragraph is the child:<body><p>Lorem ipsum dolor sit amet.</p></body>",
      detail3:"Just as in human relationships, HTML parent elements can have many children. Elements at the same level of nesting are considered to be siblings.",
      detail4:"For example, the two paragraphs in the following code are siblings, since they are both children of the body tag and are at the same level of nesting as each other:<body> <p>Lorem ipsum dolor sit amet.</p> <p>Ut enim ad minim veniam.</p> </body>",
      detail5:"We use indentation to make the level of nesting clear and readable for ourselves and other developers who will work with our HTML in the future. It is recommended to indent any child elements by two spaces.",
      detail6:"The parent, child, and sibling relationships between elements will become much more important later when we start styling our HTML with CSS and adding behavior with JavaScript. For now, however, it is just important to know the distinction between how elements are related and the terminology used to describe their relationships.",
      ancorName:"Nesting and Indentation",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
    {
      name:'HTML Comments',
      detail:"HTML comments are not visible to the browser; they allow us to comment on our code so that other developers or our future selves can read them and get some context about something that might not be clear in the code.",
      detail1:"Writing an HTML comment is simple: We just enclose the comment with <!-- and --> tags. For example:<!-- I am a html comment -->",
      detail2:"",
      detail3:"",
      detail4:"",
      detail5:"",
      detail6:"",
      ancorName:"HTML Comments",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
    {
      name:'',
      detail:"",
      detail1:"",
      detail2:"",
      detail3:"",
      detail4:"",
      detail5:"",
      detail6:"",
      ancorName:"",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
  ],
  additionalRead:[
    {
      title:"Watch Kevin Powell’s HTML Paragraph and Headings Video",
      url:"https://www.youtube.com/watch?v=yqcd-XkxZNM&list=PL4-IK0AVhVjM0xE0K2uZRvsM7LkIhsPT-&index=3"
    },
    {
      title:"Watch Kevin Powell’s HTML Bold and Italic Text Video",
      url:"https://www.youtube.com/watch?v=gW6cBZLUk6M&list=PL4-IK0AVhVjM0xE0K2uZRvsM7LkIhsPT-&index=4"
    },
    {
      title:"To get some practice working with text in HTML, create a plain blog article page which uses different headings, uses paragraphs, and has some text in the paragraphs bolded and italicized. You can use Lorem Ipsum to generate dummy text, in place of real text as you build your sites.",
      url:"https://loremipsum.io/"
    }
  ],
  KnowledgeCheck:[
    {
      check:"How do you create a paragraph in HTML?"
    },
    {
      check:"How do you create a heading in HTML?"
    },
    {
      check:"How many different levels of headings are there and what is the difference between them?"
    },
    {
      check:"What element should you use to make text bold and important?"
    },
    {
      check:"What element should you use to make text italicized to add emphasis to it?"
    },
    {
      check:"What relationship does an element have with any nested elements within it?"
    },
    {
      check:"What relationship do two elements have if they are at the same level of nesting?"
    },
    {
      check:"How do you create HTML comments?"
    },

  ],
  source:[
    {
      name:"TheodinProject",
      link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
    },
  ],
people:[]
},
    {
name:"Lists",
courseStatus:"Incomplete",

courseNumber:"005",
logo:logo,
menu:[
{
  name:'',
  detail:"",
  detail1:"",
  detail2:"",
  detail3:"",
  detail4:"",
  detail5:"",
  detail6:"",
  ancorName:"",
  popup1Name:"",
  popup1:"",
  popup2Name:"",
  popup2:"",
},
],
additionalRead:[
{
  title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
  url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
  name:"TheodinProject",
  link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
    {
name:"Links and Images",
courseStatus:"Incomplete",

courseNumber:"006",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
    {
name:"Commit Messages",
courseStatus:"Incomplete",

courseNumber:"007",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
    {
name:"Project: Recipes",
courseStatus:"Incomplete",

courseNumber:"008",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},


    ]
},


{
  learningTitle:"CSS Foundations",
  companyHeadOfficeLocation:"Cameroon | Buea",
  logo:logo,
  companyLevel1:[
    {
      name:"CSS Foundations",
      courseStatus:"Incomplete",

      courseNumber:"001",
      logo:logo,
      menu:[
        {
          name:'',
          detail:"",
          detail1:"",
          detail2:"",
          detail3:"",
          detail4:"",
          detail5:"",
          detail6:"",
          ancorName:"",
          popup1Name:"",
          popup1:"",
          popup2Name:"",
          popup2:"",
        },
      ],
      additionalRead:[
        {
          title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
          url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
        },
      ],
      source:[
        {
          name:"TheodinProject",
          link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
        },
      ],
    people:[]
  },

  {
    name:"Inspecting HTML and CSS",
    courseStatus:"Incomplete",

    courseNumber:"002",
    logo:logo,
    menu:[
      {
        name:'',
        detail:"",
        detail1:"",
        detail2:"",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
    ],
    additionalRead:[
      {
        title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
        url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
      },
    ],
    source:[
      {
        name:"TheodinProject",
        link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
      },
    ],
  people:[]
},
  {
  name:"The Box Model",
  courseStatus:"Incomplete",

  courseNumber:"003",
  logo:logo,
  menu:[
    {
      name:'',
      detail:"",
      detail1:"",
      detail2:"",
      detail3:"",
      detail4:"",
      detail5:"",
      detail6:"",
      ancorName:"",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
  ],
  additionalRead:[
    {
      title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
      url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
    },
  ],
  source:[
    {
      name:"TheodinProject",
      link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
    },
  ],
people:[]
},
  {
name:"Block and Inline",
courseStatus:"Incomplete",

courseNumber:"004",
logo:logo,
menu:[
  {
    name:'',
    detail:"",
    detail1:"",
    detail2:"",
    detail3:"",
    detail4:"",
    detail5:"",
    detail6:"",
    ancorName:"",
    popup1Name:"",
    popup1:"",
    popup2Name:"",
    popup2:"",
  },
],
additionalRead:[
  {
    title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
    url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
  },
],
source:[
  {
    name:"TheodinProject",
    link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
  },
],
people:[]
},
  {
name:"Introduction to Flexbox",
courseStatus:"Incomplete",

courseNumber:"005",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
  {
name:"Growing and Shrinking",
courseStatus:"Incomplete",

courseNumber:"006",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
  {
name:"Axes",
courseStatus:"Incomplete",

courseNumber:"007",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
  {
name:"Alignment",
courseStatus:"Incomplete",

courseNumber:"008",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
{
name:"Project: Landing Page",
courseStatus:"Incomplete",

courseNumber:"008",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},


  ]
},

{
  learningTitle:"JavaScript Basics",
  companyHeadOfficeLocation:"Cameroon | Buea",
  logo:logo,
  companyLevel1:[
    {
      name:"Fundamentals Part 1",
      courseStatus:"Incomplete",

      courseNumber:"001",
      logo:logo,
      menu:[
        {
          name:'',
          detail:"",
          detail1:"",
          detail2:"",
          detail3:"",
          detail4:"",
          detail5:"",
          detail6:"",
          ancorName:"",
          popup1Name:"",
          popup1:"",
          popup2Name:"",
          popup2:"",
        },
      ],
      additionalRead:[
        {
          title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
          url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
        },
      ],
      source:[
        {
          name:"TheodinProject",
          link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
        },
      ],
    people:[]
  },

  {
    name:"Fundamentals Part 2",
    courseStatus:"Incomplete",

    courseNumber:"002",
    logo:logo,
    menu:[
      {
        name:'',
        detail:"",
        detail1:"",
        detail2:"",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
      },
    ],
    additionalRead:[
      {
        title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
        url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
      },
    ],
    source:[
      {
        name:"TheodinProject",
        link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
      },
    ],
  people:[]
},
  {
  name:"JavaScript Developer Tools",
  courseStatus:"Incomplete",

  courseNumber:"003",
  logo:logo,
  menu:[
    {
      name:'',
      detail:"",
      detail1:"",
      detail2:"",
      detail3:"",
      detail4:"",
      detail5:"",
      detail6:"",
      ancorName:"",
      popup1Name:"",
      popup1:"",
      popup2Name:"",
      popup2:"",
    },
  ],
  additionalRead:[
    {
      title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
      url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
    },
  ],
  source:[
    {
      name:"TheodinProject",
      link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
    },
  ],
people:[]
},
  {
name:"Fundamentals Part 3",
courseStatus:"Incomplete",

courseNumber:"004",
logo:logo,
menu:[
  {
    name:'',
    detail:"",
    detail1:"",
    detail2:"",
    detail3:"",
    detail4:"",
    detail5:"",
    detail6:"",
    ancorName:"",
    popup1Name:"",
    popup1:"",
    popup2Name:"",
    popup2:"",
  },
],
additionalRead:[
  {
    title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
    url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
  },
],
source:[
  {
    name:"TheodinProject",
    link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
  },
],
people:[]
},
  {
name:"Problem Solving",
courseStatus:"Incomplete",

courseNumber:"005",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
  {
name:"Understanding Errors",
courseStatus:"Incomplete",

courseNumber:"006",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
  {
name:"Project: Rock Paper Scissors",
courseStatus:"Incomplete",

courseNumber:"007",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
  {
name:"Clean Code",
courseStatus:"Incomplete",

courseNumber:"008",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
{
name:"Installing Node.js",
courseStatus:"Incomplete",

courseNumber:"008",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
{
name:"Fundamentals Part 4",
courseStatus:"Incomplete",

courseNumber:"010",
logo:logo,
menu:[
        {
        name:'Lesson Overview',
        detail:"This section contains a general overview of topics that you will learn in this lesson.",
        detail1:"1.) Using arrays.",
        detail2:"2.) Using built-in array methods.",
        detail3:"3.) Using loops.",
        detail4:"4.) Getting your hands dirty with TDD exercises.",
        detail5:"",
        detail6:"",
        ancorName:"Lesson Overview",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
        },

        {
        name:'Arrays',
        detail:"Strings and numbers may be our building blocks, but as your scripts get more complex, you’re going to need a way to deal with large quantities of them. Luckily, JavaScript has a couple of data types that are used for just that. An Array is simply an ordered collection of items (Strings, numbers, or other things).",
        detail1:"",
        detail2:"",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"Arrays",
        popup1Name:"This tutorial is a great introduction.",
        popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1651061833/msbGeanologyProfilePics/arrays_k4slb6.png",
        popup2Name:"This article covers some of the most useful built-in array methods. These fundamentals are something you’ll use every day, so don’t rush too much and miss out!",
        popup2:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1651062197/msbGeanologyProfilePics/arraymethods_g7bybk.png",
        },

        {
        name:'Loops',
        detail:"Computers don’t get tired, and they’re really, really fast! For that reason, they are well suited to solving problems that involve doing calculations multiple times. In some cases, a computer will be able to repeat a task thousands or even millions of times in just a few short seconds where it might take a human many hours. (Obviously, speed here depends on the complexity of the calculation and the speed of the computer itself). One way to make a computer do a repetitive task is using a loop.",
        detail1:"",
        detail2:"",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"Loops",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
        },

        {
        name:'Test Driven Development',
        detail:"Test Driven Development (TDD) is a phrase you often hear in the dev world. It refers to the practice of writing automated tests that describe how your code should work before you actually write the code. For example, if you want to write a function that adds a couple of numbers, you would first write a test that uses the function and supplies the expected output. The test will fail before you write your code, and you should be able to know that your code works correctly when the test passes.",
        detail1:"In many ways, TDD is much more productive than writing code without tests. If we didn’t have the test for the adding function above, we would have to run the code ourselves over and over, plugging in different numbers until we were sure that it was working… not a big deal for a simple ```add(2, 2)```, but imagine having to do that for more complicated functions, like checking whether or not someone has won a game of tic tac toe: (game_win(['o', null,'x',null,'x',null,'x', 'o', 'o'])). If you didn’t do TDD, then you might actually have to play multiple games against yourself just to test if the function was working correctly!",
        detail2:"We will teach you the art of actually writing these tests later in the course. The following practice has the tests already written out for you. All you have to do is set up the testing environment, read the specs, and write the code that makes them pass!",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"Test Driven Development",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
        },

        {
        name:'Practice',
        detail:"Follow the steps below to get started. Once you complete Step 1, be sure to use the README for each individual exercise in order to do them correctly.",
        detail1:"step 1 Read setting up files and jest in the additional resources",
        detail2:"Now that you have cloned the repository and run npm install to install Jest, complete these exercises in the following order:",
        detail3:"helloWorld (This exercise is intentionally very simple to ensure that you have set up everything properly!)",
        detail4:"repeatString ==> reverseString ==> removeFromArray ==>  sumAll ==>  leapYears ==> tempConversion",
        detail5:"Once you have a working solution, see how it compares to the exercise’s given solution. Solutions for the exercises can be found on the ‘solutions’ branch of the repo.",
        detail6:"",
        ancorName:"Practice",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
        },

        {
        name:'',
        detail:"",
        detail1:"",
        detail2:"",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
        },

        {
        name:'',
        detail:"",
        detail1:"",
        detail2:"",
        detail3:"",
        detail4:"",
        detail5:"",
        detail6:"",
        ancorName:"",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
        },
    ],
additionalRead:[
  {
    title:"setting up file and jest",
    url:"https://github.com/TheOdinProject/javascript-exercises#readme"
  },
{
title:"Read this MDN article. It’s a longer one, but make sure you tackle the ‘Active Learning’ sections at the bottom of the page.",
url:"https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code"
},
{
title:"Once again, same info, slightly different context from JavaScript.info. (Skim the info if you think you know it all, but don’t forget the tasks at the end of the page. You learn best by doing.)",
url:"https://javascript.info/while-for"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
{
  name:"w3schools",
  link:"https://www.w3schools.com/js/js_array_methods.asp"
},
{
  name:"looping",
  link:"https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code"
}
],
people:[]
},

{
name:"DOM Manipulation and Events",
courseStatus:"Incomplete",

courseNumber:"011",
logo:logo,
menu:[
{
name:'Introduction',
detail:"One of the most unique and useful abilities of JavaScript is its ability to manipulate the DOM. But what is the DOM, and how do we go about changing it? Let’s jump right in…",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"Introduction",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'Lesson Overview',
detail:"This section contains a general overview of topics that you will learn in this lesson.",
detail1:"1.) Explain the difference between a “node” and an “element”.",
detail2:"2.) Explain how to target nodes with “selectors”.",
detail3:"3.) Explain the basic methods for finding/adding/removing and altering DOM nodes.",
detail4:"4.) Explain the difference between a “nodelist” and an “array of nodes”.",
detail5:"5.) Explain what “bubbling” is and how it works.",
detail6:"",
ancorName:"Lesson Overview",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'DOM - Document Object Model',
detail:"The DOM (or Document Object Model) is a tree-like representation of the contents of a webpage - a tree of “nodes” with different relationships depending on how they’re arranged in the HTML document.",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"DOM - Document Object Model",
popup1Name:"DOM sample code",
popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1651144787/msbGeanologyProfilePics/Domcode_s1mpqn.png",
popup2Name:"",
popup2:"",
},
{
name:'Targeting Nodes with Selectors',
detail:"When working with the DOM, you use “selectors” to target the nodes you want to work with. You can use a combination of CSS-style selectors and relationship properties to target the nodes you want. Let’s start with CSS-style selectors. In the above example, you could use the following selectors to refer to",
detail1:'<div class="display"></div>:',
detail2:"div.display",
detail3:".display",
detail4:"#container > .display",
detail5:"div#container > div.display",
detail6:"",
ancorName:"Targeting Nodes with Selectors",
popup1Name:"code sample",
popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1651145379/msbGeanologyProfilePics/code_sample1_jgmoie.png",
popup2Name:"",
popup2:"",
},
{
name:'DOM methods',
detail:"When your HTML code is parsed by a web browser, it is converted to the DOM as was mentioned above. One of the primary differences is that these nodes are objects that have many properties and methods attached to them. These properties and methods are the primary tools we are going to use to manipulate our webpage with JavaScript. We’ll start with the query selectors - those that help you target nodes.",
detail1:"Query Selectors:",
detail2:"element.querySelector(selector) returns a reference to the first match of selector",
detail3:"element.querySelectorAll(selectors) returns a “nodelist” containing references to all of the matches of the selectors",
detail4:"*There are several other, more specific queries, that offer potential (marginal) performance benefits, but we won’t be going over them now.",
detail5:"It’s important to note that when using querySelectorAll, the return value is not an array. It looks like an array, and it somewhat acts like an array, but it’s really a “nodelist”. The big distinction is that several array methods are missing from nodelists. One solution, if problems arise, is to convert the nodelist into an array. You can do this with Array.from() or the spread operator.",
detail6:"",
ancorName:"DOM methods",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'Element Creation',
detail:"document.createElement(tagName, [options]) creates a new element of tag type tagName. [options] in this case means you can add some optional parameters to the function. Don’t worry about these at this point.",
detail1:"const div = document.createElement('div');",
detail2:"This function does NOT put your new element into the DOM - it simply creates it in memory. This is so that you can manipulate the element (by adding styles, classes, ids, text, etc.) before placing it on the page. You can place the element into the DOM with one of the following methods.",
detail3:"Append Elements: ==>parentNode.appendChild(childNode) appends childNode as the last child of parentNode",
detail4:"Append Elements: ==>parentNode.insertBefore(newNode, referenceNode) inserts newNode into parentNode before referenceNode",
detail5:"Remove Elements: ==>parentNode.removeChild(child) removes child from parentNode on the DOM and returns a reference to child",
detail6:"",
ancorName:"Element Creation",
popup1Name:"More on Elements",
popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1651149315/msbGeanologyProfilePics/moreonalternatingelement_g99bbc.png",
popup2Name:"",
popup2:"",
},
{
name:'Important note:',
detail:"Your JavaScript, for the most part, is run whenever the JS file is run, or when the script tag is encountered in the HTML. If you are including your JavaScript at the top of your file, many of these DOM manipulation methods will not work because the JS code is being run before the nodes are created in the DOM. The simplest way to fix this is to include your JavaScript at the bottom of your HTML file so that it gets run after the DOM nodes are parsed and created.",
detail1:"Alternatively, you can link the JavaScript file in the <head> of your HTML document. Use the <script> tag with the src attribute containing the path to the JS file, and include the defer keyword to load the file after the HTML is parsed, as such:",
detail2:"```<head>",
detail3:'<script src="js-file.js" defer></script>',
detail4:"</head>```",
detail5:"",
detail6:"",
ancorName:"Important note:",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'Exercise',
detail:"Copy the example above into files on your own computer. To make it work you’ll need to supply the rest of the HTML skeleton and either link your JavaScript file, or put the JavaScript into a script tag on the page. Make sure everything is working before moving on!",
detail1:"Add the following elements to the container using ONLY JavaScript and the DOM methods shown above.",
detail2:"1) a <p> with red text that says “Hey I’m red!”",
detail3:"2) an <h3> with blue text that says “I’m a blue h3!”",
detail4:"3) a <div> with a black border and pink background color with the following elements inside of it: ==>a) another <h1> that says “I’m in a div” ==>b) a <p> that says “ME TOO!” ==>c)Hint for this one: after creating the <div> with createElement, append the <h1> and <p> to it before adding it to the container.",
detail5:"",
detail6:"",
ancorName:"Exercise",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'Events',
detail:"Now that we have a handle on manipulating the DOM with JavaScript, the next step is learning how to make that happen dynamically, or on demand! Events are how you make that magic happen on your pages. Events are actions that occur on your webpage such as mouse-clicks or keypresses, and using JavaScript we can make our webpage listen and react to these events.",
detail1:"There are three primary ways to go about this: you can attach functions’ attributes directly on your HTML elements, you can set the “on_event_” property on the DOM object in your JavaScript, or you can attach event listeners to the nodes in your JavaScript. Event listeners are definitely the preferred method, but you will regularly see the others in use, so we’re going to cover all three.",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"Events",
popup1Name:"We’re going to create 3 buttons that all alert “Hello World” when clicked. Try them all out using your own HTML file, or using something like CodePen.",
popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1651151359/msbGeanologyProfilePics/practice_wct0vl.png",
popup2Name:"",
popup2:"",
},
{
name:'Practice',
detail:"Manipulating web pages is the primary benefit of the JavaScript language! These techniques are things that you are likely to be messing with every day as a front-end developer, so let’s practice!",
detail1:"Follow the practice links in the additional resource",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"Practice",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},

],
KnowledgeCheck:[
  {
    check:"What is the DOM?"
  },
  {
    check:"How do you target the nodes you want to work with?"
  },
  {
    check:"How do you create an element in the DOM?"
  },
  {
    check:"How do you add an element to the DOM?"
  },
  {
    check:"How do you remove an element from the DOM?"
  },
  {
    check:"How can you alter an element in the DOM?"
  },
  {
    check:"When adding text to a DOM element, should you use textContent or innerHTML? Why?"
  },
  {
    check:"Where should you include your JavaScript tag in your HTML file when working with DOM nodes?"
  },
  {
    check:"How do “events” and “listeners” work?"
  },
  {
    check:"What are three ways to use events in your code?"
  },
  {
    check:"Why are event listeners the preferred way to handle events?"
  },
  {
    check:"What are the benefits of using named functions in your listeners?"
  },
  {
    check:"How do you attach listeners to groups of nodes?"
  },
  {
    check:"What is the difference between the return values of querySelector and querySelectorAll?"
  },
  {
    check:"What does a “nodelist” contain?"
  },
  {
    check:"Explain the difference between “capture” and “bubbling”."
  },

],
additionalRead:[
{
title:"Read about spread operator.",
url:"https://developer.mozilla.org/en-US/docs/web/javascript/reference/operators/spread_syntax"
},
{
  title:"Applying CSS and JavaScript to HTML",
  url:"https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#applying_css_and_javascript_to_html"
},
{
  title:"Grab the first exercise in Wes Bos’s JavaScript30 program by cloning the repo at https://github.com/wesbos/JavaScript30.",
  url:"https://github.com/wesbos/JavaScript30"
},
{
  title:"Code along with the Video Tutorial to build the rest of the exercise.",
  url:"https://www.youtube.com/watch?v=VuN8qwZoego"
},
{
  title:"Watch the Event Capture, Propagation and Bubbling video from Wes Bos’s JavaScript30 program. If you want to code along with the video, you can use the contents of folder #25 from the repo you cloned above.",
  url:"https://www.youtube.com/watch?v=F1anRyL37lE"
},
{
  title:"Eloquent JS - DOM",
  url:"https://eloquentjavascript.net/14_dom.html"
},
{
  title:"Eloquent JS - Handling Events",
  url:"https://eloquentjavascript.net/15_event.html"
},
{
  title:"DOM Enlightenment",
  url:"http://domenlightenment.com/"
},
{
  title:"Plain JavaScript is a reference of JavaScript code snippets and explanations involving the DOM, as well as other aspects of JS. If you’ve already learned jQuery, it will help you figure out how to do things without it.",
  url:"https://plainjs.com/javascript/"
},
{
  title:"This W3Schools article offers simple and easy-to-understand lessons on the DOM.",
  url:"https://www.w3schools.com/js/js_htmldom.asp"
},
{
  title:"JS DOM Crash Course is an extensive and well explained 4 part video series on the DOM by Traversy Media.",
  url:"https://www.youtube.com/watch?v=0ik6X4DJKCc&list=PLillGF-RfqbYE6Ik_EuXA2iZFcE082B3s"
},
{
  url:"https://www.digitalocean.com/community/tutorial_series/understanding-the-dom-document-object-model",
  title:"Understanding The Dom is an aptly named article-based tutorial series by DigitalOcean."
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},

{
name:"Revisiting Rock Paper Scissors",
courseStatus:"Incomplete",

courseNumber:"008",
logo:logo,
menu:[
        {
        name:'Introduction',
        detail:"Now that we can manipulate the DOM, it’s time to revisit Rock Paper Scissors Project and add a simple UI to it.",
        detail1:"Before you start making changes to your Rock Paper Scissors project, you need to learn about a concept in Git called branching so that you can make your changes without having to worry about breaking what you have now.",
        detail2:"Branches in Git allow your repository to hold multiple alternate reality versions of your files at the same time. You’ve actually (sort of) been using branches since you made your first commit, you just might not have known it! Back in the setting up Git lesson when you ran git config ```--global init.defaultBranch main``` you were setting the name of what’s called the default branch for your repos. The default branch is just what we call the branch that is created when you make your first commit on a project, and in that command we set the name to be ```main``` as is the current standard.",
        detail3:"Like the branches in a tree (hence the name), all of the branches for a project stem off of a “trunk” (the main branch) or off of other branches.",
        detail4:"When you make commits on a specific branch those changes only exist on that branch, leaving all of your other branches exactly as they were when you branched off of them.",
        detail5:"This means that you can keep your main branch as a place for only finished features that you know are working properly, and add each feature to your project using dedicated branches which we call feature branches.",
        detail6:"",
        ancorName:"Introduction",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
        },
        {
        name:'Using Branches',
        detail:"You can make new branches by using the command ```git branch <branch_name>```. You can then change to your new branch using ```git checkout <branch_name>```. You can also create a new branch and change to it in a single command by using the ```-b``` flag with ```checkout```, in the form ```git checkout -b <branch_name>```.",
        detail1:"You can see all of your current branches using ```git branch``` with no other arguments. The branch that you’re currently on will be indicated with an asterisk. If you want to change back to ```main``` from any other branch, you can do so just like changing to any other branch using ```git checkout main```.",
        detail2:"Once you’re done working on your feature branch and you’re ready to bring the commits that you’ve made on it to your main branch, you need to perform what is known as a ```merge```.",
        detail3:"Merges are done by using the command ```git merge <branch_name>``` which will take the changes you’ve committed in ```branch_name``` and add them to the branch that you’re currently on.",
        detail4:"Sometimes the same lines in a file will have been changed by two different branches. When this happens you will have a merge conflict when you try and merge those branches together. In order to finish merging the branches you will have to first resolve the conflict, which will be covered in a future lesson.",
        detail5:"When you don’t need a branch anymore it can be deleted using git ```branch -d <branch_name>``` if the branch has already been merged into ```main```, or with ```git branch -D <branch_name>``` if it hasn’t. You will usually want to delete branches when you’re done with them, otherwise they can pile up and make it more difficult to find the branch you’re looking for when you need it.",
        detail6:"",
        ancorName:"Using Branches",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
        },
        {
        name:'Sharing Code',
        detail:"Another great use case for branches is to share code with others that you might not want to commit to your main branch (or feature branch) at all.",
        detail1:"For example: if you have a bug in a new feature you’re working on that you can’t figure out, and it causes your code to break, you don’t want to commit that broken code and have it in your project’s “permanent record”. Thankfully, branches make it easy to share code on GitHub without having to commit problematic code where it can be seen in the future!",
        detail2:"1.) Make a new branch (called temp) and change to it with git checkout -b temp",
        detail3:"2.) Commit the current state of your code to your temp branch like you normally would",
        detail4:"3.) Push your temp branch to your GitHub repo with git push origin temp",
        detail5:"4.) You (or anyone else with the link to your repo!) can now select your temp branch using the branch selector dropdown.",
        detail6:"",
        ancorName:"Sharing Code",
        popup1Name:"",
        popup1:"",
        popup2Name:"",
        popup2:"",
        },

        {
        name:'Assignment',
        detail:"1.) Set up a new branch on your previous Rock Paper Scissors repo and complete the assignment",

        ancorName:"Assignment",
        popup1Name:"complete asignment",
        popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1652865247/msbGeanologyProfilePics/rockpapersisorassignment_uyldj3.png",
        popup2Name:"",
        popup2:"",
        },
],
KnowledgeCheck:[
  {
    check:"In your own words decribe how to work as a team with other developers"
  },
],
additionalRead:[
{
title:"Actively learn the Git workflows discussed in this lesson with this interactive Visual Git Cheatsheet by Andrew Peterson. It’s okay to be unfamiliar with the variety of commands you’ll interact with. You’ll learn about the ones you’re unfamiliar with later in the curriculum.",
url:"https://ndpsoftware.com/git-cheatsheet.html#loc=index;"
},
{
title:"Make pushing your local commits to remote branches easier with the command git push -u origin <branch>. It automatically links the local branch you push with the remote one. Read this educative.io article by Talha Ashar and commit faster to a remote branch with a simple git push command.",
url:"https://www.educative.io/edpresso/what-is-the-git-push--u-remote-branch-name-command"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},

{
name:"Project: Etch-a-Sketch",
courseStatus:"Incomplete",

courseNumber:"008",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},

{
name:"Fundamentals Part 5",
courseStatus:"Incomplete",

courseNumber:"008",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},

{
name:"Project: Calculator",
courseStatus:"Incomplete",

courseNumber:"008",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},
{
name:"Conclusion: Choose Your Path Forward",
courseStatus:"Incomplete",

courseNumber:"008",
logo:logo,
menu:[
{
name:'',
detail:"",
detail1:"",
detail2:"",
detail3:"",
detail4:"",
detail5:"",
detail6:"",
ancorName:"",
popup1Name:"",
popup1:"",
popup2Name:"",
popup2:"",
},
],
additionalRead:[
{
title:"Watch this video about how Git can improve the workflow of both an individual and a team of developers.",
url:"https://www.youtube.com/watch?v=8oRjP8yj2Wo"
},
],
source:[
{
name:"TheodinProject",
link:"https://www.theodinproject.com/lessons/foundations-introduction-to-web-development"
},
],
people:[]
},


  ]
}


]
