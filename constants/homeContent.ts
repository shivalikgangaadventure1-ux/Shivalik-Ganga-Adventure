/**
 * Homepage SEO copy supplied by the SEO consultant. Kept here (not inline in JSX)
 * so wording can be edited without touching layout code. Route facts (distance,
 * duration, grade, price) are NOT duplicated here, they come from PACKAGES.
 */
import type { PackageFAQ } from "./packages";

export interface TitledPoint {
  title: string;
  text: string;
}

export const PREPARATION_POINTS: TitledPoint[] = [
  {
    title: "Trained River Guides",
    text: "Your guide leads the group through the route, gives paddling instructions and helps you understand what to expect as the river changes.",
  },
  {
    title: "Safety-Focused Equipment",
    text: "Essential rafting equipment, including life jackets and helmets, is provided for participants and should be used according to the guide's instructions.",
  },
  {
    title: "Routes for Different Experiences",
    text: "You don't have to choose the longest route simply because it's the longest. Compare the distance, approximate duration and rapid grade, then choose an experience that suits your group.",
  },
  {
    title: "Clear Package Information",
    text: "Before booking, you can compare the route, distance, approximate duration and listed price. Contact our team to confirm current availability, pricing and package details.",
  },
  {
    title: "Experience the Himalayas from the River",
    text: "River rafting in Rishikesh gives you a completely different view of the area: moving water, forested riverbanks, mountain scenery and stretches where you can simply enjoy being outdoors.",
  },
];

/** Per-route blurbs from the SEO doc, keyed by package slug. */
export const ROUTE_COPY: Record<string, { lead: string; body: string[] }> = {
  "brahmpuri-to-nim-beach": {
    lead: "Looking for a shorter introduction to river rafting in Rishikesh?",
    body: [
      "The Brahmpuri route gives you a chance to experience the Ganga without committing to one of the longer stretches. You'll paddle with your group, enjoy the river scenery and experience smaller rapids along the way.",
      "It can be a suitable option for first-time rafters and families who meet the applicable requirements.",
    ],
  },
  "club-house-to-nim-beach": {
    lead: "Want a little more time on the river?",
    body: [
      "The Club House route extends the journey while staying at Grade II. It's an option for visitors who want something beyond the shortest rafting experience.",
      "You'll have more time to paddle, enjoy the surrounding landscape and experience the changing character of the Ganga.",
      "Route operation and suitability depend on current river conditions and applicable requirements.",
    ],
  },
  "shivpuri-to-nim-beach": {
    lead: "For a longer and more active Rishikesh rafting experience, the Shivpuri route covers approximately 16 kilometres of the Ganga.",
    body: [
      "You'll move between rapids and calmer stretches, with plenty of time to enjoy the surrounding landscape.",
      "Grade III rapids require attention, teamwork and the ability to follow your guide's instructions.",
    ],
  },
  "marine-drive-to-nim-beach": {
    lead: "If you want to spend more of your day on the river, Marine Drive rafting offers a longer journey through the Ganga.",
    body: [
      "The route combines moving water, rapids and quieter stretches where you can take in the scenery around you.",
      "Ask our team about current availability, operating conditions and suitability before booking.",
    ],
  },
  "kaudiyala-to-nim-beach": {
    lead: "Looking for a longer and more demanding river adventure?",
    body: [
      "The Kaudiyala rafting route covers approximately 32 kilometres and includes Grade IV rapids.",
      "This is a more challenging option and should only be considered by participants who meet the operator's requirements and are suitable for the current conditions. Confirm the current operating status, eligibility and safety arrangements before booking.",
    ],
  },
};

export const ROUTE_CHOICE_FACTORS = [
  "How much time you have",
  "Your previous rafting experience",
  "The rapid grade",
  "Your physical ability",
  "Your group's comfort level",
  "Current river and weather conditions",
];

export const SAFETY_POINTS: TitledPoint[] = [
  {
    title: "Wear the Right Safety Equipment",
    text: "Participants are provided with essential rafting equipment, including life jackets and helmets. Equipment should fit properly and be used according to your guide's instructions.",
  },
  {
    title: "Listen During the Safety Briefing",
    text: "Before entering the river, make sure you understand the basic paddling commands, safety instructions and what your guide expects from the group.",
  },
  {
    title: "Choose a Suitable Route",
    text: "Your route should match your experience, physical ability and the rapid grade. A longer or more difficult route isn't automatically the better choice.",
  },
  {
    title: "Respect River Conditions",
    text: "Weather, water levels and official directions can affect rafting operations. A route may be changed, delayed or cancelled when conditions make it unsuitable.",
  },
  {
    title: "Ask Before You Book",
    text: "If you're unsure about the route, clothing, eligibility, equipment or what's included, ask our team before confirming your trip.",
  },
];

