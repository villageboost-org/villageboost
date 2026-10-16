import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import PolicySidebar from "@/app/components/privacy/PolicySidebar";
import PolicySection from "@/app/components/privacy/PolicySection";
import motif10 from "@/public/motif-10.svg";
import motif11 from "@/public/motif-11.svg";
import motif12 from "@/public/motif-12.svg";

export const metadata: Metadata = {
  title: "Terms & Conditions | Village Boost",
};

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "definitions", title: "Definitions" },
  { id: "eligibility", title: "Eligibility" },
  { id: "account-registration", title: "Account registration and security" },
  { id: "campaign-review", title: "Campaign review and approval" },
  { id: "prohibited-content", title: "Prohibited campaigns and content" },
  { id: "fees-payments", title: "Fees, payments and withdrawals" },
  { id: "role-of-village-boost", title: "The role of Village Boost" },
  { id: "reward-fulfilment", title: "Reward fulfilment" },
  { id: "refunds", title: "Refunds" },
  { id: "intellectual-property", title: "Intellectual property" },
  { id: "account-suspension", title: "Account suspension & termination" },
  { id: "disclaimer-of-warranties", title: "Disclaimer of warranties" },
  { id: "limitation-of-liability", title: "Limitation of Liability" },
  { id: "governing-law", title: "Governing law and dispute resolution" },
  { id: "changes-to-these-terms", title: "Changes to these terms" },
  { id: "contact-us", title: "Contact us" },
];

