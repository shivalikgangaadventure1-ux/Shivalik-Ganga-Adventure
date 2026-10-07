import { Check, MessageCircle } from "lucide-react";
import { COMPANY, CTA, getWhatsAppLink } from "@/constants/config";
import {
  HOME_FAQS,
  PREPARATION_POINTS,
  ROUTE_CHOICE_FACTORS,
  ROUTE_COPY,
  SAFETY_POINTS,
  TRIP_STEPS,
} from "@/constants/homeContent";
import { PACKAGES } from "@/constants/packages";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

/** "White Water Rafting in Rishikesh on the Ganga" + "Good Adventures Begin with Good Preparation". */
export function RaftingIntro() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Ganga River Rafting" title="White Water Rafting in Rishikesh on the Ganga" />
        <div className="mx-auto max-w-3xl space-y-4 text-center text-base leading-relaxed text-body">
          <p>There is something different about experiencing the Ganga from the river itself.</p>
          <p>
            From the shore, you see the mountains, flowing water and forested riverbanks. Once you&apos;re in the raft,
            you become part of the scene. Some stretches are calm enough to look around and enjoy the scenery. Then the
            water changes, the guide calls out a command, everyone starts paddling, and suddenly you&apos;re right in the
            middle of the adventure.
          </p>
          <p>
            Our Rishikesh river rafting routes give you different ways to experience the river, from shorter trips for
            people who want a gentler introduction to longer journeys with more demanding rapids. The right choice
            depends on your time, experience, physical ability, comfort level and the conditions on the day.
          </p>
          <p className="font-heading font-bold text-heading">
            We don&apos;t believe the longest route is automatically the best one. The best rafting route is the one
            that fits you.
          </p>
        </div>

        <div className="mt-20">
          <SectionHeading eyebrow="Before You Raft" title="Good Adventures Begin with Good Preparation" />
          <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-base leading-relaxed text-body">
            A great rafting trip isn&apos;t only about the biggest rapid. It&apos;s also about knowing what you&apos;re
            doing before the raft leaves the shore. Before getting on the river, participants receive a safety briefing
            and essential rafting equipment, including life jackets and helmets.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PREPARATION_POINTS.map((point) => (
              <div key={point.title} className="rounded-2xl border border-border bg-light p-6">
                <h3 className="font-heading text-lg font-bold text-heading">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** "Rishikesh Rafting Packages & Prices" + note + "Which Route Is Right for You?". */
export function RoutesGuide() {
  return (
    <section id="packages" className="scroll-mt-24 bg-light py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Routes to Nim Beach" title="Rishikesh Rafting Packages & Prices" />
        <p className="mx-auto -mt-6 mb-12 max-w-2xl text-center text-base leading-relaxed text-body">
          Looking for Rishikesh rafting prices or trying to decide which package is right for you? Start with three
          simple things: distance, duration and rapid grade. Then think about your group. Here are our current listed
          Rishikesh rafting packages:
        </p>

        <div className="mx-auto grid max-w-4xl gap-6">
          {PACKAGES.map((pkg) => {
            const copy = ROUTE_COPY[pkg.slug];
            const price = pkg.salePrice ?? pkg.price;
            return (
              <article key={pkg.slug} className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <h3 className="font-heading text-xl font-bold text-heading sm:text-2xl">
                  {pkg.name.split(" to ")[0]} Rafting – {pkg.distanceKm} KM to Nim Beach
                </h3>
                <p className="mt-2 font-heading text-sm font-semibold text-primary-dark">
                  {pkg.distanceKm} KM · {pkg.duration} · {pkg.grade} · {formatPrice(price)}
                </p>
                {copy && (
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-body">
                    <p className="font-semibold text-heading">{copy.lead}</p>
                    {copy.body.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                )}
                <div className="mt-5">
                  <Button href={`/packages/${pkg.slug}`} variant="primary" size="sm">
                    Explore {pkg.name.split(" to ")[0]} Rafting
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-primary/30 bg-primary/10 p-6">
          <h3 className="font-heading text-lg font-bold text-heading">Please Note</h3>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Listed prices and durations are subject to confirmation. Route availability, permitted operations and
            suitability can depend on current river conditions and applicable requirements.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/packages" variant="primary" size="lg">
            View All Rishikesh Rafting Packages
          </Button>
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <SectionHeading eyebrow="Find Your Fit" title="Which Rishikesh Rafting Route Is Right for You?" />
          <div className="space-y-4 text-base leading-relaxed text-body">
            <p>There isn&apos;t one rafting route that&apos;s perfect for everyone.</p>
            <p>
              If you&apos;re new to river rafting in Rishikesh, you may feel more comfortable starting with a shorter
              route and lower-grade rapids. If you&apos;re travelling with friends and want more time on the Ganga, a
              longer route may be a better fit. And if you&apos;re an experienced rafter looking for a bigger challenge,
              you can explore routes with higher-grade rapids, subject to eligibility and current conditions.
            </p>
            <p className="font-heading font-bold text-heading">Before booking, think about:</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {ROUTE_CHOICE_FACTORS.map((factor) => (
                <li key={factor} className="flex items-start gap-2">
                  <Check size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
            <p>The longest route isn&apos;t always the best route. The best route is the one that&apos;s right for you.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** "More Than Rapids. It's Time Well Spent on the Ganga." */
export function ExperienceStory() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="The Experience" title="More Than Rapids. It's Time Well Spent on the Ganga." />
        <div className="mx-auto max-w-3xl space-y-4 text-center text-base leading-relaxed text-body">
          <p>
            Think about the people you&apos;re travelling with. Maybe it&apos;s a weekend trip with friends. Maybe it&apos;s
            a family holiday. Maybe you&apos;ve come to Rishikesh looking for something you haven&apos;t tried before.
          </p>
          <p>
            The adventure starts before the raft even touches the water. There&apos;s the nervous excitement during the
            briefing. Everyone gets into position. Your guide gives the first command, the paddles hit the water and the
            group starts moving together.
          </p>
          <p>
            A little later, the river gets louder. You paddle harder. The raft climbs into the rapid. And when you come
            out the other side, everyone is laughing.
          </p>
          <p>
            Between those moments are quieter stretches where you can look around, breathe and take in the Ganga and the
            Himalayan landscape. That&apos;s what makes Rishikesh river rafting memorable.
          </p>
          <p className="font-heading font-bold text-heading">
            It&apos;s not only the rapids. It&apos;s the people, the river, the scenery and the feeling of doing something
            together.
          </p>
        </div>
      </Container>
    </section>
  );
}

/** "Enjoy the Adventure. Respect the River." */
export function RiverSafety() {
  return (
    <section className="bg-light py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Safety First" title="Enjoy the Adventure. Respect the River." />
        <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-base leading-relaxed text-body">
          White water rafting in Rishikesh takes place in a natural river environment. Water levels, weather and river
          conditions can change, so responsible preparation is an important part of the experience.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_POINTS.map((point) => (
            <div key={point.title} className="rounded-2xl border border-border bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-heading">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{point.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-heading text-base font-bold text-heading">
          Prepare well. Listen to your guide. Respect the river. Enjoy the adventure.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/about#safety" variant="primary">
            Read Our Safety Guidelines
          </Button>
        </div>
      </Container>
    </section>
  );
}

/** "Plan Your River Rafting Trip in Rishikesh" + 7 steps. */
export function PlanYourTrip() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Plan Ahead" title="Plan Your River Rafting Trip in Rishikesh" />
        <p className="mx-auto -mt-6 mb-12 max-w-2xl text-center text-base leading-relaxed text-body">
          Wondering when to go, which route to choose or what you should bring? Tell us your preferred date, group size
          and the type of experience you&apos;re looking for. We can help you understand the available Rishikesh rafting
          routes and what you should know before booking. Because rafting takes place in a natural river environment,
          current conditions and route availability should always be confirmed before your trip.
        </p>

        <h3 className="mb-8 text-center font-heading text-2xl font-bold text-heading">
          Your Rishikesh River Rafting Trip, Step by Step
        </h3>
        <ol className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {TRIP_STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl border border-border bg-light p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading font-bold text-heading">
                {index + 1}
              </span>
              <div>
                <h4 className="font-heading text-base font-bold text-heading">{step.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-body">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href={getWhatsAppLink()}
            variant="primary"
            size="lg"
            icon={MessageCircle}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Plan your rafting trip via WhatsApp"
          >
            Plan Your Rafting Trip
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            {CTA.bookYourAdventure}
          </Button>
        </div>
      </Container>
    </section>
  );
}

/** "Frequently Asked Questions About River Rafting in Rishikesh". Schema is emitted by the page. */
export function HomeFAQ() {
  return (
    <section className="bg-light py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Good to Know" title="Frequently Asked Questions About River Rafting in Rishikesh" />
        <div className="mx-auto max-w-3xl">
          <Accordion items={HOME_FAQS} />
          <p className="mt-6 text-center text-sm text-body">
            Still unsure? Call or WhatsApp {COMPANY.displayPhone} and our team will help you choose.
          </p>
        </div>
      </Container>
    </section>
  );
}
