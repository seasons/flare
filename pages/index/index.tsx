import React from "react"
import Head from "next/head"
import { Nav } from "../../components/Nav/Nav"
import Link from "next/link"
import { Steps } from "./Components/Steps"

const Home = () => (
  <>
    <Head>
      <title>Seasons</title>
      <meta content="Seasons change. Your wardrobe should change with them." name="description" />
    </Head>
    <Nav fixed />
    <div className="alertmessage">
      <div className="brandscarriedcontainer">
        <a href="/about" className="alertcopy">
          NYC Memberships are now open 🎉 <br />
          Join the waitlist to secure your spot.
        </a>
      </div>
    </div>
    <div className="herosection">
      <div className="herocontainer">
        <div className="content">
          <h1 className="title">
            <span className="text-span-4">This is Seasons. </span>
            <br />A members only rental subscription service <br />
            for menswear &amp; streetwear.
          </h1>
          <div className="ctas">
            <a href="https://signup.seasons.nyc/" className="apply w-inline-block">
              <div className="applycopy">Join the waitlist</div>
            </a>
            <a href="#Membership" className="learnmore w-inline-block">
              <div className="learnmorecopy">Learn more</div>
            </a>
          </div>
          <div className="herodescriptioncopy">
            NYC Memberships are now open. Join the waitlist to secure your spot and get an invite.
          </div>
          <div className="fineprint">
            By joining the waitlist you agree to our Privacy Policy &amp; Terms of Service
          </div>
        </div>
        <div className="mobiledevices">
          <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="" />
        </div>
        <div className="infographics"></div>
        <div className="herodevices"></div>
      </div>
      <div className="heroimage-left"></div>
      <div className="heroimage-right"></div>
    </div>
    <div className="howsection">
      <div className="howitowrksheader">
        <div className="trendingtitle">How it works</div>
        <a href="#Membership" className="trendingsubtitle">
          Learn more
        </a>
      </div>
      <div className="howcontainer">
        <div className="howitworkscontainer">
          <div className="trendingtitle">How it works</div>
          <a href="#FAQ" className="trendingsubtitle">
            Learn more
          </a>
        </div>
        <div className="howitworks">How it works</div>
       </div>
       </div>
    <Steps/>
    <div className="justadded">
      <div className="trendingcontainer">
        <div className="trendingtitle">Just added</div>
        <a href="/browse" className="trendingsubtitle">
          See all
        </a>
      </div>
      <div className="trendingproductcontainer">    
       <div className="columns w-row">
          <Link href="/product/[Product]" as="/product/clockwork-orange-open-eyes-jacket-black">
            <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
              <div className="productimage1">
                <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
              </div>
              <div className="brandtitle">
                <strong className="brandname">Undercover</strong>
              </div>
              <div className="productname">S M L </div>
            </div>
          </Link>
          <Link href="/product/[Product]" as="/product/hooded-floral-knit-sweater-black">
            <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
              <div className="productimage2">
                <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
              </div>
              <div className="brandtitle">
                <strong className="brandname">Engineered Garments</strong>
              </div>
              <div className="productname">S M L XL</div>
            </div>
          </Link>
          <Link href="/product/[Product]" as="/product/quilted-worker-jacket-blue">
            <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
              <div className="productimage3">
                <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
              </div>
              <div className="brandtitle">
                <strong className="brandname">Craig Green</strong>
              </div>
              <div className="productname">S M L XL</div>
            </div>
          </Link>

          <Link href="/product/[Product]" as="/product/checked-knit-jumper-brown">
            <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
              <div className="productimage4">
                <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
              </div>
              <div className="brandtitle">
                <strong className="brandname">Sacai</strong>
              </div>
              <div className="productname">S M L</div>
            </div>
          </Link>    
          </div>
          <div className="columnsbottom w-row">    

          <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
            <div className="productimage7">
              <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
            </div>
            <div className="brandtitle">
              <strong className="brandname">Nanushka</strong>
            </div>
            <div className="productname">S M L XL</div>
          </div>
          <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
            <div className="productimage8">
              <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
            </div>
            <div className="brandtitle">
              <strong className="brandname">Acne Studios</strong>
            </div>
            <div className="productname">S M L</div>
          </div>
          <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
            <div className="productimage10">
              <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
            </div>
            <div className="brandtitle">
              <strong className="brandname">Moncler</strong>
            </div>
            <div className="productname">M L XL</div>
          </div>
        </div>
      </div>
    </div>
    <div id="NotInNYC" className="citysection">
      <div className="middleemailcontainer">
        <div className="middleemailleft">
          <div className="middleemailtitle">
            <span className="text-span-6">Not in NYC? </span>
            <br />
            Join the waitlist to be the first to know when we launch in other cities.
          </div>
          <a href="https://signup.seasons.nyc/" className="middle-apply w-inline-block">
            <div className="middleapplycopy">Join the waitlist</div>
          </a>
        </div>
        <div className="middleemailright"></div>
      </div>
    </div>
    <div className="weekdayfits">
      <div className="trendingcontainer">
        <div className="trendingtitle">Recently reserved</div>
        <a href="/browse" className="trendingsubtitle">
          See all
        </a>
      </div>
      <div className="trendingproductcontainer">
        <div className="columns w-row">
          <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
            <div className="productimage13">
              <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
            </div>
            <div className="brandtitle">
              <strong className="brandname">Martine Rose</strong>
            </div>
            <div className="productname">S M L </div>
          </div>
          <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
            <div className="productimage14">
              <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
            </div>
            <div className="brandtitle">
              <strong className="brandname">Amiri</strong>
            </div>
            <div className="productname">S M L</div>
          </div>
          <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
            <div className="productimage15">
              <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
            </div>
            <div className="brandtitle">
              <strong className="brandname">Brain Dead x A.P.C.</strong>
            </div>
            <div className="productname">S M L</div>
          </div>
          <div className="item w-col w-col-3 w-col-small-6 w-col-tiny-6">
            <div className="productimage16">
              <a href="https://signup.seasons.nyc/" className="imageclick w-inline-block"></a>
            </div>
            <div className="brandtitle">
              <strong className="brandname">John Elliott</strong>
            </div>
            <div className="productname">S M L XL</div>
          </div>
        </div>
        
      </div>
    </div>
    <div id="Membership" className="membershipsection">
      <div className="membershipcontainer">
        <div className="membershiptitle-copy">Choose your membership</div>
        <div className="planscontainer">
          <div className="essential">
            <div className="plantitle">
              <div className="plancopyprices">ESSENTIAL</div>
            </div>
            <div className="planleftright">
              <div className="planbenefits">
                <div className="plandetails">3 items for the month</div>
                <div className="plandetails">
                  Over <strong>50</strong> curated brands
                </div>
                <div className="plandetails">Free returns &amp; dry cleaning</div>
                <div className="plandetails">Pause or cancel anytime.</div>
              </div>
              <div className="righttopbottom">
                <div className="pricecontainer">
                  <div className="cost">
                    <div className="moneysign">$</div>
                    <div className="amount">155</div>
                  </div>
                  <div className="permonth">/ month</div>
                </div>
                <a href="https://signup.seasons.nyc/" className="plancta w-inline-block">
                  <div className="planjoin">Select</div>
                </a>
              </div>
            </div>
          </div>
          <div className="allaccess">
            <div className="allaccesstitle">
              <div className="plancopyprices">ALL ACCESS</div>
            </div>
            <div className="planleftright">
              <div className="allaccessbenefits">
                <div className="plandetails">3 items at a time</div>
                <div className="plandetails">Unlimited swaps</div>
                <div className="plandetails">
                  Over <strong>50</strong> curated brands
                </div>
                <div className="plandetails">Free returns &amp; dry cleaning</div>
                <div className="plandetails">Pause or cancel anytime.</div>
              </div>
              <div className="righttopbottom">
                <div className="allaccesspricecontainer">
                  <div className="cost">
                    <div className="moneysign">$</div>
                    <div className="amount">195</div>
                  </div>
                  <div className="permonth">/ month</div>
                </div>
                <a href="https://signup.seasons.nyc/" className="allaccesscta w-inline-block">
                  <div className="planjoin">Select</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="membackgroundleft"></div>
      <div className="membackgroundright"></div>
    </div>
    <div className="perks-bennefits">
      <div className="benefitscontainer">
        <div className="membershiptitle">Member benefits</div>
        <div className="benefitcolumn1 w-row">
          <div className="column-13 w-col w-col-4 w-col-small-4">
            <div className="benefitblock">
              <div className="benefitimage"></div>
              <div className="answersbottom">
                <div className="answertitle">Quick &amp; easy returns</div>
                <div className="answer">
                  Pack up all 3 pieces, insert the prepaid return label, and drop off at the nearest UPS location.
                </div>
              </div>
            </div>
          </div>
          <div className="column-14 w-col w-col-4 w-col-small-4">
            <div className="benefitblock">
              <div className="benefitimagecleaning"></div>
              <div className="answersbottom">
                <div className="answertitle">Free dry cleaning</div>
                <div className="answer">
                  Each piece is carefully inspected, cleaned and restored before being delivered to your door.{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="column-15 w-col w-col-4 w-col-small-4">
            <div className="benefitblock">
              <div className="benefitimageshipping"></div>
              <div className="answersbottom">
                <div className="answertitle">2-day shipping</div>
                <div className="answer">
                  All orders are processed, shipped and delivered within 2 business days via UPS.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="benefitcolumn2 w-row">
          <div className="column-13 w-col w-col-4 w-col-small-4">
            <div className="benefitblock">
              <div className="benefitimageinsurance"></div>
              <div className="answersbottom">
                <div className="answertitle">Rental insurance</div>
                <div className="answer">
                  Any stain, tear or damage gets fixed by us. Just pack it up and ship it back. Lost it? Things happen.
                  We&#x27;ll just charge a fee to replace it.{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="column-16 w-col w-col-4 w-col-small-4">
            <div className="benefitblock">
              <div className="benefitimageearly"></div>
              <div className="answersbottom">
                <div className="answertitle">New styles as they drop</div>
                <div className="answer">
                  We buy the newest and latest collections. See something you like that we don&#x27;t carry? Send us a
                  message on{" "}
                  <a href="#" className="link-8">
                    Instagram
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
          <div className="column-17 w-col w-col-4 w-col-small-4">
            <div className="benefitblock">
              <div className="benefitimagepause"></div>
              <div className="answersbottom">
                <div className="answertitle">Pause or cancel anytime</div>
                <div className="answer">
                  Want to take a break for a month? Pause or cancel your membership right in the app. Easily renew
                  whenever you want.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="FAQ" className="faqsection">
      <div className="faqcontainer">
        <div className="faqtitle">Frequently asked questions</div>
        <div className="web-faqcolumns1 w-row">
          <div className="column-4 w-col w-col-4 w-col-stack">
            <div className="answercontainer1">
              <div className="faqcount">01.</div>
              <div className="answersbottom">
                <div className="answertitle">Where is Seasons available?</div>
                <div className="answer">
                  We&#x27;re exclusively servicing New York City right now. Manhattan, Brooklyn, Queens, The Bronx, and
                  Staten Island. Sign up for updates to get notified when we roll out service in more cities.
                </div>
              </div>
            </div>
          </div>
          <div className="column-5 w-col w-col-4 w-col-stack">
            <div className="answercontainer1">
              <div className="faqcount">02.</div>
              <div className="answersbottom">
                <div className="answertitle">Who is Seasons for?</div>
                <div className="answer">
                  Seasons is for everyone. Gender lines have been blurred and it&#x27;s no longer about Men&#x27;s or
                  Women&#x27;s. It&#x27;s about whether you like something or not and helping you find a size that fits.
                </div>
              </div>
            </div>
          </div>
          <div className="column-6 w-col w-col-4 w-col-stack">
            <div className="answercontainer1">
              <div className="faqcount">03.</div>
              <div className="answersbottom">
                <div className="answertitle">How long can I keep my 3 pieces?</div>
                <div className="answer">
                  On an{" "}
                  <a href="#Membership" className="link-4">
                    Essential
                  </a>{" "}
                  plan you have 28 days to wear and return (don&#x27;t worry, we&#x27;ll remind you). With an{" "}
                  <a href="#Membership" className="link-3">
                    All Access
                  </a>{" "}
                  plan you&#x27;re free to keep them as long as you want and swap out anytime.{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="web-faqcolumns2 w-row">
          <div className="column-7 w-col w-col-4 w-col-stack">
            <div className="answercontainer1">
              <div className="faqcount">04.</div>
              <div className="answersbottom">
                <div className="answertitle">Want more than 3 pieces?</div>
                <div className="answer">
                  Unfortunately we&#x27;re not offering slot upgrades just yet. It&#x27;s something we&#x27;re still
                  working on and will roll out soon. Have thoughts? Shoot us a message at{" "}
                  <a href="mailto:membership@seasons.nyc?subject=Hello" className="link-2">
                    membership@seasons.nyc
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="column-8 w-col w-col-4 w-col-stack">
            <div className="answercontainer1">
              <div className="faqcount">05.</div>
              <div className="answersbottom">
                <div className="answertitle">Received a damaged item?</div>
                <div className="answer">
                  This rarely happens, but if it does, contact our customer service team, pack it up and send it back
                  using the prepaid shipping label. We&#x27;ll make sure we take care of you.
                </div>
              </div>
            </div>
          </div>
          <div className="column-9 w-col w-col-4 w-col-stack">
            <div className="answercontainer1">
              <div className="faqcount">06.</div>
              <div className="answersbottom">
                <div className="answertitle">Are there late fees?</div>
                <div className="answer">
                  We&#x27;ll charge a $35 fee for each day it&#x27;s late (along with the monthly charge for your
                  subscription). This only applies to the Essentials membership or if you cancel or pause your plan.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-faqcolumns1 w-row">
          <div className="column-4 w-col w-col-6 w-col-tiny-tiny-stack">
            <div className="mobile-answercontainer1">
              <div className="faqnumber">01.</div>
              <div className="answersbottom">
                <div className="answertitle">
                  <strong>Where is Seasons available?</strong>
                  <br />
                </div>
                <div className="answer">
                  We&#x27;re only in NYC right now but join the waitlist to get notified when we launch in other cities!
                  Currently serving Manhattan, Brooklyn, Queens, The Bronx, and Staten Island.
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className="column-5 w-col w-col-6 w-col-tiny-tiny-stack">
            <div className="mobile-answercontainer2">
              <div className="faqnumber">02.</div>
              <div className="answersbottom">
                <div className="answertitle">
                  <strong>Who is Seasons for?</strong>
                  <br />
                </div>
                <div className="answer">
                  Seasons is for everyone. Gender lines have been blurred and it&#x27;s no longer about Men&#x27;s or
                  Women&#x27;s. It&#x27;s about whether you like something or not and finding a size that fits.
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-faqcolumns1 w-row">
          <div className="column-4 w-col w-col-6">
            <div className="mobile-answercontainer1">
              <div className="faqnumber">03.</div>
              <div className="answersbottom">
                <div className="answertitle">
                  <strong>How long can I keep my 3 pieces?</strong>
                  <br />
                </div>
                <div className="answer">
                  On an{" "}
                  <a href="#" className="link-6">
                    Essential
                  </a>{" "}
                  plan you can hang on to them for 30 days and then send them back. With an{" "}
                  <a href="#" className="link-5">
                    All Access
                  </a>{" "}
                  plan you&#x27;re free to keep them as long as you want and swap out anytime.
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className="column-5 w-col w-col-6">
            <div className="mobile-answercontainer2">
              <div className="faqnumber">04.</div>
              <div className="answersbottom">
                <div className="answertitle">
                  <strong>What if I want more than 3 pieces?</strong>
                  <br />
                </div>
                <div className="answer">
                  Unfortunately we&#x27;re not offering slot upgrades just yet. It&#x27;s something we&#x27;re still
                  working on and will roll out soon. Interested? Shoot us a message at{" "}
                  <a href="mailto:membership@seasons.nyc?subject=Hello" className="link-7">
                    membership@seasons.nyc
                  </a>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-faqcolumns1 w-row">
          <div className="column-4 w-col w-col-6">
            <div className="mobile-answercontainer1">
              <div className="faqnumber">05.</div>
              <div className="answersbottom">
                <div className="answertitle">
                  <strong>Received a damaged item?</strong>
                  <br />
                </div>
                <div className="answer">
                  This rarely happens, but if it does, contact our customer service team, pack it up and send it back
                  using the prepaid shipping label. We&#x27;ll make sure we take care of you.
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className="column-5 w-col w-col-6">
            <div className="mobile-answercontainer2">
              <div className="faqnumber">06.</div>
              <div className="answersbottom">
                <div className="answertitle">
                  <strong>Is there a late fee if I don&#x27;t return my order on time?</strong>
                  <br />
                </div>
                <div className="answer">
                  We&#x27;ll charge a $35 fee for each day it&#x27;s late (along with the monthly charge for your
                  subscription). This only applies to the Essentials membership or if you cancel or pause your plan.
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="productgrid">
      <div className="productgridimage"></div>
    </div>
    <div className="emailsection">
      <div className="emailcontainer">
        <div className="emailtitle">
          New products added every week.
          <br />
          Enter your email to get notified.
        </div>
        <div className="form-block w-form">
          <form id="email-form" name="email-form" data-name="Email Form" className="form">
            <input
              type="email"
              className="text-field w-input"
              name="email"
              data-name="Email"
              placeholder="Enter your email address"
              id="email"
            />
            <input type="submit" value="Submit" data-wait="Please wait..." className="submit-button w-button" />
          </form>
          <div className="success-message w-form-done">
            <div className="text-block-4">Thanks! You&#x27;re all good.</div>
          </div>
          <div className="error-message w-form-fail">
            <div className="text-block-5">Uh oh. Something went wrong while submitting.</div>
          </div>
        </div>
      </div>
    </div>
    <div id="Brands" className="brandsection">
      <div className="brandcontainer">
        <div className="allbrandstitle">Brand index</div>
        <div className="lettercontainertop">
          <div className="brandletter">
            <div className="letter">A</div>
            <div className="brands">
              Acne Studios
              <br />
              Aimé Leon Dore
              <br />
              All Saints
              <br />
              Ambush
              <br />
              Amiri
              <br />
              Ami Paris
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">B</div>
            <div className="brands">
              Brain Dead
              <br />
              Barbour
              <br />
              Burberry
            </div>
          </div>
          <div id="w-node-df238d571009-5a77104c" className="brandletter">
            <div className="letter">C</div>
            <div className="brands">
              Carhartt
              <br />
              Cav Empt
              <br />
              Comme des Garçons
              <br />
              CPFM.XYZ
              <br />
              Craig Green
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">D</div>
            <div className="brands">
              Daily Paper
              <br />
              Deveux
              <br />
              Dries Van Noten
              <br />
              DUO
              <br />
              Duvetica
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">E</div>
            <div className="brands">
              Equihua
              <br />
              Ellesse
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">F</div>
            <div className="brands">Fear of God</div>
          </div>
          <div className="brandletter">
            <div className="letter">G</div>
            <div className="brands">Gucci</div>
          </div>
          <div className="brandletter">
            <div className="letter">H</div>
            <div className="brands">
              Heron Preston
              <br />
              Hevo
              <br />
              Henrik Vibskov{" "}
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">J</div>
            <div className="brands">
              Jil Sander
              <br />
              John Elliott
              <br />
              Junya Watanabe
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">K</div>
            <div className="brands">
              Kanye West
              <br />
              Kenzo
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">L</div>
            <div className="brands">
              Landlord NY
              <br />
              Levi&#x27;s
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">M</div>
            <div className="brands">
              Maison Kitsuné
              <br />
              Mammut
              <br />
              Margaret Howell
              <br />
              Martine Rose
              <br />
              Moncler
              <br />
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">N</div>
            <div className="brands">
              Nanushka
              <br />
              Nike
              <br />
              Noah
              <br />
              North Face
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">O</div>
            <div className="brands">
              Off-White
              <br />
              Only NYC
              <br />
              Our Legacy
              <br />
              Ovadia
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">P</div>
            <div className="brands">
              Palm Angels
              <br />
              Pleasures
              <br />
              Polar Skate Co.
              <br />
              Prada
              <br />
              Pyer Moss
              <br />
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">R</div>
            <div className="brands">
              Ralph Lauren
              <br />
              Rhude
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">S</div>
            <div className="brands">
              sacai
              <br />
              Sandro
              <br />
              Saturdays
              <br />
              Stone Island
              <br />
              Stüssy
            </div>
          </div>
          <div id="w-node-5ad36da04d8d-5a77104c" className="brandletter">
            <div className="letter">T</div>
            <div className="brands">
              The Invisible Space
              <br />
            </div>
          </div>
          <div className="brandletter">
            <div className="letter">W</div>
            <div className="brands">Woolrich</div>
          </div>
          <div className="brandletter">
            <div className="letter">V</div>
            <div className="brands">Val Kristopher</div>
          </div>
          <div className="brandletter">
            <div className="letter">Y</div>
            <div className="brands">
              Yeezy
              <br />
              Y-3
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footersection">
      <div className="footercontainer">
        <Link href="/terms-of-service">
          <a className="subheaderlink">Terms of Service</a>
        </Link>
        <a href="/privacy-policy" className="subheaderlink">
          Privacy Policy
        </a>
        <a href="https://www.instagram.com/seasons.ny" className="subheaderlink">
          Instagram
        </a>
        <div className="footerlinkright">© 2020 Seasons. All Rights Reserved.</div>
      </div>
    </div>
  </>
)

export default Home
