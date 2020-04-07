import React from "react"
import Head from "next/head"
import { Nav } from "../../components/Nav/Nav"
import { ColumnList, Hero, ProductRail, UsaMap } from "./Components"
import { Spacer, Layout, Separator } from "../../components"
import { useRouter } from "next/router"
import withData from "../../lib/apollo"
import { useQuery } from "@apollo/react-hooks"
import { HOME_QUERY } from "./homeQuery"
import { ChooseMembership } from "./Components/ChooseMembership"

const Home = withData(() => {
  const router = useRouter()
  const { query } = router
  const { data } = useQuery(HOME_QUERY, {})

  console.log("data", data)

  return (
    <Layout fixedNav>
      <Head>
        <title>Seasons</title>
        <meta content="Seasons change. Your wardrobe should change with them." name="description" />
      </Head>
      <Nav fixed />
      <Spacer mt="100px" />
      <Hero />
      <ColumnList
        items={[
          {
            title: "Pick your 3 styles",
            text:
              "Browse our curated brands and reserve up to 3 tops at a time. We'll deliver them straight to your door with a pre-paid return shipping label.",
          },
          {
            title: "Rotate them out",
            text:
              "Wear them once or as many times as you want. Ready for something new? Return all 3 of your pieces and reserve your next order.",
          },
          {
            title: "Shipping & dry cleaning's on us",
            text:
              "We handle the back and forth, restoring and cleaning each piece before it gets to you. Oh, rental insurance is covered too.",
          },
        ]}
      />
      <ProductRail title="Just added" products={data?.justAddedProducts} />
      <Separator />
      <Spacer mb={6} />
      <UsaMap />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <ProductRail title="Just added" products={data?.justAddedProducts} />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <ChooseMembership />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <ColumnList
        title="Members benefits"
        items={[
          {
            title: "Quick & easy returns",
            text: "Pack up all 3 pieces, insert the prepaid return label, and drop off at the nearest UPS location.",
          },
          {
            title: "Free dry cleaning",
            text: "Each piece is carefully inspected, cleaned and restored before being delivered to your door.",
          },
          {
            title: "1 to 2 day shipping",
            text: "All orders are processed, shipped and delivered within 1- 2 business days via UPS.",
          },
          {
            title: "Rental insurance",
            text:
              "Any stain, tear or damage gets fixed by us. Just pack it up and ship it back. Lost it? Things happen. We'll just charge a fee to replace it.",
          },
          {
            title: "New styles as they drop",
            text:
              "We buy the newest and latest collections. See something you like that we don't carry? Send us a message on Instagram.",
          },
          {
            title: "Pause or cancel anytime",
            text:
              "Want to take a break for a month? Pause or cancel your membership right in the app. Easily renew whenever you want.",
          },
        ]}
      />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
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
                    We&#x27;re exclusively servicing New York City right now. Manhattan, Brooklyn, Queens, The Bronx,
                    and Staten Island. Sign up for updates to get notified when we roll out service in more cities.
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
                    Women&#x27;s. It&#x27;s about whether you like something or not and helping you find a size that
                    fits.
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
                    We&#x27;re only in NYC right now but join the waitlist to get notified when we launch in other
                    cities! Currently serving Manhattan, Brooklyn, Queens, The Bronx, and Staten Island.
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
    </Layout>
  )
})

export default Home