export const TRIP_STEPS: TitledPoint[] = [
  {
    title: "Choose Your Route",
    text: "Compare the available distances, approximate durations, rapid grades and Rishikesh rafting prices.",
  },
  {
    title: "Tell Us Your Plans",
    text: "Share your preferred date, group size and the kind of rafting experience you're looking for.",
  },
  {
    title: "Confirm Availability",
    text: "Contact our team to check the current availability, price, eligibility requirements and booking details.",
  },
  {
    title: "Arrive Prepared",
    text: "Follow the instructions provided for your trip and listen carefully during the safety briefing.",
  },
  {
    title: "Get on the Ganga",
    text: "Gear up, take your place in the raft and get ready to paddle.",
  },
  {
    title: "Enjoy the Journey",
    text: "Follow your guide, work with your group and enjoy the rapids, calmer stretches and scenery along the way.",
  },
  {
    title: "Finish at Nim Beach",
    text: "Complete your rafting journey at Nim Beach with a few good stories to take home.",
  },
];

export const HOME_FAQS: PackageFAQ[] = [
  {
    question: "How Much Does River Rafting Cost in Rishikesh?",
    answer:
      "Our currently listed Rishikesh rafting prices range from ₹599 to ₹2,499, depending on the route. Brahmpuri starts at ₹599, Club House at ₹699, Shivpuri at ₹799, Marine Drive at ₹1,199 and Kaudiyala at ₹2,499. Contact us to confirm the current price, availability and package inclusions before booking.",
  },
  {
    question: "Which River Rafting Route Is Best in Rishikesh?",
    answer:
      "There isn't one route that's best for everyone. Your choice should depend on your experience, physical ability, available time and comfort with the rapid grade. Shorter routes may suit beginners, while longer routes can offer a more demanding river rafting experience in Rishikesh.",
  },
  {
    question: "Is White Water Rafting in Rishikesh Safe for Beginners?",
    answer:
      "Suitable beginner routes can be an option for people who are new to rafting, provided they meet the applicable requirements and follow the safety instructions. Rafting is still a natural adventure activity with inherent risks, so listen carefully to your guide and choose a route suitable for your ability.",
  },
  {
    question: "What Is the Age Limit for River Rafting in Rishikesh?",
    answer:
      "Eligibility can depend on the route, river conditions, applicable safety requirements and operator guidelines. Because requirements can change, confirm the current age and eligibility rules for your selected route before booking.",
  },
  {
    question: "Do I Need Previous Rafting Experience?",
    answer:
      "Previous experience isn't necessarily required for suitable beginner routes. However, participants should meet the applicable requirements, be comfortable following instructions and choose a route appropriate for their ability.",
  },
  {
    question: "How Long Does Rishikesh River Rafting Take?",
    answer:
      "It depends on the route. Our listed experiences range from approximately 2 hours for Brahmpuri to a full-day experience for Kaudiyala. Actual timings can vary with river conditions and operational arrangements.",
  },
  {
    question: "What Should I Wear for River Rafting in Rishikesh?",
    answer:
      "Wear comfortable clothing that you're happy to get wet in and secure footwear. Avoid carrying loose valuables onto the raft. Follow the specific instructions provided by your rafting operator before your trip.",
  },
  {
    question: "What Should I Bring for a Rafting Trip?",
    answer:
      "Bring comfortable clothes, secure footwear and only essential personal belongings. It's best to keep valuables and unnecessary items away from the raft unless your operator provides a safe place for them.",
  },
  {
    question: "Can Families and Groups Go River Rafting in Rishikesh?",
    answer:
      "Groups and families can explore suitable rafting options, but the right route depends on the participants' age, physical ability, experience and current conditions. Contact us with your group details so you can discuss the available options.",
  },
  {
    question: "How Can I Book River Rafting in Rishikesh?",
    answer:
      "You can call or WhatsApp us at +91 95688 68493 to discuss your preferred date, group size and rafting route. You can also explore the packages on our website and contact our team to confirm availability and booking details.",
  },
];