const contactEmail = "jambo@villageboost.com";

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-paper">
      <section className="relative overflow-hidden lg:pt-52 pt-40 lg:pb-20 pb-8 text-center">
        <Image
          src={motif10}
          alt=""
          className="absolute left-2 top-24 w-12 md:w-24 md:left-10 lg:top-36 lg:left-20"
        />
        <Image
          src={motif11}
          alt=""
          className="absolute left-1/2 top-24 w-30 -translate-x-1/2 md:left-[40%] md:translate-x-0 md:w-40 lg:top-32"
        />
        <Image
          src={motif12}
          alt=""
          className="hidden md:block absolute w-25 md:right-10 top-28 lg:top-36 lg:right-24"
        />

        <h1 className="relative px-4">Terms &amp; Conditions</h1>
      </section>

      <div className="grid gap-10 pb-20 xl:px-16 md:px-8 px-4 lg:grid-cols-[280px_1fr] lg:gap-16 xl:gap-24">
        <PolicySidebar sections={sections} />

        <div className="max-w-3xl space-y-12">
          <PolicySection id="introduction" title="Introduction">
            <p>
              These Terms and Conditions (&quot;Terms&quot;) are a binding
              agreement between you (&quot;User&quot;, &quot;you&quot;) and
              Village Boost (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
              governing your use of our website, app, and related services (the
              &quot;Platform&quot;).
            </p>
            <p>
              By creating an account or using the Platform, you agree to these
              Terms and our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-action hover:underline">
                Privacy Policy
              </Link>
              . If you don&apos;t agree, please don&apos;t use the Platform.
            </p>
          </PolicySection>

          <PolicySection id="definitions" title="Definitions">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-ink">Campaign</strong> — a fundraising
                project created by a Creator on the Platform.
              </li>
              <li>
                <strong className="text-ink">Creator</strong> — a User who
                creates and manages a Campaign.
              </li>
              <li>
                <strong className="text-ink">Contributor</strong> — a User who
                contributes funds to a Campaign in exchange for a reward, or as a
                general contribution.
              </li>
              <li>
                <strong className="text-ink">Reward</strong> — a perk a Creator
                offers to Contributors at a given contribution tier.
              </li>
              <li>
                <strong className="text-ink">User Content</strong> — any text,
                images, or other content a User uploads to the Platform.
              </li>
            </ul>
          </PolicySection>

          <PolicySection id="eligibility" title="Eligibility">
            <p>
              You must be at least 18 years old and able to enter into a legally
              binding agreement to use the Platform. Village Boost is built for
              creators and contributors in East Africa, and our payment methods
              (M-Pesa and local card processing) are set up with that region in
              mind.
            </p>
          </PolicySection>

          <PolicySection
            id="account-registration"
            title="Account registration and security">
            <p>
              You must provide accurate, current information when you register.
              You&apos;re responsible for everything that happens under your
              account, so keep your login details confidential and tell us right
              away if you suspect unauthorised access.
            </p>
          </PolicySection>

          <PolicySection id="campaign-review" title="Campaign review and approval">
            <p>
              Every Campaign is reviewed before it goes live. If something needs
              fixing — unclear details, a missing image, a prohibited category —
              we&apos;ll contact you to request changes before publishing. We may
              decline to publish a Campaign that doesn&apos;t meet our standards,
              at our discretion.
            </p>
          </PolicySection>

          <PolicySection
            id="prohibited-content"
            title="Prohibited campaigns and content">
            <p>
              You may not use the Platform to create a Campaign or post content
              that:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Is fraudulent, misleading, or raises funds for a purpose other
                than what&apos;s stated
              </li>
              <li>Is illegal, or funds illegal activity, weapons, or drugs</li>
              <li>Is defamatory, obscene, pornographic, or sexually explicit</li>
              <li>
                Promotes hate speech, discrimination, or harassment against any
                person or group
              </li>
              <li>
                Infringes someone else&apos;s copyright, trademark, or other
                intellectual property
              </li>
              <li>
                Involves multi-level marketing, gambling, or investment schemes
                promising financial returns
              </li>
              <li>
                Solicits funds for medical, legal, or personal emergencies
                without some way to verify the claim
              </li>
            </ul>
            <p>
              We may remove a Campaign, hold funds, or suspend an account where
              we reasonably believe these rules have been broken.
            </p>
          </PolicySection>

          <PolicySection id="fees-payments" title="Fees, payments and withdrawals">
            <p>
              Village Boost uses flexible funding: Creators keep whatever is
              raised, whether or not a Campaign reaches its goal.
            </p>
            <p>
              We charge a platform fee of 5% of the funds withdrawn. This is
              separate from, and in addition to, Pesapal&apos;s own processing
              charges, which are deducted separately. The fee is deducted
              automatically when a Creator requests a withdrawal.
            </p>
            <p>
              We may change this fee in the future. If we do, we&apos;ll give at
              least 30 days&apos; notice before it takes effect.
            </p>
          </PolicySection>

          <PolicySection id="role-of-village-boost" title="The role of Village Boost">
            <p>
              Village Boost is a technology platform that connects Creators with
              Contributors. We are not a party to any agreement between Users,
              and we are not a bank, charity, or financial institution.
            </p>
            <p>
              Listing a Campaign on the Platform isn&apos;t an endorsement by us.
              We don&apos;t guarantee that information provided by a Creator is
              accurate, or that funds will be used as described, and we&apos;re
              not liable for the success of any Campaign or the conduct of any
              User.
            </p>
          </PolicySection>

          <PolicySection id="reward-fulfilment" title="Reward fulfilment">
            <p>
              Creators are responsible for delivering the rewards they promise,
              within the timeline stated on their Campaign. If a reward
              doesn&apos;t arrive, a Contributor should first contact the
              Creator directly to resolve it.
            </p>
            <p>
              If that doesn&apos;t work, Contributors can report the issue to us
              at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-semibold text-action hover:underline">
                {contactEmail}
              </a>
              . We may investigate, and where a Creator repeatedly fails to
              deliver rewards or is unresponsive, we may flag their account,
              restrict them from launching new Campaigns, or suspend their
              account. However, Village Boost is not responsible for fulfilling
              rewards on a Creator&apos;s behalf, and reward delivery itself is
              strictly between Creator and Contributor.
            </p>
          </PolicySection>

          <PolicySection id="refunds" title="Refunds">
            <p>
              All transactions are final. Refunds for contributions are at the
              sole discretion of the Creator, except where we determine, in our
              sole discretion, that a Campaign is fraudulent, violates these
              Terms, or a technical error has occurred. Creators must clearly
              communicate their own refund policy to Contributors.
            </p>
          </PolicySection>

          <PolicySection id="intellectual-property" title="Intellectual property">
            <p>
              You keep ownership of the content you upload (campaign
              descriptions, images, videos). By uploading it, you give Village
              Boost a worldwide, non-exclusive, royalty-free licence to use,
              display, and share that content to operate and promote the
              Platform — for example, featuring your Campaign on our homepage or
              social media.
            </p>
            <p>
              Everything else on the Platform — our logo, branding, and software
              — belongs to Village Boost.
            </p>
          </PolicySection>

          <PolicySection
            id="account-suspension"
            title="Account suspension & termination">
            <p>
              We may suspend or terminate your account, with or without notice,
              if you:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Breach these Terms or our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-action hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                Post a Campaign or content that violates our prohibited-content
                rules
              </li>
              <li>
                Are found to have committed fraud or provided false information
              </li>
              <li>Repeatedly fail to deliver promised rewards</li>
              <li>
                Engage in payment fraud, chargebacks made in bad faith, or abuse
                of other Users
              </li>
            </ul>
            <p>
              Where possible, we&apos;ll let you know why your account was
              suspended and give you a chance to respond. You can also close your
              own account at any time by contacting{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-semibold text-action hover:underline">
                {contactEmail}
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection
            id="disclaimer-of-warranties"
            title="Disclaimer of warranties">
            <p>
              The Platform is provided &quot;as is&quot; and &quot;as
              available&quot;, without warranties of any kind. We don&apos;t
              guarantee the Platform will be uninterrupted, secure, or
              error-free.
            </p>
            <p>
              We don&apos;t independently verify what Creators tell us about
              their Campaigns, and we make no promises about the accuracy,
              safety, or legality of any Campaign or User Content. Dealing with
              other Users, and deciding whether to contribute to a Campaign, is
              at your own risk.
            </p>
          </PolicySection>

          <PolicySection
            id="limitation-of-liability"
            title="Limitation of Liability">
            <p>
              To the maximum extent permitted by law, Village Boost will not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or for any loss of profits, revenues, or data,
              arising out of or in connection with your use of the Platform.
            </p>
            <p>
              Our total liability for any claim relating to the Platform will
              not exceed the greater of (a) the total fees you paid to us for the
              transaction giving rise to the claim, or (b) the equivalent of USD
              20.
            </p>
            <p>
              Nothing in these Terms excludes or limits liability that cannot be
              excluded or limited under applicable law.
            </p>
          </PolicySection>

          <PolicySection
            id="governing-law"
            title="Governing law and dispute resolution">
            <p>
              These Terms are governed by the laws of the Republic of Kenya. Any
              dispute arising from these Terms will be resolved through binding
              arbitration in Nairobi, Kenya, under the Kenyan Arbitration Act.
            </p>
          </PolicySection>

          <PolicySection
            id="changes-to-these-terms"
            title="Changes to these terms">
            <p>
              We may update these Terms from time to time. If we make material
              changes, we&apos;ll notify you by email or through a notice on the
              Platform. Continuing to use the Platform after changes take effect
              means you accept them.
            </p>
          </PolicySection>

          <PolicySection id="contact-us" title="Contact us">
            <p>
              Questions about these Terms? Reach us at{" "}
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
