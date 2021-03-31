import React from "react"
import { Grid } from "../components/Grid"
import { Layout } from "../components"
import { screenTrack, Schema } from "../utils/analytics"
import { initializeApollo } from "lib/apollo/apollo"

export const TermsOfService = screenTrack(() => ({
  page: Schema.PageNames.TermsOfService,
  path: "/terms-of-service",
}))(() => {
  return (
    <Layout>
      <Grid px={[2, 2, 2, 2, 2]}>
        <div className="termsofservicetopsection">
          <div className="privacytopcontainer">
            <div className="privacyheadertitle">Terms of Service</div>
            <div className="privacyheadersubtitle">Effective date November 18, 2020</div>
          </div>
        </div>
        <div className="privacypolicytext">
          <div className="div-block-2">
            <div className="text-block-10">
              Welcome to Seasons. Please read on to learn the rules and restrictions that govern your use of our
              website(s), products, services (including our membership services) and applications (the “Services”),
              including, without limitation, any request to receive information about, or to rent or purchase any of the
              products made available through our website(s) (each, a “Product”). Your rental or purchase of any
              Products will also be governed by any other terms made available by us to you during the rental or sales
              process, as applicable. If you have any questions, comments, or concerns regarding these terms or the
              Services, please contact us at:
              <br />
              <br />
              Email: membership@seasons.nyc
              <br />
              Phone: (929) 274-013 2<br />
              Address: 138 Mulberry St, 5A2, New York, NY 10013
              <br />
              <br />
              These Terms of Use (the “Terms”) are a binding contract between you and <strong>SZNS, Inc.</strong>{" "}
              (“Seasons,” “we” and “us”). Your use of the Services in any way means that you agree to all of these
              Terms, and these Terms will remain in effect while you use the Services. These Terms include the
              provisions in this document as well as those in the <a href="/privacy-policy">Privacy Policy</a>,{" "}
              <a href="/">Frequently Asked Questions</a>, <a href="/">Shipping and Returns</a>, Copyright Dispute
              Policy, and any other accompanying terms and conditions entered into between you and us for the rental or
              sale of any Products.
              <strong>
                {" "}
                Your use of or participation in certain Services may also be subject to additional policies, rules
                and/or conditions (“Additional Terms”), which are incorporated herein by reference, and you understand
                and agree that by using or participating in any such Services, you agree to also comply with these
                Additional Terms.
                <br />
                <br />
                Please read these Terms carefully.{" "}
              </strong>
              They cover important information about Services provided to you and any charges, taxes, and fees we bill
              you.{" "}
              <strong>
                These Terms include information about future changes to these Terms, automatic renewals, limitations of
                liability, a className action waiver and resolution of disputes by arbitration instead of in court.
                PLEASE NOTE THAT YOUR USE OF AND ACCESS TO OUR SERVICES ARE SUBJECT TO THE FOLLOWING TERMS; IF YOU DO
                NOT AGREE TO ALL OF THE FOLLOWING, YOU MAY NOT USE OR ACCESS THE SERVICES IN ANY MANNER.
                <br />
                <br />
                ARBITRATION NOTICE AND CLASS ACTION WAIVER:
              </strong>{" "}
              EXCEPT FOR CERTAIN TYPES OF DISPUTES DESCRIBED IN THE ARBITRATION AGREEMENT SECTION BELOW, YOU AGREE THAT
              DISPUTES BETWEEN YOU AND US WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION AND YOU WAIVE YOUR RIGHT
              TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.
              <br />
              <br />
              <span>
                ‍<strong className="bodyheader">Will these Terms ever change?</strong>
              </span>
              <strong>
                <br />
                <br />‍
              </strong>
              We are constantly trying to improve our Services, so these Terms may need to change along with our
              Services. We reserve the right to change the Terms at any time, but if we do, we will place a notice on
              our site located at www.seasons.nyc, send you an email, and/or notify you by some other means.
              <br />
              <br />
              If you don’t agree with the new Terms, you are free to reject them; unfortunately, that means you will no
              longer be able to use the Services. If you use the Services in any way after a change to the Terms is
              effective, that means you agree to all of the changes.
              <br />
              <br />
              Except for changes by us as described here, no other amendment or modification of these Terms will be
              effective unless in writing and signed by both you and us.
              <br />
              <br />
              <span>
                ‍<strong className="bodyheader">What about my privacy?</strong>
              </span>
              <strong>
                <br />
                <br />‍
              </strong>
              Seasons takes the privacy of its users very seriously. For the current Seasons Privacy Policy, please
              click <a href="/privacy-policy">here</a>.
              <br />
              <br />‍
              <em className="bodyheader">
                Children’s Online Privacy Protection Act
                <br />
                <br />‍
              </em>
              The Children’s Online Privacy Protection Act (“COPPA”) requires that online service providers obtain
              parental consent before they knowingly collect personally identifiable information online from children
              who are under thirteen (13). We do not knowingly collect or solicit personally identifiable information
              from children under thirteen (13); if you are a child under thirteen (13), please do not attempt to
              register for or otherwise use the Services or send us any personal information. If we learn we have
              collected personal information from a child under thirteen (13), we will delete that information as
              quickly as possible. If you believe that a child under thirteen (13) may have provided us personal
              information, please contact us at membership@seasons.nyc.
              <br />
              <br />
              <span>
                ‍<strong className="bodyheader">What are the basics of using Seasons?</strong>
              </span>
              <strong>
                <br />
                <br />‍
              </strong>
              You may be required to sign up for an account, select a password and user name (“Seasons User ID”), and
              provide us with certain information or data, such as your contact information. You promise to provide us
              with accurate, complete, and updated registration information about yourself. You may not select as your
              Seasons User ID a name that you do not have the right to use, or another person’s name with the intent to
              impersonate that person. You may not transfer your account to anyone else without our prior written
              permission.
              <br />
              <br />
              You represent and warrant that you are an individual of legal age to form a binding contract (or if not,
              you’ve received your parent’s or guardian’s permission to use the Services and have gotten your parent or
              guardian to agree to these Terms on your behalf).
              <br />
              <br />
              You will only use the Services and Products you obtain for your own internal, personal, non-commercial
              use, and not on behalf of or for the benefit of any third party, and only in a manner that complies with
              all laws that apply to you. If your use of the Services is prohibited by applicable laws, then you aren’t
              authorized to use the Services. We can’t and won’t be responsible for your using the Services in a way
              that breaks the law.
              <br />
              <br />
              You will not share your Seasons User ID, account or password with anyone, and you must protect the
              security of your Seasons User ID, account, password and any other access tools or credentials. You’re
              responsible for any activity associated with your Seasons User ID and account.
              <br />
              <br />
              <span>
                <strong className="bodyheader">What about messaging?</strong>
              </span>
              <br />
              <br />
              ‍As part of the Services, you may receive communications through the Services, including messages that
              Seasons sends you (for example, via email or SMS). When signing up for the Services, you will receive a
              welcome message and instructions on how to stop receiving messages.
              <strong>
                By signing up for the Services and providing us with your wireless number, you confirm that you want
                Seasons to send you information regarding your account or transactions with us, which may include
                Seasons using automated dialing technology to text you at the wireless number you provided, and you
                agree to receive communications from Seasons, and you represent and warrant that each person you
                register for the Services or for whom you provide a wireless phone number has consented to receive
                communications from Seasons.
              </strong>
              You agree to indemnify and hold Seasons harmless from and against any and all claims, liabilities, damages
              (actual and consequential), losses and expenses (including attorneys’ fees) arising from or in any way
              related to your breach of the foregoing.
              <strong>
                <br />

                <br />
              </strong>
              <span>
                <strong className="bodyheader">Are there restrictions in how I can use the Services?</strong>
              </span>
              <strong>
                <br />
                <br />‍
              </strong>
              You represent, warrant, and agree that you will not contribute any Content or User Submission (each of
              those terms is defined below) or otherwise use the Services or interact with the Services in a manner
              that:
              <br />
              <br />
              (A) infringes or violates the intellectual property rights or any other rights of anyone else (including
              Seasons);
              <br />
              (B) violates any law or regulation, including, without limitation, any applicable export control laws,
              privacy laws or any other purpose not reasonably intended by Seasons;
              <br />
              (C) is dangerous, harmful, fraudulent, deceptive, threatening, harassing, defamatory, obscene, or
              otherwise objectionable;
              <br />
              (D) jeopardizes the security of your Seasons User ID, account or anyone else’s (such as allowing someone
              else to log in to the Services as you);
              <br />
              (E) attempts, in any manner, to obtain the password, account, or other security information from any other
              user;
              <br />
              (F) violates the security of any computer network, or cracks any passwords or security encryption codes;
              <br />
              (G) runs Maillist, Listserv, any form of auto-responder or “spam” on the Services, or any processes that
              run or are activated while you are not logged into the Services, or that otherwise interfere with the
              proper working of the Services (including by placing an unreasonable load on the Services’ infrastructure)
              ;<br />
              (H) “crawls,” “scrapes,” or “spiders” any page, data, or portion of or relating to the Services or Content
              (through use of manual or automated means);
              <br />
              (I) copies or stores any significant portion of the Content; or
              <br />
              (J) decompiles, reverse engineers, or otherwise attempts to obtain the source code or underlying ideas or
              information of or relating to the Services.
              <br />‍
              <br />A violation of any of the foregoing is grounds for termination of your right to use or access the
              Services.
              <br />
              <br />‍
              <strong className="bodyheader">
                What are my rights in the Services?
                <br />
                <br />‍
              </strong>
              The materials displayed or performed or available on or through the Services, including, but not limited
              to, text, graphics, data, articles, photos, images, illustrations, User Submissions (as defined below) and
              so forth (all of the foregoing, the “Content”) are protected by copyright and/or other intellectual
              property laws. You promise to abide by all copyright notices, trademark rules, information, and
              restrictions contained in any Content you access through the Services, and you won’t use, copy, reproduce,
              modify, translate, publish, broadcast, transmit, distribute, perform, upload, display, license, sell,
              commercialize or otherwise exploit for any purpose any Content not owned by you, (i) without the prior
              consent of the owner of that Content or (ii) in a way that violates someone else’s (including
              Seasons&#x27;) rights.Subject to these Terms, we grant each user of the Services a worldwide,
              non-exclusive, non-sublicensable and non-transferable license to use (i.e., to download and display
              locally) Content solely for purposes of using the Services. Use, reproduction, modification, distribution
              or storage of any Content for any purpose other than using the Services is expressly prohibited without
              prior written permission from us. You understand that Seasons owns the Services. You won’t modify,
              publish, transmit, participate in the transfer or sale of, reproduce (except as expressly provided in this
              Section), create derivative works based on, or otherwise exploit any of the Services. The Services may
              allow you to copy or download certain Content, but please remember that even where these functionalities
              exist, all the restrictions in this section still apply.
              <br />
              <br />
              <span>
                ‍
                <strong className="bodyheader">
                  What about anything I contribute to the Services – do I have to grant any licenses to Seasons or to
                  other users?
                </strong>
              </span>
              <strong>
                <br />
                <br />
              </strong>
              <span>
                <strong>‍</strong>
                <em className="bodyheader">User Submissions</em>
              </span>
              <em>
                <br />
                <br />‍
              </em>
              Anything you post, upload, share, store, or otherwise provide through the Services is your “User
              Submission”. Some User Submissions may be viewable by other users. You are solely responsible for all User
              Submissions you contribute to the Services. You represent that all User Submissions submitted by you are
              accurate, complete, up-to-date, and in compliance with all applicable laws, rules and regulations. You
              agree that you will not post, upload, share, store, or otherwise provide through the Services any User
              Submissions that: (i) infringe any third party&#x27;s copyrights or other rights (e.g., trademark, privacy
              rights, etc.); (ii) contain sexually explicit content or pornography; (iii) contain hateful, defamatory,
              or discriminatory content or incite hatred against any individual or group; (iv) exploit minors; (v)
              depict unlawful acts or extreme violence; (vi) depict animal cruelty or extreme violence towards animals;
              (vii) promote fraudulent schemes, multi-level marketing (MLM) schemes, get rich quick schemes, online
              gaming and gambling, cash gifting, work from home businesses, or any other dubious money-making ventures;
              or (viii) that violate any law.
              <br />
              <br />
              <span>
                ‍<em className="bodyheader">Licenses</em>
              </span>
              <em>
                <br />
                <br />‍
              </em>
              In order to display your User Submissions on the Services, and to allow other users to enjoy them (where
              applicable), you grant us certain rights in those User Submissions (see below for more information).
              Please note that all of the following licenses are subject to our{" "}
              <a href="/privacy-policy">Privacy Policy</a> to the extent they relate to User Submissions that are also
              your personally-identifiable information.
              <br />
              <br />
              By submitting User Submissions through the Services, you hereby do and shall grant Seasons a worldwide,
              non-exclusive, perpetual, royalty-free, fully paid, sublicensable and transferable license to use, edit,
              modify, truncate, aggregate, reproduce, distribute, prepare derivative works of, display, perform, and
              otherwise fully exploit the User Submissions in connection with this site, the Services and our (and our
              successors’ and assigns’) businesses, including without limitation for promoting and redistributing part
              or all of this site or the Services (and derivative works thereof) in any media formats and through any
              media channels (including, without limitation, third party websites and feeds), and including after your
              termination of your account or the Services. You also hereby do and shall grant each user of this site
              and/or the Services a non-exclusive, perpetual license to access your User Submissions through this site
              and/or the Services, and to use, edit, modify, reproduce, distribute, prepare derivative works of, display
              and perform such User Submissions, including after your termination of your account or the Services. For
              clarity, the foregoing license grants to us and our users do not affect your other ownership or license
              rights in your User Submissions, including the right to grant additional licenses to your User
              Submissions, unless otherwise agreed in writing. You represent and warrant that you have all rights to
              grant such licenses to us without infringement or violation of any third party rights, including without
              limitation, any privacy rights, publicity rights, copyrights, trademarks, contract rights, or any other
              intellectual property or proprietary rights.Finally, you understand and agree that Seasons, in performing
              the required technical steps to provide the Services to our users (including you), may need to make
              changes to your User Submissions to conform and adapt those User Submissions to the technical requirements
              of connection networks, devices, services, or media, and the foregoing licenses include the rights to do
              so.
              <br />
              <br />
              <span>
                ‍
                <strong className="bodyheader">
                  What if I see something on the Services that infringes my copyright?
                </strong>
              </span>
              <strong>
                <br />
                <br />‍
              </strong>
              We respect others’ intellectual property rights, and we reserve the right to delete or disable Content
              alleged to be infringing, and to terminate the accounts of repeat alleged infringers; to review our
              complete Copyright Dispute Policy and learn how to report potentially infringing content, click here.
              <br />
              <br />
              <span>
                ‍<strong className="bodyheader">Who is responsible for what I see and do on the Services?</strong>
              </span>
              <strong>
                <br />
                <br />‍
              </strong>
              Any information or Content publicly posted or privately transmitted through the Services is the sole
              responsibility of the person from whom such Content originated, and you access all such information and
              Content at your own risk, and we aren’t liable for any errors or omissions in that information or Content
              or for any damages or loss you might suffer in connection with it. We cannot control and have no duty to
              take any action regarding how you may interpret and use the Content or what actions you may take as a
              result of having been exposed to the Content, and you hereby release us from all liability for you having
              acquired or not acquired Content through the Services. We can’t guarantee the identity of any users with
              whom you interact in using the Services and are not responsible for which users gain access to the
              Services.
              <br />
              <br />
              You are responsible for all Content you contribute, in any manner, to the Services, and you represent and
              warrant you have all rights necessary to do so, in the manner in which you contribute it.
              <br />
              <br />
              The Services may contain links or connections to third-party websites or services that are not owned or
              controlled by Seasons. When you access third-party websites or use third-party services, you accept that
              there are risks in doing so, and that Seasons is not responsible for such risks. Seasons has no control
              over, and assumes no responsibility for, the content, accuracy, privacy policies, or practices of or
              opinions expressed in any third-party websites or by any third party that you interact with through the
              Services. In addition, Seasons will not and cannot monitor, verify, censor or edit the content of any
              third-party site or service. We encourage you to be aware when you leave the Services and to read the
              terms and conditions and privacy policy of each third-party website or service that you visit or utilize.
              By using the Services, you release and hold us harmless from any and all liability arising from your use
              of any third-party website or service .<br />
              <br />
              Your interactions with organizations and/or individuals found on or through the Services, including
              payment and delivery of goods or services, and any other terms, conditions, warranties or representations
              associated with such dealings, are solely between you and such organizations and/or individuals. You
              should make whatever investigation you feel necessary or appropriate before proceeding with any online or
              offline transaction with any of these third parties. You agree that Seasons shall not be responsible or
              liable for any loss or damage of any sort incurred as the result of any such dealings.
              <br />
              <br />
              If there is a dispute between participants on this site or Services, or between users and any third party,
              you agree that Seasons is under no obligation to become involved. In the event that you have a dispute
              with one or more other users, you release Seasons, its directors, officers, employees, agents, and
              successors from claims, demands, and damages of every kind or nature, known or unknown, suspected or
              unsuspected, disclosed or undisclosed, arising out of or in any way related to such disputes and/or our
              Services. You shall and hereby do waive California Civil Code Section 1542 or any similar law of any
              jurisdiction, which says in substance: “A general release does not extend to claims that the creditor or
              releasing party does not know or suspect to exist in his or her favor at the time of executing the release
              and that, if known by him or her, would have materially affected his or her settlement with the debtor or
              released party.”
              <br />
              <br />‍
              <strong className="bodyheader">
                Will Seasons ever change the Services?
                <br />
                <br />‍
              </strong>
              We’re always trying to improve our Services, so they may change over time. We may suspend or discontinue
              any part of the Services, or we may introduce new features or impose limits on certain features or
              restrict access to parts or all of the Services. We’ll try to give you notice when we make a material
              change to the Services that would adversely affect you, but this isn’t always practical. We reserve the
              right to remove any Products or Content from the Services at any time, for any reason (including, but not
              limited to, if someone alleges you contributed that Content in violation of these Terms), in our sole
              discretion, and without notice.
              <br />
              <br />
              <span>
                ‍<strong className="bodyheader">Do the Services cost anything?</strong>
              </span>
              <strong>
                <br />
                <br />‍
              </strong>
              You can rent or purchase Products at the prices set forth on our <a href="/">Membership</a> page. You may
              choose to rent or purchase Products through the www.seasons.nyc website or our mobile applications.
              Seasons may limit or cancel quantities of Products rented or purchased, and it reserves the right to
              refuse any order. In the event Seasons needs to make a change to an order, it will attempt to notify you
              by contacting the email address, billing address, and/or phone number provided at the time the order was
              made. The prices displayed are quoted in U.S. currency and are valid only in the United States. Prices are
              subject to change at any time. Sales tax will be determined by the shipping address of the order and will
              automatically be added to the order. Seasons is required by law to apply sales tax to orders to certain
              states. Rented or purchased Products will be shipped to the shipping address of the order. Information
              about our shipping rates and return policy can all be found on our{" "}
              <a href="/">Frequently Asked Questions</a> page.  Any payment terms presented to you in the process of
              purchasing Products are deemed part of these Terms.
              <br />
              <br />
              Note that if you elect to receive text messages through the Services, data and message rates may apply.
              Any and all such charges, fees or costs are your sole responsibility. You should consult with your
              wireless carrier to determine what rates, charges, fees or costs may apply to your use of the Services .
              <br />
              <br />
              A. Billing. We use third-party payment processors (the “Payment Processors”) to bill you through a payment
              account linked to your account on the Services (your “Billing Account”). The processing of payments will
              be subject to the terms, conditions and privacy policies of the Payment Processors in addition to these
              Terms. Currently, we use Stripe, Inc. and Chargebee Inc. as our Payment Processor. You can access Stripe’s
              Terms of Service at{" "}
              <a href="https://stripe.com/us/checkout/legal">https://stripe.com/us/checkout/legal</a> and Stripe’s
              Privacy Policy at <a href="https://stripe.com/us/privacy">https://stripe.com/us/privacy</a>. You can
              access Chargebee’s Terms of Service at{" "}
              <a href="https://www.chargebee.com/company/terms/">https://www.chargebee.com/company/terms/</a> and
              Chargebee’s Privacy Policy at{" "}
              <a href="https://www.chargebee.com/privacy/">https://www.chargebee.com/privacy/</a>. We are not
              responsible for any error by, or other acts or omissions of, the Payment Processors. By choosing to
              purchase a membership with us, you agree to pay us, through the Payment Processors, all charges at the
              prices then in effect for such membership in accordance with the applicable payment terms, and you
              authorize us, through the Payment Processors, to charge your chosen payment provider (your “Payment
              Method”). You agree to make payment using that selected Payment Method. We reserve the right to correct
              any errors or mistakes that the Payment Processors make even if it has already requested or received
              payment.
              <br />
              <br />
              B. Payment Method. The terms of your payment will be based on your Payment Method and may be determined by
              agreements between you and the financial institution, credit card issuer or other provider of your chosen
              Payment Method. If we, through the Payment Processors, do not receive payment from you, you agree to pay
              all amounts due on your Billing Account upon demand.
              <br />
              <br />
              C. Recurring Billing. Use of our Services requires purchase of a membership, consisting of an initial
              period for which there is a one-time charge, followed by recurring period charges thereafter based on the
              membership you have chosen (“Paid Subscription”). By purchasing a Paid Subscription, you acknowledge that
              such Services have an initial and recurring payment feature and you accept responsibility for all
              recurring charges prior to cancellation. WE MAY SUBMIT PERIODIC CHARGES (E.G., MONTHLY) WITHOUT FURTHER
              AUTHORIZATION FROM YOU, UNTIL YOU PROVIDE PRIOR NOTICE (RECEIPT OF WHICH IS CONFIRMED BY US) THAT YOU HAVE
              TERMINATED THIS AUTHORIZATION OR WISH TO CHANGE YOUR PAYMENT METHOD. SUCH NOTICE WILL NOT AFFECT CHARGES
              SUBMITTED BEFORE WE REASONABLY COULD ACT. TO TERMINATE YOUR AUTHORIZATION OR CHANGE YOUR PAYMENT METHOD,
              GO TO ACCOUNT SETTINGS.
              <br />
              <br />
              D. Current Information Required. YOU MUST PROVIDE CURRENT, COMPLETE AND ACCURATE INFORMATION FOR YOUR
              BILLING ACCOUNT. YOU MUST PROMPTLY UPDATE ALL INFORMATION TO KEEP YOUR BILLING ACCOUNT CURRENT, COMPLETE
              AND ACCURATE (SUCH AS A CHANGE IN BILLING ADDRESS, CREDIT CARD NUMBER, OR CREDIT CARD EXPIRATION DATE),
              AND YOU MUST PROMPTLY NOTIFY US OR OUR PAYMENT PROCESSORS IF YOUR PAYMENT METHOD IS CANCELED (E.G., FOR
              LOSS OR THEFT) OR IF YOU BECOME AWARE OF A POTENTIAL BREACH OF SECURITY, SUCH AS THE UNAUTHORIZED
              DISCLOSURE OR USE OF YOUR USER NAME OR PASSWORD. CHANGES TO SUCH INFORMATION CAN BE MADE AT ACCOUNT
              SETTINGS. IF YOU FAIL TO PROVIDE ANY OF THE FOREGOING INFORMATION, YOU AGREE THAT WE MAY CONTINUE CHARGING
              YOU FOR ANY USE OF PAID SUBSCRIPTIONS UNDER YOUR BILLING ACCOUNT UNLESS YOU HAVE TERMINATED YOUR PAID
              SUBSCRIPTIONS AS SET FORTH ABOVE.
              <br />
              <br />
              E. Change in Amount Authorized. If the amount to be charged to your Billing Account varies from the amount
              you preauthorized (other than due to the imposition or change in the amount of state sales taxes), you
              have the right to receive, and we shall provide, notice of the amount to be charged and the date of the
              charge before the scheduled date of the transaction. Any agreement you have with your payment provider
              will govern your use of your Payment Method. You agree that we may accumulate charges incurred and submit
              them as one or more aggregate charges, including during or at the end of each billing cycle.
              <br />
              <br />
              F. Auto-Renewal for Paid Subscriptions. Unless you opt out of auto-renewal, which can be done through your
              account settings, any Paid Subscription(s) you have signed up for will be automatically extended for
              successive renewal periods of the same duration as the subscription term originally selected, at the
              then-current non-promotional rate. To change or resign your Paid Subscription(s) at any time, go to
              account settings.  If you terminate a Paid Subscription, you may use your subscription until the end of
              your then-current term, and your subscription will not be renewed after your then-current term expires.
              However, you will not be eligible for a prorated refund of any portion of the subscription fee paid for
              the then-current subscription period. If you do not want to continue to be charged on a recurring monthly
              basis, you must cancel the applicable Paid subscription through your account settings or terminate your
              SEASONS account before the end of the recurring TERM. Paid subscriptions cannot be terminated before the
              end of the period for which you have already paid, and except as expressly provided in these terms,
              SEASONS will not refund any fees that you have already paid.
              <br />
              <br />
              G. Reaffirmation of Authorization. Your non-termination or continued use of a Paid Subscription reaffirms
              that we are authorized to charge your Payment Method for that Paid Subscription. We may submit those
              charges for payment and you will be responsible for such charges. This does not waive our right to seek
              payment directly from you. Your charges may be payable in advance, in arrears, per usage, or as otherwise
              described when you initially selected to use the Paid Subscription.
              <br />
              <br />
              <span>
                ‍<strong className="bodyheader">What if I want to stop using the Services? </strong>
              </span>
              <strong>
                <br />
                <br />‍
              </strong>
              You’re free to do that at any time by contacting us at membership@seasons.nyc; please refer to our{" "}
              <a href="/privacy-policy">Privacy Policy</a>, as well as the licenses above, to understand how we treat
              information you provide to us after you have stopped using our Services.
              <br />
              <br />
              Seasons is also free to terminate (or suspend access to) your use of the Services or your account for any
              reason in our discretion, including your breach of these Terms. Seasons has the sole right to decide
              whether you are in violation of any of the restrictions set forth in these Terms.
              <br />
              <br />
              Account termination may result in destruction of any Content associated with your account, so keep that in
              mind before you decide to terminate your account.
              <br />
              <br />
              If you have deleted your account by mistake, contact us immediately at membership@seasons.nyc – we will
              try to help, but unfortunately, we can’t promise that we can recover or restore anything.
              <br />
              <br />
              Provisions that, by their nature, should survive termination of these Terms shall survive termination. By
              way of example, all of the following will survive termination: any obligation you have to pay us or
              indemnify us, any limitations on our liability, any terms regarding ownership or intellectual property
              rights, and terms regarding disputes between us, including without limitation the arbitration agreement.
              <br />
              <br />
              <span>
                ‍<strong className="bodyheader">What about Mobile Applications?</strong>
              </span>
              <strong>
                <br />
                <br />‍
              </strong>
              You acknowledge and agree that the availability of our mobile application is dependent on the third party
              stores from which you download the application, e.g., the App Store from Apple or the Android app market
              from Google (each an “App Store”). Each App Store may have its own terms and conditions to which you must
              agree before downloading mobile applications from such store, including the specific terms relating to
              Apple App Store set forth below. You agree to comply with, and your license to use our application is
              conditioned upon your compliance with, such App Store terms and conditions. To the extent such other terms
              and conditions from such App Store are less restrictive than, or otherwise conflict with, the terms and
              conditions of these Terms, the more restrictive or conflicting terms and conditions in these Terms apply.
              <br />
              <br />
              <span>
                ‍
                <strong className="bodyheader">
                  I use the Seasons App available via the Apple App Store – should I know anything about that?
                </strong>
              </span>
              <strong>
                <br />
                <br />‍
              </strong>
              These Terms apply to your use of all the Services, including our iOS applications (the “Application”)
              available via the Apple, Inc. (“Apple”) App Store, but the following additional terms also apply to the
              Application:
              <br />
              <br />
              (a) Both you and Seasons acknowledge that the Terms are concluded between you and Seasons only, and not
              with Apple, and that Apple is not responsible for the Application or the Content;
              <br />
              <br />
              (b) The Application is licensed to you on a limited, non-exclusive, non-transferrable, non-sublicensable
              basis, solely to be used in connection with the Services for your private, personal, non-commercial use,
              subject to all the terms and conditions of these Terms as they are applicable to the Services;
              <br />
              <br />
              (c) You will only use the Application in connection with an Apple device that you own or control;
              <br />
              <b />
              (d) You acknowledge and agree that Apple has no obligation whatsoever to furnish any maintenance and
              support services with respect to the Application;
              <br />
              <br />
              (e) In the event of any failure of the Application to conform to any applicable warranty, including those
              implied by law, you may notify Apple of such failure; upon notification, Apple’s sole warranty obligation
              to you will be to refund to you the purchase price, if any, of the Application;
              <br />
              <br />
              (f) You acknowledge and agree that Seasons, and not Apple, is responsible for addressing any claims you or
              any third party may have in relation to the Application;
              <br />
              <br />
              (g) You acknowledge and agree that, in the event of any third-party claim that the Application or your
              possession and use of the Application infringes that third party’s intellectual property rights, Seasons,
              and not Apple, will be responsible for the investigation, defense, settlement and discharge of any such
              infringement claim;
              <br />
              <br />
              (h) You represent and warrant that you are not located in a country subject to a U.S. Government embargo,
              or that has been designated by the U.S. Government as a “terrorist supporting” country, and that you are
              not listed on any U.S. Government list of prohibited or restricted parties;
              <br />
              <br />
              (i) Both you and Seasons acknowledge and agree that, in your use of the Application, you will comply with
              any applicable third-party terms of agreement which may affect or be affected by such use; and
              <br />
              <br />
              (j) Both you and Seasons acknowledge and agree that Apple and Apple’s subsidiaries are third-party
              beneficiaries of these Terms, and that upon your acceptance of these Terms, Apple will have the right (and
              will be deemed to have accepted the right) to enforce these Terms against you as the third-party
              beneficiary hereof.
              <strong className="bodyheader">
                <br />
                <br />
                Can I refer other users?
                <br />
                <br />‍
              </strong>
              From time to time Seasons may offer rewards or incentives for referring others to the Services. For
              details of any current referral offers, please see our referral page. The referring user (“Referrer”) may
              refer individuals or entities who are neither current customers of Seasons nor registered users of the
              Services (“Referee”). A registered user is a person or entity that already has an existing account with
              Seasons. There is no limit to the number of referrals that Referrer can make, nor the cumulative rewards
              or incentives that the Referrer may receive through such special offer, unless otherwise indicated.
              Referrer will receive the stated reward or incentive for each Referee sent by the Referrer that completes
              the required action described in that specific offer (such as signing up for an account or making a
              purchase). All Referees must be first-time recipients of the offer, and multiple referrals to the same
              individual or entity will be disregarded. Seasons reserves the right to modify or terminate any special
              offers at any time and to revoke from Referrer and Referee the special offer at Seasons&#x27; discretion
              for any reason or for no reason whatsoever. If Seasons determines that Referrer or Referee is attempting
              to obtain unfair advantage or otherwise violate the terms or spirit of such special offer, Seasons
              reserves the right to (a) revoke any rewards or incentives issued to either Referrer or Referee and/or (b)
              charge the Referrer or Referee for any rewards or incentives (1) used by Referrer or Referee prior to such
              revocation or (2) issued by Seasons to any ineligible Referrer or Referee. All special offers are subject
              to any other terms, conditions and restrictions set forth on the Services or presented in connection with
              the special offer.
              <strong className="bodyheader">
                <br />
                <br />
                What else do I need to know?
                <br />
                <br />‍
              </strong>
              <em>Warranty Disclaimer.</em> Seasons and its licensors, suppliers, partners, parent, subsidiaries or
              affiliated entities, and each of their respective officers, directors, members, employees, consultants,
              contract employees, representatives and agents, and each of their respective successors and assigns
              (Seasons and all such parties together, the “Seasons Parties”) make no representations or warranties
              concerning the Services, including without limitation regarding any Content contained in or accessed
              through the Services or any Products, and the Seasons Parties will not be responsible or liable for the
              accuracy, copyright compliance, legality, or decency of material contained in or accessed through the
              Services or any claims, actions, suits procedures, costs, expenses, damages or liabilities arising out of
              use of, or in any way related to your participation in, the Services. The Seasons Parties make no
              representations or warranties regarding suggestions or recommendations of services or products offered or
              purchased through or in connection with the Services including, without limitation, any Products. Products
              and services purchased or offered (whether or not following such recommendations and suggestions) through
              the Services are provided “AS-IS” and without any warranty of any kind from the Seasons Parties or others
              (unless, with respect to such others only, provided expressly and unambiguously in writing by a designated
              third party for a specific product). THE SERVICES AND CONTENT ARE PROVIDED BY SEASONS (AND ITS LICENSORS
              AND SUPPLIERS) ON AN “AS-IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING,
              WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              NON-INFRINGEMENT, OR THAT USE OF THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE. SOME STATES DO NOT
              ALLOW LIMITATIONS ON HOW LONG AN IMPLIED WARRANTY LASTS, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
              <br />
              <br />‍<em>Limitation of Liability</em>. TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, UNDER NO
              CIRCUMSTANCES AND UNDER NO LEGAL THEORY (INCLUDING, WITHOUT LIMITATION, TORT, CONTRACT, STRICT LIABILITY,
              OR OTHERWISE) SHALL ANY OF THE SEASONS PARTIES BE LIABLE TO YOU OR TO ANY OTHER PERSON FOR (A) ANY
              INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES OF ANY KIND, INCLUDING DAMAGES FOR LOST
              PROFITS, BUSINESS INTERRUPTION, LOSS OF DATA, LOSS OF GOODWILL, WORK STOPPAGE, ACCURACY OF RESULTS, OR
              COMPUTER FAILURE OR MALFUNCTION, (B) ANY SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY, (C) ANY AMOUNT, IN THE
              AGGREGATE, IN EXCESS OF THE GREATER OF (I) ONE-HUNDRED ($100) DOLLARS OR (II) THE AMOUNTS PAID AND/OR
              PAYABLE BY YOU TO SEASONS IN CONNECTION WITH THE SERVICES IN THE TWELVE (12) MONTH PERIOD PRECEDING THIS
              APPLICABLE CLAIM OR (D) ANY MATTER BEYOND OUR REASONABLE CONTROL. SOME STATES DO NOT ALLOW THE EXCLUSION
              OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL OR CERTAIN OTHER DAMAGES, SO THE ABOVE LIMITATION AND
              EXCLUSIONS MAY NOT APPLY TO YOU.
              <br />
              <br />‍<em>Indemnity</em>. You agree to indemnify and hold the Seasons Parties harmless from and against
              any and all claims, liabilities, damages (actual and consequential), losses and expenses (including
              attorneys’ fees) arising from or in any way related to any claims relating to (a) your use of the Services
              (including any actions taken by a third party using your account) and any Products, and (b) your violation
              of these Terms.
              <br />
              <br />
              <em>Assignment</em>. You may not assign, delegate or transfer these Terms or your rights or obligations
              hereunder, or your Services account, in any way (by operation of law or otherwise) without Seasons&#x27;
              prior written consent. We may transfer, assign, or delegate these Terms and our rights and obligations
              without consent.
              <br />
              <br />‍<em>Choice of Law</em>. These Terms are governed by and will be construed under the Federal
              Arbitration Act, applicable federal law, and the laws of the State of New York, without regard to the
              conflicts of laws provisions thereof.
              <br />
              <br />‍<em>Arbitration Agreement. </em>Please read the following ARBITRATION AGREEMENT carefully because
              it requires you to arbitrate certain disputes and claims with Seasons and limits the manner in which you
              can seek relief from Seasons. Both you and Seasons acknowledge and agree that for the purposes of any
              dispute arising out of or relating to the subject matter of these Terms, Seasons&#x27; officers,
              directors, employees and independent contractors (“Personnel”) are third-party beneficiaries of these
              Terms, and that upon your acceptance of these Terms, Personnel will have the right (and will be deemed to
              have accepted the right) to enforce these Terms against you as the third-party beneficiary hereof.
              <em>(a) Arbitration Rules; Applicability of Arbitration Agreement</em>. The parties shall use their best
              efforts to settle any dispute, claim, question, or disagreement arising out of or relating to the subject
              matter of these Terms directly through good-faith negotiations, which shall be a precondition to either
              party initiating arbitration. If such negotiations do not resolve the dispute, it shall be finally settled
              by binding arbitration in New York County, New York. The arbitration will proceed in the English language,
              in accordance with the JAMS Streamlined Arbitration Rules and Procedures (the “Rules”) then in effect, by
              one commercial arbitrator with substantial experience in resolving intellectual property and commercial
              contract disputes. The arbitrator shall be selected from the appropriate list of JAMS arbitrators in
              accordance with such Rules. Judgment upon the award rendered by such arbitrator may be entered in any
              court of competent jurisdiction.
              <br />
              <br />
              (b) <em>Costs of Arbitration</em>. The Rules will govern payment of all arbitration fees. Seasons will pay
              all arbitration fees for claims less than seventy-five thousand ($75,000) dollars. Seasons will not seek
              its attorneys’ fees and costs in arbitration unless the arbitrator determines that your claim is
              frivolous.
              <br />
              <br />
              (c) <em>Small Claims Court; Infringement</em>. Either you or Seasons may assert claims, if they qualify,
              in small claims court in New York County, New York or any United States county where you live or work.
              Furthermore, notwithstanding the foregoing obligation to arbitrate disputes, each party shall have the
              right to pursue injunctive or other equitable relief at any time, from any court of competent
              jurisdiction, to prevent the actual or threatened infringement, misappropriation or violation of a
              party&#x27;s copyrights, trademarks, trade secrets, patents or other intellectual property rights.
              <br />
              <br />
              (d) <em>Waiver of Jury Trial</em>. YOU AND SEASONS WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO
              COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR JURY. You and Seasons are instead choosing to have claims
              and disputes resolved by arbitration. Arbitration procedures are typically more limited, more efficient,
              and less costly than rules applicable in court and are subject to very limited review by a court. In any
              litigation between you and Seasons over whether to vacate or enforce an arbitration award, YOU AND SEASONS
              WAIVE ALL RIGHTS TO A JURY TRIAL, and elect instead to have the dispute be resolved by a judge.(e)
              <br />
              <br />‍<em>Waiver of Class or Consolidated Actions</em>. ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS
              ARBITRATION AGREEMENT MUST BE ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS BASIS.
              CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR LITIGATED JOINTLY OR CONSOLIDATED WITH
              THOSE OF ANY OTHER CUSTOMER OR USER. If however, this waiver of className or consolidated actions is
              deemed invalid or unenforceable, neither you nor Seasons is entitled to arbitration; instead all claims
              and disputes will be resolved in a court as set forth in (g) below.
              <strong>
                <br />
                <br />‍
              </strong>
              (f) <em>Opt-out</em>. You have the right to opt out of the provisions of this Section by sending written
              notice of your decision to opt out to the following address: 138 Mulberry St., 5A2, New York, NY 10013
              postmarked within thirty (30) days of first accepting these Terms. You must include (i) your name and
              residence address, (ii) the email address and/or telephone number associated with your account, and (iii)
              a clear statement that you want to opt out of these Terms’ arbitration agreement.
              <br />
              <br />
              (g) <em>Exclusive Venue</em>. If you send the opt-out notice in (f), and/or in any circumstances where the
              foregoing arbitration agreement permits either you or Seasons to litigate any dispute arising out of or
              relating to the subject matter of these Terms in court, then the foregoing arbitration agreement will not
              apply to either party, and both you and Seasons agree that any judicial proceeding (other than small
              claims actions) will be brought in the state or federal courts located in, respectively, New York County,
              New York, or the federal district in which that county falls.
              <br />
              <br />
              (h) <em>Severability</em>. If the prohibition against className actions and other claims brought on behalf
              of third parties contained above is found to be unenforceable, then all of the preceding language in this
              Arbitration Agreement section will be null and void. This arbitration agreement will survive the
              termination of your relationship with Seasons.
              <br />
              <br />‍<em>Miscellaneous</em>. You will be responsible for paying, withholding, filing, and reporting all
              taxes, duties, and other governmental assessments associated with your activity in connection with the
              Services, provided that the Seasons may, in its sole discretion, do any of the foregoing on your behalf or
              for itself as it sees fit. The failure of either you or us to exercise, in any way, any right herein shall
              not be deemed a waiver of any further rights hereunder. If any provision of these Terms are found to be
              unenforceable or invalid, that provision will be limited or eliminated, to the minimum extent necessary,
              so that these Terms shall otherwise remain in full force and effect and enforceable. You and Seasons agree
              that these Terms are the complete and exclusive statement of the mutual understanding between you and
              Seasons, and that these Terms supersede and cancel all previous written and oral agreements,
              communications and other understandings relating to the subject matter of these Terms. You hereby
              acknowledge and agree that you are not an employee, agent, partner, or joint venture of Seasons, and you
              do not have any authority of any kind to bind Seasons in any respect whatsoever.
              <br />
              <br />
              Except as expressly set forth in the sections above regarding the Apple Application and the arbitration
              agreement, you and Seasons agree there are no third-party beneficiaries intended under these Terms.
            </div>
          </div>
        </div>
      </Grid>
    </Layout>
  )
})

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: Navigation_Query,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default TermsOfService
