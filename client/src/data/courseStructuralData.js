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
            name:'Assignment',
            detail:'Read and bookmark this amazing article by Gordon Zhu. It is a great reference to refer to whenever you find yourself needing to ask for help, and you might find yourself solving your own problem as you think about the points listed in the article. The video linked in this article is no longer available but that is not an issue since we explain debugging in detail later in the curriculum.',
            ancorName:"Assignment",
            // popup1Name:"A woman who taught herself enough to land a job in 5 months",
            // popup1:"https://res.cloudinary.com/msb-geneasocial/image/upload/v1650258945/msbGeanologyProfilePics/woman_that_learn_cooding_ozbjrk.png",

            // popup2Name:"A 32 year old who taught himself programming using The Odin Project",
            // popup2:"",
          },
        ],
        people:[]
      },

      {
        name:"Join the developer Communities",
        courseStatus:"incomplete",
        people:[]
      },

      {
        name:"Introduction to Web Development",
        courseStatus:"incomplete",
        people:[]
      },

      {
        name:"How Does the Web Work?",
        courseStatus:"incomplete",
        people:[]
      },

      {
        name:"Prerequisites",
        courseStatus:"incomplete",
        people:[]
      },

      {
        name:"Text Editors",
        courseStatus:"incomplete",
        people:[]
      },

      {
        name:"Command Line Basics",
        courseStatus:"incomplete",
        people:[]
      },

      {
        name:"Setting Up Git",
        courseStatus:"incomplete",
        people:[]
      },

      {
        name:"Introduction to Git",
        courseStatus:"incomplete",
        people:[]
      },

      {
        name:"Git Basics",
        courseStatus:"incomplete",
        people:[]
      }


    ],


  }

]
