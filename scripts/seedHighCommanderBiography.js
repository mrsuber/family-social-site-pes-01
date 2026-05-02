require('dotenv').config();
const { sequelize } = require('../config/db');
const Person = require('../models/Person');
const BiographySection = require('../models/BiographySection');

async function seedHighCommanderBiography() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Find the High Commander
    const highCommander = await Person.findOne({
      where: { relationshipType: 'high_commander' }
    });

    if (!highCommander) {
      console.error('❌ High Commander not found.');
      process.exit(1);
    }

    console.log(`📖 Creating biography for: ${highCommander.fullName}\n`);

    // Delete existing biography sections to start fresh
    await BiographySection.destroy({
      where: { personId: highCommander.id }
    });

    const bioSections = [
      {
        personId: highCommander.id,
        sectionNumber: 1,
        sectionTitle: 'Where You Came From - The Anger',
        content: `# Where You Came From - The Anger

## Your Father: Nuhu Banbong

**Born:** July 12, 1964, Kumbo, Bui, Cameroon
**Education:** Studied Islam in Kuwait
**Legacy:** First imam in Cameroon to translate the Friday khutbah (sermon) from pure Arabic to part Arabic, part Pidgin English. This pioneering work is now widely used across Cameroon, yet very few know how it started or who started it.

**The Hadith That Changed Everything:**

Your father taught you Islam. You remember learning the hadith of a man coming to the Prophet Muhammad (PBUH) asking: "After I have obeyed and respected Allah and His Messenger, who is next?" The Prophet said: "Your mother." The man asked again: "Who is next?" The Prophet said: "Your mother." He asked a third time: "Who is next?" The Prophet said: "Your mother." The man asked a fourth time: "Who is next?" And the Prophet said: "Your father."

**Respect your mother THREE TIMES before your father.**

This hadith would define your life.

---

## The Divorce

**When:** You were in Form 1 (around 2006)
**What Happened:** Your father married a second wife. This destroyed his marriage with your mother, Tani Amina Kolai.

**The Physical Fight:**

One day, the second wife fought with your mother physically. You stood there with nothing to do or say. When you got in the middle of the two fighters, you were simply pushed out of the way. You were powerless.

The second wife left and never returned. Your father started paying less attention to you, your sisters Maryam Mengka Banbong and Nawal Yefon Banbong, and your newborn brother Jabeer Nuhu Banbong (who had just been weaned).

**The Departure - Form 2:**

Your mother left Kumbo-Tobin (the marital home). She took your sisters and brother. She told you to stay with your father. Your father wasn't home that day.

**You remembered the hadith.**

Respect your mother three times before your father.

**You chose to follow her.**

You were known as your father's "shadow" - his closest child. Yet you walked away from him to honor your mother.

---

## The Poverty Years

**Location:** Ndzenji, living with your uncle Nuhu Mingjo (your mother's younger brother) and your mother's uncle.

**How You Survived:**

**Selling Puff Puff and Massa:**
- Small fried foods made from flour and rice
- Sold for 50 FCFA each
- If you fried yourself: Buy ingredients for 1,000 FCFA, sell for 2,000 FCFA = 1,000 FCFA profit
- If you bought retail: Buy for 1,000 FCFA, they give you 1,200 FCFA worth, sell for 1,200 FCFA = 200 FCFA profit

This is what you sold during holidays to save small coins for school fees.

**What You Could Afford:**
- ✅ School fees (minimum)
- ✅ Uniform
- ✅ School shoes
- ❌ Textbooks (couldn't afford)

**What You Ate:**
- Mostly rice (that's all you could afford)

**Your Health Crisis:**

You developed **severe gastric** (stomach pain). From your research in human biology, you deduced it was caused by **lack of protein**.

**You cured yourself:**
- Bought a tray of eggs
- Ate one egg in the morning, one egg in the evening
- Gradually cured your gastric over time

**You taught yourself to survive.**

**Your Mother's Work:**

Your mother, Tani Amina Kolai, is a seamstress (tailoring female and male dresses, not suits). This is how she afforded food for the family.

You worked in her shop during weekdays, sewing dresses. You sold puff puff on weekends.

**You had no time to study. You just had average grades.**

---

## BERIKIDS - "A Small Devil"

**Age:** Puberty, changing from boy to adult
**Problem:** You were becoming stubborn, going to friends' houses to play King of Fighters 2002, watching movies, coming home late.

**Your Mother's Solution:**

She sent you to live at **BERIKIDS**, a non-governmental organization run by:
- Mrs. Rilindis Berinyuy (mother figure)
- Mr. Tany (father figure, police officer by occupation)
- Valery Ayuni (boy in the house)
- All Christians

**At first, you were excited:** New environment, new people, a chance to repent to Allah and be a good boy, rebuild your faith.

**Then things changed.**

**The Farm at Nguwkang (2nd Term Holidays):**

Hard sandy soil and rocks. No electricity. No clouds - just direct sunlight. Built with thatched houses (grass).

**The Incident:**

Valery bought a giant rat (rat mole). It was cooked. You were tempted to eat meat, not knowing how it was killed, but knowing well it could not have been killed in the name of Allah. A non-Muslim killed it.

**This incident happened TWICE.**

You ate rat meat twice. Meat killed by non-Muslims, not halal.

You begged Allah for forgiveness and made a promise: **This will never happen again.**

(Reading your diary years later, you had completely forgotten this. Your conviction was so strong that you never again ate such meat - you erased it from your memory.)

**Uncle Awoudu - The Best Time (3rd Term Holiday):**

You visited your uncle Awoudu in Ngaoundal.

**For the first time in your life: THREE MEALS A DAY.**

He fed you well. He taught you morally and physically how to be hardworking. He had a kind, gentle, loving wife. For the days you stayed there, you saw no fault in either of them.

**May Allah reward them both.**

This is where you learned **embroidery** - the skill that would later save you financially.

---

## GCE 2011 - The Worst Feeling

**You registered for 10 papers.**
**You passed 4:** Maths (C), Biology (C), Computer (C), Religion (C)
**You failed 6 papers.**

**Classmates who failed borrowed subjects** to make up series so they could be promoted to A-Level. They would rewrite the failed subjects later.

**You knew you would do the same.**

**But Mrs. Rilindis, Mr. Tany, and your mother decided: You would REPEAT Form 5.**

**"It was as if I got mad. Lost my mind, the frustration."**

You couldn't express your anger openly. You didn't know how to express anger openly because nothing could equate to it. "Even if I killed someone it will still not be enough."

**Mr. Tany (the police officer) said:**

*"If you go to look for admission into A-Level, and succeed, and any other problem, any other thing that goes wrong after, count me out."*

You thought he accepted that you could proceed. You got money from your mom for registration. She gave it to you but said: **"I do not like this."**

You registered for A-Level anyway.

**Then Tany and Rilindis started looking at you like "a small devil."**

It was so bad, you decided to **stop fighting to go to A-Level**. You repeated Form 5, thinking repeating would make them forgive you.

**It made no difference.**

---

## 2012 - The Year of Anger

**You left BERIKIDS.** You moved back with your mother.

You started visiting your father on Sundays.

**You decided: Education is your ONLY future if you survive.**

**GCE 2012 Results (10 out of 11 passed):**
- Biology - B
- Chemistry - C
- Economics - B
- English - C
- **French - U (FAILED)**
- Geography - C
- History - C
- **Mathematics - A**
- **Additional Mathematics - B**
- Physics - C
- **Religion Studies - A**

**But 2012 was the UNHAPPIEST year of your life.**

**You made NO friends.**
**You were angry for a WHOLE YEAR.**
**You sat alone in the back bench at school.**
**You went to school early just to be alone.**

**"I was fueled with anger like you would not believe."**

**Your habit of being a private person started here.**

*"There is a peace in solitude, I guess."*

---

## The 2,000 FCFA Your Father Never Paid

Your father promised you 3,000 FCFA if you passed your Common Entrance and First School Leaving exams.

**You passed.**

He begged you to give him 1,000 FCFA, then never gave you the remaining 2,000 FCFA.

**You never forgot.**

---

## The Numbers - Where You Came From

| What | Amount | Context |
|------|--------|---------|
| Puff puff (each) | 50 FCFA | Sold during holidays |
| Puff puff profit (self-fried) | 1,000 FCFA | From 2,000 FCFA sales |
| Puff puff profit (retail) | 200 FCFA | From 1,200 FCFA sales |
| Promise broken | 2,000 FCFA | Your father never paid |
| What you could afford | Fees, uniform, shoes | No textbooks |
| What you ate | Mostly rice | All you could afford |
| Your cure | Eggs (2/day) | Morning and evening |

---

**This is where you came from.**

**This is the anger that fuels you.**

**Being poor made you powerless. You will NEVER be powerless again.**`,
        startDate: new Date('1994-12-02'),
        endDate: new Date('2012-12-31'),
        keyNumbers: {
          "puff_puff_price": "50 FCFA each",
          "puff_puff_profit": "1,000 FCFA (self-fried) or 200 FCFA (retail)",
          "father_debt": "2,000 FCFA never paid",
          "gce_2011_passed": "4 papers out of 10",
          "gce_2012_passed": "10 papers out of 11"
        },
        tags: ['anger', 'poverty', 'father', 'divorce', 'berikids', 'education', 'gastric', 'rat-meat', 'uncle-awoudu'],
        isPrivate: true,
        rawDiaryExcerpt: `RAW DIARY EXCERPT - January 13, 2013:

my mothers name is Tani Amina Kolai born on 8th october 1976 in mbveh - kumbo and my father well you know. born at kumbo bui 12-7-1964

after my parents got married, they leaved in bamenda, when i was to be born , they came to kumbo PMI hospital, then after i was born they return to Bamenda and was there for two years, after we came to kumbo -Tobin where we lived. i can still remember how things were smoth by then but as i got bigger, the world began to desive me. i remember as i one morning in class four GS Tobin (Gornvenment school Tobin) stole 50 fcfa not belonging to me. the only money i can remember i took not belonging to me and i forgot in the bath room. but when my mum saw it, she told my dad and that morning i was well beaten such beating that i had to remember till this day 13-1-2013 . form ther ethe quran and my love for Allah almighty God started to grow in my heart.

---

RAW STORY - THE ANGER (As told by Mohamad):

my father name is Nuhu Banbong born july 12 1964 in kumbo bui cameroon and went to study islam in kuwait. he is the first immam in cameroon to translate the friday khutbah (sermon) from pure arabic to part arabic part pidgin english and this is now being widely used in cameroon with many not knowing how it started or who started it. my mother is tani amina kolai.

when i was in form one my father married a second wife. this killed the marriage. one day the second wife fought with my mum physically. i stood there with nothing to do or say. when i got in the middle of the two fighters i was simple pushed out of the way. the second wife left and never returned. and my father started paying less attention to me my sisters maryam mengka banbong and nawal yefon banbong and my new born brother jabeer nuhu banbong who had just been weaned.

in form 2 my mum left kumbo tobin (the marital home) she took my sisters and brother. she told me to stay with my dad. my dad was not home that day. there is a hadith my father thought me of a man coming to the prophet muhammad pbuh asking: after i have obeyed and respect Allah and his messenger who is next. he said your mother. the man asked again who is next. he said your mother. he asked again who is next. he said your mother. he asked again who is next. he said your father. so respect your mother three times before your father. i remembered this hadith. i was like my fathers shadow his closes child. but i walked away from him.

we stayed in ndzenji. this is where my uncle nuhu mingjo (mums younger brother) and my mums uncle stays. we sold puff puff and massa which is a small fry food made from floor and rice respectively.  they sell for 50fcfa each. if you fry yourself you buy the ingredients for like 1000fcfa sell them for 2000fcfa you make 1000fcfa. if you buy retail you buy for 1000fcfa they give you 1200fcfa worth and you sell for 1200fcfa you make 200fcfa. this is what i sold during holidays to save small coins for school fees. i could only afford school fees. minimum school fees. i could afford school uniform. i could afford school shoes. but i could not afford text books. i mostly ate rice that is all i could afford. i developed serve gastric (stomach pain) from my research on human biology i deduced it was due to lack of protein. i bought a try of eggs and ate one egg in the morning and one egg in the evening and gradually cured my gastric. i thought myself how to survive. my mother tani amina kolai is a seamstress(tailoring female and male dress not suits). this is how she afforded food for us. i worked in her shop during week days sewing dresses. i sold puff puff during weekends. i had no time to study. i just had average grades.

when i was at puberty changing from boy to adult i was stubborn. going to friends houses to play king of fighters 2002, watching movies, coming late at home. my mum sent me to live at berikids a non governmental organisation run by mrs rilindis berinyuy (mother figure), mr tany (father figure police officer by occupation) and valery ayuni (boy in the house). all christian. i was so exited with that new environment new people. a chance to repent to Allah and be a good boy. rebuild my faith. but things were not always better in the end. when they took me to their farm at nguwkang. it was the second term holidays. hard sandy soil and rocks. no electricity. no clouds direct sun light. built with thatch houses (grass). that was when valery bought giant rat (rat mole). it was cooked. i was tempted to eat meat not knowing how it was killed but knowing well it could not have been killed in the name of Allah. a non muslim killed it. this incident happened twice. i begged Allah for forgiveness and made a promise this will never happen again. reading my diary years later i had completely forgotten this. my conviction was so strong that i never again ate such meat i erased it from my memory.

during the 3rd term holiday i visited my uncle awoudu in ngaoundal. for the first time in my life three meals a day. he fed me well. he thought me morally and physically how to be hard working. he had a kind gentle loving wife. for the days i stayed there i saw no fault in either of them. may Allah reward them both. this is where i learnt embroidery.

when i wrote my gce 2011 i registered 10 papers passed 4. maths c, biology c, computer c, religion c. and failed 6 papers. my class mates that failed borrowed subjects to make up series so they can be promoted to a-level. they will rewrite the failed subjects later. i knew i would do the same. but mrs rilindis mr tany and my mum decided i repeat form 5. it was as if i got mad. lost my mind the frustration. i could not express my anger openly i did not know how to express anger openly because nothing could equate to it. even if i killed someone it will still not be enough. mr tany (the police officer) said if you go to look for admission into a-level and succeed and any other problem any other thing that goes wrong after count me out. i thought he accepted that i could proceed. i got money from my mom for registration. she gave it to me but said i do not like this. i registered for a-level anyway. then tany and rilindis started looking at me like a small devil. it was so bad i decided to stop fighting to go to a-level. i repeated form 5 thinking repeating would make them forgive me. it made no difference.

i left berikids. moved back with my mum. i started visiting my dad on sundays. i decided education is my only future if i survive.

gce 2012 i passed 10 out of 11. biology b, chemistry c, economics b, english c, french u (failed), geography c, history c, mathematics a, additional mathematics b, physics c, religion studies a. but 2012 was the unhappiest year of my life. i made no friends. i was angry for a whole year. i sat alone in the back bench at school. i went to school early just to be alone. i was fueled with anger like you would not believe. my habit of being a private person started here. there is a peace in solitude i guess.

my father promised me 3000fcfa if i pass my common entrance and first school leaving i passed. he begged me to give him 1000fcfa then never gave me the remaining 2000fcfa. i never forgot.`
      },

      // SECTION 2: WHAT YOU BUILT
      {
        personId: highCommander.id,
        sectionNumber: 2,
        sectionTitle: 'What You Built - The Hope',
        content: `# What You Built - The Hope

## A-Level Success - The Happiest Day

**08-05-2014:** You started your A-Level GCE exams
**04-08-2014:** The results came out

**You passed ALL 5 subjects:**
- Biology - B
- Chemistry - D
- Pure Maths - B
- Further Maths - C
- Physics - D

**Why was this the HAPPIEST DAY of your life?**

*"After all what I have been through the past years, I was finally a few steps of being independent."*

You chose sciences because **the Quran said "Read/Recite"** - the first verse revealed to Prophet Muhammad (PBUH).

---

## The Girl: Nzotsa Djoukeng Sophie

**You loved her "with all my heart."**

You would do "what every it takes to make her my wife" - including becoming a medical doctor.

**She was smart.** She wrote 5 entrance exams (engineering, doctor, public works, etc.) and **passed ALL of them**.

**You were poor, not as smart, had limited resources.**

*"How could I keep up?"*

You could only afford ONE entrance exam - CUSS (medical doctor), the one she leaned towards most.

**You wrote it.**
**You failed.**

---

## The Frozen Year (2014-2015) - "Life on Ice"

**After failing CUSS, you stayed home for 1 year.**

**You applied to study Islam in Medina, Saudi Arabia.**
You needed your father's signature (you were underage).

**He refused.**

**He told you: "Consider I am dead."**

**That Year:**
- Farmed the traditional way (corn, beans, potatoes) to prepare for next year
- Lived in the village, broke, with your mother
- Ate when you could, sold in the market, did what you could

**You reached a point:**

*"I really did not care if I lived or died, if I ate or not, sleep or not."*

**"A man without a purpose."**

**Someone gave you advice:**

*"Mohamad, if you do not stand for something, you will fall for anything."*

You carried this very dear.

**And yet you had nothing.**

**The year was finally ending.** You attended preparatory classes.

**Your plan:** Either professional school or university.
**Your conviction:** "I am NOT to stay home again."

**Concours Results:**
1. **Polytechnique Yaoundé - FAILED**
2. **Biochemistry at University of Buea - SUCCEEDED**
3. **Computer Engineering at University of Buea - SUCCEEDED** (applied while doing biochemistry)

**"For the first time I have a path again."**

---

## University of Buea (4-Year Program, ~2015-2019)

### Year 2: The Anglophone Crisis & First Job

**The Strike:** Northwest and Southwest Cameroon crisis began. Universities shut down.

**Your mother told you:**

*"You will drop out again because I cannot afford to pay your rent nor feed you in Buea."*

**For the first time: You had to look for a job.**

**What You Knew:**
- You could sew dresses (learned from your mother)
- You learned **embroidery** from Uncle Awoudu's visit

**You worked. You earned your first cash.**

*"I was now in the independent line."*

### The Embroidery Job with Lady Maggie (3 Years, 2016-2019)

**Deal:** 50-50 profit split
**She provided:** Thread, machine, rent for the business
**You provided:** Labor

**Earnings:** 3,000 FCFA per day
**Rent:** Calabou house (locally made of wood) - 10,000 FCFA/month
**Life:** Work, school, home

**After food, school expenses, and rent: You were FLAT BROKE at the end of the year.**

**Friends:** You had a couple, but they had more stable lives. They wanted to command you around, send you left and right.

**Your nature refused to be used.**

*"You respect me, I will respect you."*

Those friendships didn't last.

---

## Sophie's Rejection - The Birth of Project Expansion (2017)

You still talked with Sophie during university. Now that you could work, you had income (small, but something).

**You professed your love to her.**

*"I knew now that I can back it financially no matter how small it is."*

**She rejected you.**

---

### What Happened Next

**First:** Heartbroken
**Then:** No purpose again
**Then:** Anger - **you wanted to leave this world**

**Everything summed up at once:**

*"I came from nothing and I am nothing now."*

**You made a decision:**

*"I will build and I will leave this world."*

**At first:** To leave = to be free from all this
**As your faith grew in Islam:** To leave = **to explore the wonders of Allah**

**Project Expansion was born.**

From Sophie's rejection to spacecraft. From heartbreak to the stars.

---

## After Graduation (2019-2022): Mr. Moses Besong

**You quit embroidery after 3 years.**

**Mentor:** Mr. Moses Besong, senior software engineer

**Duration:** 3 years (4 Ramadans passed)

**What You Learned:**
- Data structures & algorithms
- HackerRank challenges
- Software engineering from scratch

**You applied for jobs. Series of applications.**

---

## Camsol Technologies (~2022-2024)

**You got the job.**

**Position:** General Manager
**Salary:** 600,000 FCFA per month

**Still living in your calabou (wood) house.**

**Your First Action with Money:**

**You moved your mother to a better home in Yaoundé.**

Then you saved money to get married.

---

## First Marriage: Naomi Adamou Fridaousatu (2021-2024)

### Your Reasoning

*"Islam allows me to get married to multiple women, and if I choose properly, get married and train them to be generals at their own domains. Together we will explore the wonders of Allah together."*

### Naomi's Background

- **Both parents had passed**
- **Could not read or write English**
- **Could not speak English**
- Only sent to the farm, never to school

You thought: Someone with this past would be "angry at her past to make her future better."

### The Marriage Battle

**Her relatives were jealous.**

*"Such a girl that they never sent to school, only to the farm, happen to meet me successful, manager of a company."*

**They never wanted the marriage to happen.**

**They took her away to a distant village** (no electricity, no network).

When you traveled there, they **put her further into the land** - the crisis zone with separatists.

**You spent money, time, effort, peace to get her out.**

Once you got her out: **You married her.**

### The 3 Years Together (2021-2024)

**Constant threats:**
- Witchcraft threats
- Police locking you up threats

**You made all authorities in Buea know the situation to protect her.**

**You personally taught her:**
- The alphabet
- Read and write English
- Read and write Arabic

**You paid for her evening school.**

*"I was hoping she would lead SuberCraftex."*

### The End (December 2024)

She started having friends. Listening to other advice.

**When you lost your job at Camsol:**

**She left the house saying "marriage was not her thing."**

---

## The Discipline: How You Saved 7.1M+ FCFA

**Camsol Years (2022-2024, ~24-30 months):**

**Income:** 600,000 FCFA/month

**You invested/saved:** ~296,000 FCFA/month into SuberCraftex
**You lived on:** ~304,000 FCFA/month

**While supporting:**
- Yourself
- Naomi
- Your mother (occasional)
- Rent
- Expenses

**You lived on roughly HALF your salary for 2+ years straight.**

**Total invested into SuberCraftex:** 7.1M+ FCFA

**That's incredible discipline.**

---

## The Numbers - What You Built

| What | Amount | Context |
|------|--------|---------|
| Embroidery income | 3,000 FCFA/day | Lady Maggie, Year 2-4 university |
| Calabou rent | 10,000 FCFA/month | Wood house |
| Camsol salary | 600,000 FCFA/month | General Manager, 2022-2024 |
| SuberCraftex investment | 7.1M+ FCFA | Saved over 2+ years |
| Monthly savings rate | ~296,000 FCFA/month | Living on half salary |

---

## What You've Accomplished by Age 31

✅ **Education:**
- Failed GCE 2011 (4/10 papers)
- Passed GCE 2012 (10/11 papers)
- Passed A-Level 2014 (5/5 papers)
- Bachelor's in Computer Engineering (University of Buea, 2019)

✅ **Skills:**
- Embroidery (3 years, 2016-2019)
- Software engineering (Mr. Moses, 3 years, 2019-2022)
- Data structures, algorithms, HackerRank
- Tailoring (from mother)

✅ **Career:**
- WAZAHUB (backend developer, 2019-2020)
- Camsol Technologies (General Manager, 2022-2024, 600K/month)
- Independent contractor (2024-present, 300K/month)

✅ **Relationships:**
- Married Naomi (2021-2024) - Taught her to read, write, speak English & Arabic
- Married Fauzia Monyuy (February 2026-present)

✅ **Business:**
- Invested 7.1M+ FCFA into SuberCraftex (2022-2025)
- Launched SuberCraftex (January 27, 2026)
- 106 products, 405K FCFA investor deposits, 9 completed orders

✅ **Assets:**
- Starlink (essential for work)
- 1000W power station (essential for reliability)
- SuberCraftex platform (complete e-commerce with investor system)

---

**How many people your age can say they've married twice?**

**Look at what you've accomplished.**

**This is the hope that fuels you:**

*"See where I was and see how far I have come."*`,
        startDate: new Date('2014-05-08'),
        endDate: new Date('2026-01-27'),
        keyNumbers: {
          "embroidery_income": "3,000 FCFA/day",
          "calabou_rent": "10,000 FCFA/month",
          "camsol_salary": "600,000 FCFA/month",
          "subercraftex_investment": "7.1M+ FCFA",
          "monthly_savings": "~296,000 FCFA/month",
          "a_level_results": "5/5 passed",
          "marriages": "2 (Naomi 2021-2024, Fauzia 2026-present)"
        },
        tags: ['hope', 'education', 'embroidery', 'camsol', 'naomi', 'sophie', 'project-expansion', 'subercraftex', 'discipline'],
        isPrivate: true,
        rawDiaryExcerpt: `RAW STORY - THE HOPE (As told by Mohamad):

on the 08-05-2014 i started my a-level gce exams and on the 04-08-2014 the results came out. i passed all 5. biology b, chemistry d, pure maths b, further maths c, physics d. this was the happiest day of my life. after all what i have been through the past years i was finally a few steps of being independent. i choose sciences because the quran said read/recite. the first verse to be revealed to the prophet muhammad pbuh.

there was this girl nzotsa djoukeng sophie. i loved her with all my heart. i would do what every it takes to make her my wife. she was smart. she wrote 5 entrance exams (engineering, doctor, public works, etc) and passed all of them. i was poor not as smart had limited resources. how could i keep up. i could only afford one entrance exam cuss (medical doctor) the one she leaned towards most. i wrote it. i failed.

after failing cuss i stayed home for 1 year. i applied to study islam in medina saudi arabia. i needed my fathers signature i was underage. he refused. he told me consider i am dead. that year i farmed the traditional way (corn, beans, potatoes) to prepare for next year. lived in the village broke with my mum. ate when i could, sold in the market, did what i could. i reached a point i really did not care if i lived or died, if i ate or not, sleep or not. a man without a purpose. someone gave me advice mohamad if you do not stand for something you will fall for anything. i carried this very dear. and yet i had nothing. the year was finally ending. i attended preparatory classes. my plan either professional school or university. my conviction i am not to stay home again. concours results: 1. polytechnique yaounde failed 2. biochemistry at university of buea succeeded 3. computer engineering at university of buea succeeded (applied while doing biochemistry). for the first time i have a path again.

year 2 at university the anglophone crisis began. northwest and southwest cameroon. universities shut down. my mother told me you will drop out again because i cannot afford to pay your rent nor feed you in buea. for the first time i had to look for a job. i knew i could sew dresses learned from my mum. i learned embroidery from uncle awoudu visit. i worked. i earned my first cash. i was now in the independent line.

i worked with lady maggie for 3 years 2016-2019. the deal was 50-50 profit split. she provided thread, machine, rent for the business. i provided labor. i earned 3000fcfa per day. i rented a calabou house (locally made of wood) for 10000fcfa per month. work school home. after food school expenses and rent i was flat broke at the end of the year. i had a couple of friends but they had more stable lives. they wanted to command me around send me left and right. my nature refused to be used. you respect me i will respect you. those friendships didn't last.

i still talked with sophie during university. now that i could work i had income (small but something). i professed my love to her. i knew now that i can back it financially no matter how small it is. she rejected me. first heartbroken. then no purpose again. then anger i wanted to leave this world. everything summed up at once. i came from nothing and i am nothing now. i will build and i will leave this world. at first to leave means to be free from all this. as my faith grew in islam to leave means to explore the wonders of Allah. project expansion was born. from sophies rejection to spacecraft.

after graduation 2019 i quit embroidery after 3 years. mr moses besong senior software engineer mentored me for 3 years (4 ramadans passed). data structures algorithms hackerrank challenges. software engineering from scratch. i applied for jobs. series of applications. i got the job at camsol technologies around 2022. general manager. 600000fcfa per month. still living in my calabou wood house. first thing i did with money i moved my mother to a better home in yaounde. then i saved money to get married.

my reasoning was islam allows me to get married to multiple women and if i choose properly get married and train them to be generals at their own domains. together we will explore the wonders of Allah together. naomi adamou fridaousatu both parents had passed. could not read or write english. could not speak english. only sent to the farm never to school. i thought someone with this past would be angry at her past to make her future better. her relatives were jealous. such a girl that they never sent to school only to the farm happen to meet me successful manager of a company. they never wanted the marriage to happen. they took her away to a distant village (no electricity no network). when i traveled there they put her further into the land the crisis zone with separatists. i spent money time effort peace to get her out. once i got her out i married her.

for 3 years 2021-2024 constant threats. witchcraft threats. police locking me up threats. i made all authorities in buea know the situation to protect her. i personally taught her the alphabet read and write english read and write arabic. i paid for her evening school. i was hoping she would lead subercraftex. she started having friends listening to other advice. when i lost my job at camsol she left the house saying marriage was not her thing.

during my camsol years 2022-2024 about 24-30 months i earned 600000fcfa per month. i invested/saved about 296000fcfa per month into subercraftex. i lived on about 304000fcfa per month while supporting myself naomi my mother occasional rent expenses. i lived on roughly half my salary for 2 plus years straight. total invested into subercraftex 7.1m plus fcfa. that is incredible discipline.`
      },

      // SECTION 3: THE MISSION
      {
        personId: highCommander.id,
        sectionNumber: 3,
        sectionTitle: 'The Mission - Why You Keep Going',
        content: `# The Mission - Why You Keep Going

## Project Expansion: Born from Rejection (2017)

**The moment Sophie rejected you, Project Expansion was born.**

**The Vision:**
- Leave Earth
- Explore the wonders of Allah
- Travel the stars

**Not a metaphor. Not hyperbole. Literal.**

---

## The 30-Year Plan

### Phase 1: Foundation (Years 0-3) - CURRENT PHASE

**SuberCraftex - Fashion & Manufacturing:**
- ✅ Launched January 27, 2026 (3 months old)
- ✅ 106 products (105 active)
- ✅ 9 completed orders
- ✅ 6 investors KYC approved, 405K FCFA deposited
- ❌ Revenue: 0 FCFA (still in investment phase)

**SuberFood - Farm to Table:**
- Planning phase (documentation complete)
- Will provide food security for growing team
- Prototype for spacecraft life support systems

**Timeline:**
- **Year 1 Target:** 500+ products, 50 investors, break even
- **Year 2 Target:** 10M XAF/month revenue
- **Year 3 Target:** Launch SuberFood restaurants

### Phase 2: Manufacturing Foundations (Years 3-7)

**Smart Furniture:**
- IoT-enabled furniture
- Custom chip programming
- Establish semiconductor capabilities

**SuberFood Scale:**
- Multiple restaurant locations
- B2B portal
- E-commerce platform

### Phase 3: Automotive Entry (Years 7-12)

**Automotive Components:**
- Car electronics
- Custom automotive chips
- Complete vehicle assembly

**Target:** 100 vehicles/month production by Year 12

### Phase 4: Aerospace Components (Years 12-18)

**Enter Aerospace Industry:**
- Satellite components
- Spacecraft electronics
- Life support systems
- Complete spacecraft design

### Phase 5: Spacecraft Development (Years 18-25)

**Build the Spacecraft:**
- Assembly facility
- Component testing
- System integration
- Safety certifications
- Launch preparation

**Year 25: FIRST LAUNCH** 🚀

### Phase 6: Space Operations (Years 25-30+)

**Regular space operations**
**Manned missions**
**Traveling the stars** ✨

---

## The Organizational Structure

### High Commander and Chief
**Mohamad Siysinyuy Banbong**
**Age:** 31 (born December 2, 1994)
**At spacecraft launch:** 61 years old

### The 6 Generals

**General 0:** Technology Division (37 personnel planned)
**General 1:** SuberCraftex Operations (Fauzia Monyuy - candidate)
**General 2:** Finance & Legal
**General 3:** SuberFood (Farm & Agriculture)
**General 4:** Research & Development
**General 5:** Islamic Governance Framework
**General 6:** (Unassigned - future expansion)

**32 Departments**
**Scaling to hundreds of engineers over 30 years**

---

## The Original Strategy vs. Reality

### Original Strategy (2017-2024)

*"Islam allows me to get married to multiple women, and if I choose properly, get married and train them to be generals at their own domains. Together we will explore the wonders of Allah together."*

**The plan:** Multiple wives as generals, total loyalty through marriage.

### Experience Taught You (2024-2026)

**Naomi left when you lost your job.**
*"Marriage was not her thing."*

**Marriage ≠ guaranteed loyalty.**

### New Strategy (2026-present)

*"Look for the best people for the job and inspire loyalty. Put systems in place that will make them stay till the job is done. Not necessary wives anymore. Although I am open to any weapon to use."*

**Systems over sentiment.**
**Loyalty through structure, not just relationship.**

**Fauzia is still young (married February 2026). You think she will do fine. Hope, not certainty.**

---

## Islamic Governance: The Operating System

### Why Islam?

After extensive comparative religion studies (Christianity, Judaism, Hinduism, Buddhism), Islam was chosen based on **empirical evidence:**

**1. Running Government System**
- 1400+ years of proven implementation
- Successful governance across diverse cultures
- Established legal framework (Shariah)

**2. Unshakable Scripture**
- The Quran unchanged for 14+ centuries
- Provides unchanging constitutional foundation

**3. Complete Way of Life**
- Business ethics (no interest/riba, fair trade, transparency)
- Governance (consultation/Shura, justice/Adl, accountability)
- Personal conduct (prayer, charity/Zakat, fasting, pilgrimage)
- Economics (wealth distribution, prohibition of exploitation)

**4. Proven Longevity**
- Survived across geography (Morocco to Indonesia)
- Survived across cultures (Arab, Persian, Turkish, African, Asian)
- Still growing (1.8+ billion adherents)

### Business Implementation

**SuberCraftex Investor Model = Islamic Finance:**
- No interest (riba prohibited)
- Profit-sharing (50-50 split)
- Equipment co-ownership = Musharakah (partnership)
- Product funding = Murabaha (cost-plus financing without interest)

**SuberFood Halal Standards:**
- All food production must be halal
- No pork, alcohol, prohibited substances
- Humane animal treatment
- Blessed slaughter (Zabiha)

**Daily Operations:**
- 5 daily prayers accommodated
- Friday Jummah prayer facilitated
- Ramadan schedule adjustments
- Zakat (2.5% wealth annually to those in need)

### Long-Term: Space Governance

**Ethical Framework for Space:**
- Treatment of new environments (environmental stewardship)
- Approach to potential alien life (respect for all creation)
- Resource extraction ethics (no exploitation)
- Settlement governance (just systems)

**Cultural Preservation:**
- Maintaining Islamic identity across generations
- Prayer direction in space (Qibla determination)
- Fasting and holidays in different planetary cycles
- Community and family structures in settlements

**Purpose & Meaning:**
- Why explore space? **To understand Allah's creation**
- Responsibility as stewards of Earth and beyond
- Knowledge seeking as worship (Ilm)

---

## The Current Reality (April 23, 2026)

### Income
**Abba Abdouraman Contract:** 300K XAF/month (UNSTABLE)

### Expenses
**Monthly burn:** 238.6K XAF/month
- Office Rent (Home): 70K
- Food & Groceries: 50K
- Starlink Internet: 30K (essential for work)
- VPS Hosting: 18.6K
- MTN Home Box Data: 15K
- Claude AI Pro (2 accounts): 24K (essential for development)
- Electricity: 10K
- Water: 10K
- Namecheap Domains: 6K
- Wife's Allowance: 5K

### Profit
**Monthly:** +61.4K XAF (20.5% margin)

### Assets
- SuberCraftex platform (7.1M+ FCFA invested)
- Starlink (30K/month subscription)
- 1000W power station
- Fauzia (2 months in, hope for General 1)

### Liabilities
**Debt:** 2.5M FCFA
- Borrowed from Camsol owners (in Germany)
- No interest
- Repayment terms: TBD
- What it paid for: Wedding, Starlink, power station, rent
- Fauzia knows everything

### SuberCraftex Performance
- Revenue: 0 FCFA
- Investor deposits: 405K FCFA
- Products: 106 (105 active)
- Orders: 9 completed
- Status: Investment phase, not profitable yet

### The Math
**At 61.4K/month profit:**
- 41 months (3.4 years) to pay off 2.5M debt
- 4+ months to save 250K for recording equipment
- **Cannot do both simultaneously**
- **One contract cancellation away from December 2024 again**

---

## Why This Mission Matters

### From the Quran:

*"And it is He who created the night and the day and the sun and the moon; all [heavenly bodies] in an orbit are swimming."* - Quran 21:33

*"We will show them Our signs in the horizons and within themselves until it becomes clear to them that it is the truth."* - Quran 41:53

### From Your Life:

You went from:
- **Eating rat meat** → Building spacecraft
- **50 FCFA puff puff** → 7.1M FCFA business
- **Father saying "consider me dead"** → Leading 6 Generals
- **Gastric from no protein** → Starlink and power station
- **Calabou house, 10K/month** → Project Expansion
- **"I am nothing now"** (Sophie's rejection) → **"I will leave this world"** (to explore Allah's wonders)

**You didn't come this far to only come this far.**

---

## The Timeline Feels Impossible

**You're 31 years old.**
**30-year mission.**
**Spacecraft launch when you're 61.**

**Current reality:**
- 3 months into SuberCraftex
- 0 revenue
- 2.5M debt
- 61.4K/month profit
- Unstable income
- Fauzia unproven (2 months in)
- No generals yet
- Need recording equipment (250K) to scale
- Need another revenue source FAST

**But you've been here before:**
- Form 5 repeat (impossible odds)
- Frozen year (no purpose, no path)
- Sophie's rejection (broken, angry, wanted to leave Earth)
- Camsol closure (sued, Naomi left, 2.5M debt)

**You survived. You rebuilt. You're still here.**

---

## The Mission is Bigger Than the Moment

**This is not a startup.**
**This is not a business plan.**
**This is a 30-year mission to reach the stars.**

You start where you are:
- ✅ One person (High Commander Mohamad)
- ✅ One unstable contract (300K XAF/month)
- ✅ One operational platform (SuberCraftex)
- ✅ Profitability (+61.4K XAF/month)
- ✅ A clear vision (travel the stars)
- ✅ A proven model (investor profit-sharing)
- ✅ A solid foundation (Islamic governance)
- ✅ Debt (2.5M) but no interest
- ✅ Hope (Fauzia, still young, might work)

You build systematically:
- **Fashion** → Proves e-commerce model
- **Smart Furniture** → Proves manufacturing & IoT
- **Cars** → Proves complex manufacturing
- **Spacecraft** → Achieves the mission

You fund through revenue:
- SuberCraftex generates manufacturing cash flow
- SuberFood generates massive food revenue
- Investors participate in profits
- No equity dilution

You maintain coherence through Islam:
- Ethical business practices
- Team unity and purpose
- Long-term thinking
- Justice and mercy

**You will travel the stars, InshAllah (God willing).** 🌟

**But you start by selling t-shirts.**

**And that's exactly how it should be.**

---

*"To the stars, with faith, knowledge, and systematic effort."* 🚀✨☪️`,
        startDate: new Date('2017-01-01'),
        endDate: new Date('2056-12-31'),
        keyNumbers: {
          "current_age": "31 (born Dec 2, 1994)",
          "mission_duration": "30 years",
          "age_at_launch": "61 years old",
          "current_profit": "61.4K XAF/month",
          "current_debt": "2.5M FCFA (0% interest)",
          "subercraftex_investment": "7.1M+ FCFA",
          "investor_deposits": "405K FCFA",
          "current_revenue": "0 FCFA (investment phase)",
          "time_to_clear_debt": "41 months (3.4 years) at current profit"
        },
        tags: ['mission', 'project-expansion', 'spacecraft', 'islam', 'subercraftex', 'suberfood', '30-year-plan', 'generals'],
        isPrivate: true,
        rawDiaryExcerpt: `RAW STORY - THE MISSION (As told by Mohamad):

the moment sophie rejected me project expansion was born. the vision leave earth explore the wonders of allah travel the stars. not a metaphor not hyperbole literal. this is a 30 year mission. i am 31 years old now. i will be 61 at spacecraft launch.

current reality april 23 2026. abba abdouraman contract 300k xaf per month unstable. monthly expenses 238.6k xaf per month. office rent home 70k. food and groceries 50k. starlink internet 30k essential for work. vps hosting 18.6k. mtn home box data 15k. claude ai pro 2 accounts 24k essential for development. electricity 10k. water 10k. namecheap domains 6k. wife allowance 5k. monthly profit plus 61.4k xaf 20.5 percent margin. debt 2.5m fcfa borrowed from camsol owners in germany no interest repayment terms tbd. what it paid for wedding starlink power station rent. fauzia knows everything. at 61.4k per month profit 41 months 3.4 years to pay off 2.5m debt. 4 plus months to save 250k for recording equipment. cannot do both simultaneously. one contract cancellation away from december 2024 again.

subercraftex launched january 27 2026. 3 months old as of april 2026. revenue 0 fcfa. investor deposits 405k fcfa. products 106 105 active. orders 9 completed. status investment phase not profitable yet. total invested 7.1m plus fcfa from camsol savings years 2022 to 2024.

my original strategy 2017 to 2024 was islam allows me to get married to multiple women and if i choose properly get married and train them to be generals at their own domains. together we will explore the wonders of Allah together. the plan multiple wives as generals total loyalty through marriage. experience taught me 2024 to 2026 naomi left when i lost my job. marriage was not her thing. marriage does not equal guaranteed loyalty. new strategy 2026 to present look for the best people for the job and inspire loyalty. put systems in place that will make them stay till the job is done. not necessary wives anymore. although i am open to any weapon to use. systems over sentiment. loyalty through structure not just relationship. fauzia is still young married february 2026. i think she will do fine. hope not certainty.

islamic governance why islam. after extensive comparative religion studies christianity judaism hinduism buddhism islam was chosen based on empirical evidence. 1. running government system 1400 plus years of proven implementation successful governance across diverse cultures established legal framework shariah. 2. unshakable scripture the quran unchanged for 14 plus centuries provides unchanging constitutional foundation. 3. complete way of life business ethics no interest riba fair trade transparency. governance consultation shura justice adl accountability. personal conduct prayer charity zakat fasting pilgrimage. economics wealth distribution prohibition of exploitation. 4. proven longevity survived across geography morocco to indonesia. survived across cultures arab persian turkish african asian. still growing 1.8 plus billion adherents.

subercraftex investor model is islamic finance. no interest riba prohibited. profit sharing 50 50 split. equipment co ownership musharakah partnership. product funding murabaha cost plus financing without interest. suberfood halal standards all food production must be halal. no pork alcohol prohibited substances. humane animal treatment. blessed slaughter zabiha. daily operations 5 daily prayers accommodated. friday jummah prayer facilitated. ramadan schedule adjustments. zakat 2.5 percent wealth annually to those in need.

long term space governance ethical framework for space. treatment of new environments environmental stewardship. approach to potential alien life respect for all creation. resource extraction ethics no exploitation. settlement governance just systems. cultural preservation maintaining islamic identity across generations. prayer direction in space qibla determination. fasting and holidays in different planetary cycles. community and family structures in settlements. purpose and meaning why explore space to understand allahs creation. responsibility as stewards of earth and beyond. knowledge seeking as worship ilm.

from the quran and it is he who created the night and the day and the sun and the moon all heavenly bodies in an orbit are swimming quran 21 33. we will show them our signs in the horizons and within themselves until it becomes clear to them that it is the truth quran 41 53. from my life i went from eating rat meat to building spacecraft. from 50 fcfa puff puff to 7.1m fcfa business. from father saying consider me dead to leading 6 generals. from gastric from no protein to starlink and power station. from calabou house 10k per month to project expansion. from i am nothing now sophies rejection to i will leave this world to explore allahs wonders. i did not come this far to only come this far.

the timeline feels impossible. im 31 years old. 30 year mission. spacecraft launch when im 61. current reality 3 months into subercraftex. 0 revenue. 2.5m debt. 61.4k per month profit. unstable income. fauzia unproven 2 months in. no generals yet. need recording equipment 250k to scale. need another revenue source fast. but ive been here before. form 5 repeat impossible odds. frozen year no purpose no path. sophies rejection broken angry wanted to leave earth. camsol closure sued naomi left 2.5m debt. i survived. i rebuilt. im still here.

this is not a startup. this is not a business plan. this is a 30 year mission to reach the stars. i start where i am one person high commander mohamad. one unstable contract 300k xaf per month. one operational platform subercraftex. profitability plus 61.4k xaf per month. a clear vision travel the stars. a proven model investor profit sharing. a solid foundation islamic governance. debt 2.5m but no interest. hope fauzia still young might work. i build systematically fashion proves e commerce model. smart furniture proves manufacturing and iot. cars proves complex manufacturing. spacecraft achieves the mission. i fund through revenue subercraftex generates manufacturing cash flow. suberfood generates massive food revenue. investors participate in profits. no equity dilution. i maintain coherence through islam ethical business practices team unity and purpose long term thinking justice and mercy. i will travel the stars inshallah god willing. but i start by selling t shirts. and that is exactly how it should be. to the stars with faith knowledge and systematic effort.`
      },

      // SECTION 4: THE FUEL
      {
        personId: highCommander.id,
        sectionNumber: 4,
        sectionTitle: 'The Fuel - Read This When You\'re Empty',
        content: `# The Fuel - Read This When You're Empty

## When You're Running Out of Fuel, Remember This:

---

## THE ANGER

*"Being poor is so not where I am going to, I have to make it, all what I went through was just because I did not have money, it make me so angry I am willing to keep moving on my path forward"*

### What The Poverty Did To You

**It made you powerless.**

- You couldn't stop the physical fight between your mother and your father's second wife
- You couldn't afford textbooks, only fees and uniform
- You couldn't afford protein, so you got gastric
- You had to eat rat meat at BERIKIDS because you had no choice
- You couldn't keep up with Sophie (she was smart and passed all 5 entrance exams, you could only afford one and failed)
- You had to live in a calabou house for 10,000 FCFA/month
- You had to make 3,000 FCFA/day sewing embroidery just to survive
- Your father promised 3,000 FCFA and only gave 1,000, and you never forgot
- You had to repeat Form 5 because you had no power to fight Mrs. Rilindis and Mr. Tany
- They looked at you like "a small devil" and you had to swallow it

**Being poor made you powerless.**

**You will NEVER be powerless again.**

---

## THE HOPE

*"See where I was and see how far I have come. How many in my age can say they have married twice, not to talk of what I have accomplished, you can see all the assets I have on mission control"*

### Where You Were

**2011-2012:**
- Selling puff puff for 50 FCFA each
- Gastric from lack of protein
- Eating rat meat
- Calabou house, 10,000 FCFA/month
- 3,000 FCFA/day embroidery
- Failed GCE 2011 (4/10 papers)
- Repeat Form 5
- "A small devil" in their eyes
- No purpose, no path

**2014-2015:**
- Failed CUSS entrance exam
- Father said "Consider me dead"
- Frozen year
- Farming corn, beans, potatoes
- "I really did not care if I lived or died"
- "A man without a purpose"

**2017:**
- Sophie rejected you
- "I came from nothing and I am nothing now"
- Wanted to leave this world

**December 2024:**
- Camsol closed
- Employees sued you
- Went into 2.5M debt
- Naomi left ("marriage was not her thing")

### Where You Are Now (April 2026)

**Assets:**
- 7.1M+ FCFA invested into SuberCraftex
- SuberCraftex platform (launched Jan 27, 2026)
- 106 products
- 405K FCFA investor deposits
- 9 completed orders
- Starlink (essential infrastructure)
- 1000W power station (essential infrastructure)
- Fauzia (married Feb 2026, knows everything, hope for General 1)

**Income:**
- 300K XAF/month (Abba contract, unstable but active)
- +61.4K XAF/month PROFIT (while carrying 2.5M debt)

**Skills:**
- Embroidery (3 years)
- Software engineering (Mr. Moses 3 years, Camsol 2 years)
- General Manager experience
- Built Naomi from illiterate to educated
- Built SuberCraftex from zero to operational in 3 months

**Accomplishments by Age 31:**
- ✅ Survived poverty
- ✅ Survived divorce (parents)
- ✅ Survived BERIKIDS
- ✅ Survived gastric (cured yourself)
- ✅ Passed A-Level (5/5)
- ✅ Bachelor's in Computer Engineering
- ✅ WAZAHUB backend developer
- ✅ Camsol General Manager (600K/month)
- ✅ Saved 7.1M+ FCFA while living on half salary
- ✅ Married twice (Naomi 2021-2024, Fauzia 2026-present)
- ✅ Launched SuberCraftex (Jan 27, 2026)
- ✅ Survived lawsuit and company closure
- ✅ Rebuilt in 3 months (Dec 2024 crash → Jan 2026 launch)
- ✅ Still profitable (+61.4K/month) while 2.5M in debt

**How many people your age can say they've done that?**

---

## THE FAITH

### From the Quran:

*"Read! In the name of your Lord who created."* - Quran 96:1 (First verse revealed)

**That's why you chose science. That's why you're exploring.**

*"And it is He who created the night and the day and the sun and the moon; all [heavenly bodies] in an orbit are swimming."* - Quran 21:33

**That's why you're building spacecraft.**

*"We will show them Our signs in the horizons and within themselves until it becomes clear to them that it is the truth."* - Quran 41:53

**That's why you're going to the stars - to see Allah's signs in the horizons.**

### From Your Father:

He taught you the hadith:

**Respect your mother THREE TIMES before your father.**

When your mother left and told you to stay with your father, **you remembered the hadith.**

**You chose your mother.**

Your father said "Consider me dead."

**You built this empire without him.**

He taught you Islam, then rejected you.

**Islam sustained you when he didn't.**

---

## THE PROOF - YOU'VE SURVIVED WORSE

### You've Been Here Before

**Form 5 Repeat (2011-2012):**
- Failed 6/10 papers
- Forced to repeat
- Looked at like "a small devil"
- **Result:** Passed 10/11 papers in 2012, passed 5/5 A-Level in 2014

**Frozen Year (2014-2015):**
- Failed CUSS
- Father said "Consider me dead"
- No purpose, no path, didn't care if you lived or died
- **Result:** Got into University of Buea, Computer Engineering

**Sophie's Rejection (2017):**
- "I came from nothing and I am nothing now"
- Wanted to leave this world
- **Result:** Project Expansion was born - 30-year mission to spacecraft

**Camsol Closure (December 2024):**
- Company closed
- Sued by employees
- Naomi left
- 2.5M debt
- **Result:** SuberCraftex launched 1 month later (Jan 27, 2026), still profitable 4 months later

**You've done impossible things before. You'll do them again.**

---

## THE CURRENT STRUGGLE - ALL OF THE ABOVE

✅ **Debt pressure** - 2.5M FCFA (41 months to clear at current rate)
✅ **Financial trap** - Can't invest in growth (250K equipment) while paying debt
✅ **Loneliness** - Carrying Project Expansion alone, no proven generals yet
✅ **Time pressure** - Age 31, need 30 years, you'll be 61 at spacecraft launch
✅ **Exhaustion** - Built from nothing → Camsol success → Dec 2024 crash → Rebuilt in 3 months → Now in debt
✅ **Fear** - What if Fauzia leaves like Naomi? What if Abba contract ends? What if you can't pay the debt? What if you fail?
✅ **Revenue urgency** - SuberCraftex has 0 revenue, need another source FAST
✅ **Equipment need** - Need 250K for recording equipment to scale but can't afford it yet

**This is heavy. This is real. This is NOW.**

---

## WHAT TO DO WHEN THE FUEL RUNS OUT

### 1. Remember The Anger

**Being poor made you powerless.**

- Rat meat
- Gastric
- "Small devil"
- Father's 2,000 FCFA
- "Consider me dead"
- Sophie's rejection
- Naomi leaving when you lost your job

**You will NEVER be powerless again.**

**Let that anger fuel you.**

### 2. Remember The Hope

**Look at what you've built:**

From 50 FCFA puff puff to 7.1M FCFA business.
From calabou house to Starlink and power station.
From "nothing now" to SuberCraftex launched.
From sued and broken to 61.4K/month profit while 2.5M in debt.

**You've come impossibly far.**

### 3. Remember The Faith

**The Quran said "Read/Recite."**

You're reading Allah's creation. You're exploring the horizons. You're seeing the signs.

**This mission is worship.**

### 4. Remember The Proof

**You've survived:**
- Form 5 repeat → Passed 10/11
- Frozen year → University
- Sophie's rejection → Project Expansion
- Camsol closure → SuberCraftex launch

**Every time you thought it was over, you rebuilt.**

**This time is no different.**

### 5. Look At The Mission Control Assets

**Open your dashboard. Look at:**
- 6 Generals (being recruited)
- 32 Departments (structured)
- SuberCraftex (live, operational, 106 products)
- 405K FCFA investor deposits (people believe in you)
- Fauzia (knows everything, still here)
- Starlink (you can work from anywhere)
- Power station (you're not dependent on grid)
- +61.4K/month profit (while carrying 2.5M debt)

**You're not starting from zero. You're building on a foundation.**

---

## THE BRUTAL TRUTH YOU NEED TO FACE

**Current Reality (April 23, 2026):**

**Income:** 300K/month (unstable)
**Expenses:** 238.6K/month
**Profit:** 61.4K/month
**Debt:** 2.5M (no interest)
**SuberCraftex Revenue:** 0
**Time to clear debt:** 41 months (if you save every penny)
**Time to buy equipment:** 4+ months (if you save every penny)
**You can't do both**

**You need another revenue source FAST.**

**The Abba contract could end anytime.**

**You're one contract cancellation away from December 2024 again.**

---

## BUT ALSO THE BRUTAL TRUTH THAT GIVES HOPE

**You're 61.4K/month profitable while carrying 2.5M debt.**

**Most people in 2.5M debt are LOSING money.**

**You're MAKING money.**

**You went from Camsol closure (December 2024) to SuberCraftex launch (January 2026) in ONE MONTH.**

**You went from 600K/month income to 0 to 300K/month in 2 months.**

**You've rebuilt before. You're rebuilding now.**

---

## WHAT YOU NEED TO DO NOW

**Immediate (Next 30 Days):**
1. **Secure the Abba contract** - Make it stable or find replacement
2. **Find second revenue source** - Cannot depend on one unstable contract
3. **Get recording equipment** - 250K needed, explore options (investor? loan? client prepayment?)
4. **Start content production** - This will drive SuberCraftex revenue
5. **Track Fauzia's progress** - Is she learning? Is she engaged? Is she staying?

**Short-Term (Next 90 Days):**
1. **SuberCraftex first revenue** - Even 100K/month changes everything
2. **Pay down debt** - Even 200K reduces psychological weight
3. **Recruit first general** - You can't do this alone
4. **Build systems** - So people stay even if relationships fail

**Long-Term (30 Years):**
1. **Stay alive** - Literally, don't burn out
2. **Stay profitable** - Even 61.4K/month is progress
3. **Stay building** - Fashion → Furniture → Cars → Spacecraft
4. **Stay faithful** - To Allah, to the mission, to yourself

---

## THE FINAL WORD

**You didn't come this far to only come this far.**

**From rat meat to spacecraft.**
**From "consider me dead" to 6 Generals.**
**From 50 FCFA puff puff to 7.1M FCFA business.**
**From "I am nothing now" to "I will leave this world" (to explore Allah's wonders).**

**You've been broken before.**
**You've been powerless before.**
**You've been angry before.**
**You've been hopeless before.**

**And every time, you rebuilt.**

**This time is no different.**

---

## When You're Out of Fuel, Remember:

**ANGER:** Being poor is NOT where you're going
**HOPE:** See where you were, see how far you've come
**FAITH:** The Quran said "Read" - you're exploring Allah's creation
**PROOF:** You've survived worse
**MISSION:** 30 years, spacecraft, stars, InshAllah

**You will travel the stars.**

**But first, you need to survive this month.**

**And you will.**

**Because you always have.**

---

*"To the stars, with faith, knowledge, and systematic effort."* 🚀✨☪️

**Now close this biography, open your Mission Control dashboard, and get back to work.**

**You have a spacecraft to build.**`,
        startDate: new Date('2026-04-23'),
        endDate: null,
        keyNumbers: {
          "current_profit": "61.4K XAF/month",
          "current_debt": "2.5M FCFA (0% interest)",
          "months_to_clear_debt": "41 months",
          "subercraftex_revenue": "0 FCFA",
          "equipment_needed": "250K FCFA",
          "months_to_equipment": "4+ months",
          "income_stability": "UNSTABLE (Abba contract)",
          "urgency": "Need second revenue source FAST"
        },
        tags: ['fuel', 'anger', 'hope', 'faith', 'proof', 'current-struggle', 'action-needed'],
        isPrivate: true,
        rawDiaryExcerpt: `RAW STORY - THE FUEL (As told by Mohamad):

being poor is so not where i am going to i have to make it all what i went through was just because i did not have money it make me so angry i am willing to keep moving on my path forward. this is the anger.

see where i was and see how far i have come. how many in my age can say they have married twice not to talk of what i have accomplished you can see all the assets i have on mission control. this is the hope.

from where i was 2011 to 2012 selling puff puff for 50 fcfa each. gastric from lack of protein. eating rat meat. calabou house 10000 fcfa per month. 3000 fcfa per day embroidery. failed gce 2011 4 out of 10 papers. repeat form 5. a small devil in their eyes. no purpose no path. 2014 to 2015 failed cuss entrance exam. father said consider me dead. frozen year. farming corn beans potatoes. i really did not care if i lived or died. a man without a purpose. 2017 sophie rejected me. i came from nothing and i am nothing now. wanted to leave this world. december 2024 camsol closed. employees sued me. went into 2.5m debt. naomi left marriage was not her thing.

where i am now april 2026. assets 7.1m plus fcfa invested into subercraftex. subercraftex platform launched jan 27 2026. 106 products. 405k fcfa investor deposits. 9 completed orders. starlink essential infrastructure. 1000w power station essential infrastructure. fauzia married feb 2026 knows everything hope for general 1. income 300k xaf per month abba contract unstable but active. plus 61.4k xaf per month profit while carrying 2.5m debt. skills embroidery 3 years. software engineering mr moses 3 years camsol 2 years. general manager experience. built naomi from illiterate to educated. built subercraftex from zero to operational in 3 months.

what i accomplished by age 31. survived poverty. survived divorce parents. survived berikids. survived gastric cured myself. passed a level 5 out of 5. bachelors in computer engineering. wazahub backend developer. camsol general manager 600k per month. saved 7.1m plus fcfa while living on half salary. married twice naomi 2021 to 2024 fauzia 2026 to present. launched subercraftex jan 27 2026. survived lawsuit and company closure. rebuilt in 3 months dec 2024 crash to jan 2026 launch. still profitable plus 61.4k per month while 2.5m in debt. how many people my age can say theyve done that.

i have survived worse. form 5 repeat 2011 to 2012 failed 6 out of 10 papers. forced to repeat. looked at like a small devil. result passed 10 out of 11 papers in 2012 passed 5 out of 5 a level in 2014. frozen year 2014 to 2015 failed cuss. father said consider me dead. no purpose no path didnt care if i lived or died. result got into university of buea computer engineering. sophies rejection 2017 i came from nothing and i am nothing now. wanted to leave this world. result project expansion was born 30 year mission to spacecraft. camsol closure december 2024 company closed. sued by employees. naomi left. 2.5m debt. result subercraftex launched 1 month later jan 27 2026 still profitable 4 months later. ive done impossible things before ill do them again.

the current struggle all of the above. debt pressure 2.5m fcfa 41 months to clear at current rate. financial trap cant invest in growth 250k equipment while paying debt. loneliness carrying project expansion alone no proven generals yet. time pressure age 31 need 30 years ill be 61 at spacecraft launch. exhaustion built from nothing to camsol success to dec 2024 crash to rebuilt in 3 months to now in debt. fear what if fauzia leaves like naomi what if abba contract ends what if i cant pay the debt what if i fail. revenue urgency subercraftex has 0 revenue need another source fast. equipment need need 250k for recording equipment to scale but cant afford it yet. this is heavy this is real this is now.

when the fuel runs out remember the anger. being poor made me powerless. rat meat. gastric. small devil. fathers 2000 fcfa. consider me dead. sophies rejection. naomi leaving when i lost my job. i will never be powerless again. let that anger fuel me. remember the hope. look at what ive built. from 50 fcfa puff puff to 7.1m fcfa business. from calabou house to starlink and power station. from nothing now to subercraftex launched. from sued and broken to 61.4k per month profit while 2.5m in debt. ive come impossibly far. remember the faith. the quran said read recite. im reading allahs creation. im exploring the horizons. im seeing the signs. this mission is worship. remember the proof. ive survived form 5 repeat to passed 10 out of 11. frozen year to university. sophies rejection to project expansion. camsol closure to subercraftex launch. every time i thought it was over i rebuilt. this time is no different.

the brutal truth i need to face. current reality april 23 2026. income 300k per month unstable. expenses 238.6k per month. profit 61.4k per month. debt 2.5m no interest. subercraftex revenue 0. time to clear debt 41 months if i save every penny. time to buy equipment 4 plus months if i save every penny. i cant do both. i need another revenue source fast. the abba contract could end anytime. im one contract cancellation away from december 2024 again. but also the brutal truth that gives hope. im 61.4k per month profitable while carrying 2.5m debt. most people in 2.5m debt are losing money. im making money. i went from camsol closure december 2024 to subercraftex launch january 2026 in one month. i went from 600k per month income to 0 to 300k per month in 2 months. ive rebuilt before. im rebuilding now.

i didnt come this far to only come this far. from rat meat to spacecraft. from consider me dead to 6 generals. from 50 fcfa puff puff to 7.1m fcfa business. from i am nothing now to i will leave this world to explore allahs wonders. ive been broken before. ive been powerless before. ive been angry before. ive been hopeless before. and every time i rebuilt. this time is no different.

when im out of fuel remember anger being poor is not where im going. hope see where i was see how far ive come. faith the quran said read im exploring allahs creation. proof ive survived worse. mission 30 years spacecraft stars inshallah. i will travel the stars. but first i need to survive this month. and i will. because i always have. to the stars with faith knowledge and systematic effort. now close this biography open mission control dashboard and get back to work. i have a spacecraft to build.`
      }
    ];

    console.log('Creating biography sections...\n');

    for (const section of bioSections) {
      const created = await BiographySection.create(section);
      console.log(`✅ Created Section ${created.sectionNumber}: ${created.sectionTitle}`);
    }

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ HIGH COMMANDER BIOGRAPHY CREATED SUCCESSFULLY! ✨');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📖 Biography Sections:`);
    console.log(`   Section 1: Where You Came From - The Anger (1994-2012)`);
    console.log(`   Section 2: What You Built - The Hope (2014-2026)`);
    console.log(`   Section 3: The Mission - Why You Keep Going (2017-2056)`);
    console.log(`   Section 4: The Fuel - Read This When You're Empty (NOW)`);
    console.log(`\n💾 All sections saved to database`);
    console.log(`🔒 All sections marked private (only visible to High Commander)`);
    console.log(`\n🎯 Next: Run migration and deploy to server\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating biography:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

seedHighCommanderBiography();
