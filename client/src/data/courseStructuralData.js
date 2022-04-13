import {logo,wiki1,fvbvf,computer,google} from '../images'
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
        courseStatus:"Incomplete",
        courseNumber:"002",
        logo:logo,
        menu:[
          {
            name:'What Do Web Developers Do?',
            detail:"In short, web developers build and maintain websites.\nWeb developers often work for clients who are trying to get their product or service onto the web. The work is typically very project focused and involves collaborating with a team that helps to coordinate the client’s needs into the end product. The client could be a tech company, an organization, or a government. The work could involve front-end, back-end, or full-stack web development.\nWeb development could be a good profession for you if you like solving logical problems, building useful things, and experimenting with new technologies. Web developers are in high demand, generally have a good work/life balance, and command comfortable salaries. Google your specific location to get a better sense of your local web development job opportunities.\n For more details, Wikipedia describes the breadth of the web development profession in their entry on web design.",
            ancorName:"WhatDoWebDevelopersDo",
            // popup1:wiki1
          },
          {
            name:'Types of Web Developers',
            detail:"Earlier, we mentioned that web development work could be in the front end, the back end, or the full stack. What exactly do these terms mean?\n The front end is the stuff you see on the website in your browser, including the presentation of content and user interface elements like the navigation bar. Front-end developers use HTML, CSS, JavaScript, and their relevant frameworks to ensure that content is presented effectively and that users have an excellent experience.\n The back end refers to the guts of the application, which live on the server. The back end stores and serves program data to ensure that the front end has what it needs. This process can become very complicated when a website has millions of users. Back-end developers use programming languages like Java, Python, and Ruby to work with data.\n Full-stack developers are comfortable working with both the front and back ends. At The Odin Project, we focus on teaching you full-stack development, covering all aspects of web development.\n For more detail, Udacity has a great blog post on this topic: 3 Web Dev Careers Decoded: Front-End vs Back-End vs Full Stack",
            ancorName:"TypesofWebDevelopers",
            // popup1:fvbvf

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
            popup1:computer
          },
          {
            name:'Google',
            detail:"Google is a fully-automated search engine that uses software known as web crawlers that explore the web on a regular basis to find sites to add to our index. In fact, the vast majority of sites listed in our results aren't manually submitted for inclusion, but are found and added automatically when our web crawlers crawl the web.\n Google Search works in essentially three stages:\nCrawling: Google searches the web with automated programs called crawlers, looking for pages that are new or updated. Google stores those page addresses (or page URLs) in a big list to look at later. We find pages by many different methods, but the main method is following links from pages that we already know about.\nIndexing: Google visits the pages that it has learned about by crawling, and tries to analyze what each page is about. Google analyzes the content, images, and video files in the page, trying to understand what the page is about. This information is stored in the Google index, a huge database that is stored on many computers.\n Serving search results: When a user searches on Google, Google tries to determine the highest quality results. The 'best' results have many factors, including things such as the user's location, language, device (desktop or phone), and previous queries. For example, searching for 'bicycle repair shops' would show different answers to a user in Paris than it would to a user in Hong Kong. Google doesn't accept payment to rank pages higher, and ranking is done algorithmically.",
            ancorName:"google",
            // popup1:google
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
            details:"GitHub, Inc. is a provider of Internet hosting for software development and version control using Git. It offers the distributed version control and source code management functionality of Git, plus its own features.",
            ancorName:"GitHub",
          }

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
        ],
        people:[]
      },

      {
        name:"Asking For Help",
        courseStatus:"incomplete",
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
