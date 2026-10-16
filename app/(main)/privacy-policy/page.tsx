import Image from "next/image";
import type { Metadata } from "next";
import PolicySidebar from "@/app/components/privacy/PolicySidebar";

export const metadata: Metadata = {
  title: "Privacy Policy | Village Boost",
};

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information-we-collect", title: "Information we collect" },
  { id: "how-we-use-your-information", title: "How we use your information" },
  { id: "payments", title: "Payments" },
  { id: "who-we-share-with", title: "Who we share information with" },
  { id: "cookies", title: "Cookies" },
  { id: "data-retention", title: "How long do we keep your data" },
  { id: "your-rights", title: "Your rights" },
  { id: "keeping-your-data-safe", title: "Keeping your data safe" },
  { id: "changes-to-this-policy", title: "Changes to this policy" },
  { id: "contact-us", title: "Contact Us" },
];

const contactEmail = "jambo@villageboost.com";

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="mb-4 text-[1.375rem]! font-semibold!">{title}</h2>
      <div className="space-y-4 text-body-gray">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-paper">
      <section className="relative overflow-hidden lg:pt-52 pt-40 lg:pb-20 pb-8 text-center">
        <Image
          src="/motif-7.svg"
          alt=""
          width={50}
          height={170}
          className="absolute left-2 top-28 md:left-10 md:w-24 lg:top-36 lg:left-20"
        />
        <Image
          src="/motif-8.svg"
          alt=""
          width={170}
          height={34}
          className="absolute left-1/2 top-24 -translate-x-1/2 md:left-[38%] md:translate-x-0 md:w-36 lg:top-32"
        />
        <Image
          src="/motif-9.svg"
          alt=""
          width={171}
          height={130}
          className="hidden md:block absolute right-2 top-28 md:right-10 md:w-28 lg:top-36 lg:right-28"
        />

        <h1 className="relative px-4">Privacy Policy</h1>
      </section>

      <div className="grid gap-10 pb-20 xl:px-16 md:px-8 px-4 lg:grid-cols-[280px_1fr] lg:gap-16 xl:gap-24">
        <PolicySidebar sections={sections} />

        <div className="max-w-3xl space-y-12">
          <PolicySection id="introduction" title="Introduction">
            <p>
              Village Boost (&quot;we&quot;, &quot;us&quot;) is a crowdfunding
              platform that lets creators in East Africa raise support for their
              projects, and lets contributors back them with rewards in return.
              This policy explains, in plain language, what personal information
              we collect, why we collect it, and what rights you have over it.
              This policy applies to everyone who uses Village Boost — creators,
              contributors, and visitors to our site — and is written to comply
              with Kenya&apos;s Data Protection Act, 2019.
            </p>
          </PolicySection>

          <PolicySection
            id="information-we-collect"
            title="Information we collect">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-ink">Account details.</strong> When you
                sign up, we collect your full name, email address, and phone
                number.
              </li>
              <li>
                <strong className="text-ink">Creator information.</strong> If
                you create campaigns, we also collect your portfolio links,
                creator categories, campaign details (title, description,
                images, funding goal), reward tiers, and campaign updates you
                post.
              </li>
              <li>
                <strong className="text-ink">Transaction records.</strong> When
                you contribute to or receive funds from a campaign, we keep a
                record of the transaction — amount, date, status, and a
                reference from our payment processor. We do not store your full
                M-Pesa PIN, card number, or bank login details ourselves; these
                are handled directly by our payment processor, Pesapal.
              </li>
              <li>
                <strong className="text-ink">Technical data.</strong> We use a
                session cookie to keep you logged in while you use the platform.
              </li>
            </ol>
          </PolicySection>

          <PolicySection
            id="how-we-use-your-information"
            title="How we use your information">
            <p>We use your information to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Create and manage your account</li>
              <li>Let you create, publish, and manage campaigns</li>
              <li>Process contributions and withdrawals</li>
              <li>
                Show campaign progress (amount raised, contributor count) to the
                public
              </li>
              <li>
                Send you transaction confirmations and important updates by
                email
              </li>
              <li>Keep the platform secure and prevent fraud</li>
            </ul>
            <p>We do not sell your personal information to anyone.</p>
          </PolicySection>

          <PolicySection id="payments" title="Payments">
            <p>
              All contributions and withdrawals on Village Boost are processed
              by Pesapal, a licensed payment service provider. When you make a
              payment, your card, M-Pesa, or bank details are entered directly
              with Pesapal — we never see or store them.
            </p>
            <p>
              What we do keep is a record of the transaction itself: the amount,
              date, status (successful, pending, failed), and a reference number
              from Pesapal, so we can show you your contribution or withdrawal
              history.
            </p>
          </PolicySection>

          <PolicySection
            id="who-we-share-with"
            title="Who we share information with">
            <p>
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-ink">Payment providers</strong> — to
                process your contributions and withdrawals securely.
              </li>
              <li>
                <strong className="text-ink">Service providers</strong> — who
                support our operations, such as hosting, database, and email
                delivery, under appropriate confidentiality obligations.
              </li>
              <li>
                <strong className="text-ink">
                  Authorities or third parties
                </strong>{" "}
                — where required by law, or to protect our rights, our users, or
                the public.
              </li>
            </ul>
          </PolicySection>

          <PolicySection id="cookies" title="Cookies">
            <p>
              We currently use only a session cookie, which keeps you logged in
              as you move around the site. It doesn&apos;t track you across
              other websites, and we&apos;re not using any analytics or
              advertising cookies at this time. If that changes, we&apos;ll
              update this section.
            </p>
          </PolicySection>

          <PolicySection
            id="data-retention"
            title="How long do we keep your data">
            <p>
              We keep your account information for as long as your account is
              active. If you delete your account, we remove your personal
              details (name, email, phone, portfolio links) within 30 days,
              except where we&apos;re required to keep something longer.
            </p>
            <p>
              Transaction records are kept for 7 years after the transaction
              date. This isn&apos;t optional — Kenyan tax and financial
              regulations require records like this to be kept for several
              years, so we hold onto them even if you delete your account, but
              only the transaction record itself, not your other personal
              details.
            </p>
          </PolicySection>

          <PolicySection id="your-rights" title="Your rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Access the personal information we hold about you.</li>
              <li>Correct inaccurate or incomplete information.</li>
              <li>
                Request deletion of your information, subject to legal and
                contractual obligations.
              </li>
              <li>
                Object to or restrict certain processing activities, including
                direct marketing.
              </li>
            </ul>
            <p>
              To use any of these rights, email us at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-semibold text-action hover:underline">
                {contactEmail}
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection
            id="keeping-your-data-safe"
            title="Keeping your data safe">
            <p>
              We take reasonable technical and organizational steps to protect
              your information, including encrypted storage, access controls so
              only authorized people can view your data, and secure handling of
              payments through Pesapal. No system is 100% secure, but we work to
              keep your data safe and will notify you if a breach affects you.
            </p>
          </PolicySection>

          <PolicySection
            id="changes-to-this-policy"
            title="Changes to this policy">
            <p>
              We may update this policy as Village Boost grows or as laws
              change. If we make significant changes, we&apos;ll let you know by
              email or through a notice on the platform.
            </p>
          </PolicySection>

          <PolicySection id="contact-us" title="Contact us">
            <p>
              If you have questions about this policy or how we handle your
              data, reach us at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-semibold text-action hover:underline">
                {contactEmail}
              </a>
              .
            </p>
          </PolicySection>
        </div>
      </div>
    </main>
  );
}
