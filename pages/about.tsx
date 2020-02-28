import Head from "next/head"
import { Nav } from "../components/Nav/Nav"
import Link from "next/link"

const about = () => (
  <>
    <Head>
      <title>About</title>
      <meta content="Seasons change. Your wardrobe should change with them." name="description" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link href="css/normalize.css" rel="stylesheet" type="text/css" />
      <link href="css/components.css" rel="stylesheet" type="text/css" />
      <link href="css/fonts.css" rel="stylesheet" type="text/css" />
      <link href="css/seasons-4d21cb.css" rel="stylesheet" type="text/css" />
      <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
      <link href="images/webclip.png" rel="apple-touch-icon" />
      <script src="https://www.googletagmanager.com/gtag/js?id=UA-35944235-1"></script>
    </Head>

    <body>
      <Nav />
      <div className="aboutherosection">
        <div className="aboutherocontainer">
          <div className="aboutcontent">
            <h1 className="abouttitle">
              <span className="abouttitleheader">
                Our mission
                <br />
              </span>
              Democratize access to fashion and rethink the idea of ownership by creating a more circular, sustainable
              fashion economy.
              <br />
            </h1>
          </div>
        </div>
        <div className="heroimage-left-about"></div>
        <div className="heroimage-right-copy"></div>
      </div>
      <div className="storysection">
        <div className="storycontainer">
          <div className="storyright"></div>
          <div className="storyleft">
            <div className="abouttitlelightheader">Why we&#x27;re doing this</div>
            <div className="lightdescription">
              We want to provide people like us an alternative to retail and create a private community around shared
              access. By building a deeper relationship with our members and the community, we have the opportunity to
              create something really special.
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className="storysection2">
        <div className="storycontainer">
          <div className="storytworight">
            <div className="abouttitlelightheader">Bigger than gender</div>
            <div className="lightdescription">
              We’ve started with menswear and streetwear because they’re two of the most overlapping categories in
              fashion. Gender lines are being blurred and it’s no longer about men’s or women’s. It&#x27;s about whether
              you like something or not and finding a size that fits.
            </div>
          </div>
          <div className="storyright"></div>
        </div>
      </div>
      <div className="valuesthings">
        <div className="valuescontainer">
          <div className="values">
            <div className="abouttitledarkheader">Our values</div>
            <div className="valuesdescription">
              1. Community
              <br />
              2. Sustainability
              <br />
              3. Financial literacy
            </div>
          </div>
          <div className="thingstoliveby">
            <div className="abouttitledarkheader">Things we live by</div>
            <div className="valuesdescription">
              1. Collect stories, not things
              <br />
              2. Create inspiration
              <br />
              3. Loyalty over everything
              <br />
              4. Travel more
              <br />
              5. Be honest
              <br />
              6. Invest in your community
              <br />
              7. No fake friends
              <br />
              8. Make more, consume less
              <br />
              9. Have a plan A, B, and C<br />
              10. Pay it forward
            </div>
          </div>
        </div>
      </div>
      <div className="team">
        <div className="aboutsectionheaderdark">
          <div className="abouttitledarkheader-copy">Who we are</div>
        </div>
        <div className="profilecolumns w-row">
          <div className="column-22 w-col w-col-3 w-col-tiny-6">
            <div className="profilephoto"></div>
            <div className="profiletext1">Regy Perlera</div>
            <div className="profiletext2">Founder, CEO</div>
            <div className="profiletext4">@regyperlera</div>
          </div>
          <div className="column-23 w-col w-col-3 w-col-tiny-6">
            <div className="profilephoto2"></div>
            <div className="profiletext1">Luc Succes</div>
            <div className="profiletext2">Co-Founder, CTO</div>
            <div className="profiletext4">@lucsucces</div>
          </div>
          <div className="column-24 w-col w-col-3 w-col-tiny-6">
            <div className="profilephoto3"></div>
            <div className="profiletext1">Perla Trejo</div>
            <div className="profiletext2">Director, Operations</div>
            <div className="profiletext4">@perlatrejo</div>
          </div>
          <div className="column-25 w-col w-col-3 w-col-tiny-6">
            <div className="profilephoto4"></div>
            <div className="profiletext1">San Pham</div>
            <div className="profiletext2">Director, Merchandise Planning</div>
            <div className="profiletext4">@sanpham</div>
          </div>
        </div>
      </div>
      <div className="investors">
        <div className="aboutsectionheader">
          <div className="abouttitledarkheader">Who we&#x27;re backed by</div>
          <a href="#" className="backedlink">
            See all
          </a>
          <div className="abouttitledarkheaderright">
            We&#x27;re fortunate to have these amazing partners supporting our vision.
          </div>
        </div>
        <div className="profilecolumns w-row">
          <div className="column-22 w-col w-col-3 w-col-medium-6 w-col-small-6 w-col-tiny-tiny-stack">
            <div className="investorlogo1"></div>
          </div>
          <div className="column-23 w-col w-col-3 w-col-medium-6 w-col-small-6 w-col-tiny-tiny-stack">
            <div className="investorlogo2"></div>
          </div>
          <div className="column-24 w-col w-col-3 w-col-medium-6 w-col-small-6 w-col-tiny-tiny-stack">
            <div className="investorlogo3"></div>
          </div>
          <div className="column-25 w-col w-col-3 w-col-medium-6 w-col-small-6 w-col-tiny-tiny-stack">
            <div className="investorlogo4"></div>
          </div>
        </div>
      </div>
      <div className="getintouch">
        <div className="contactinfocontainer">
          <div className="getintouchfooter">
            <div className="abouttitledarkheader">Get in touch.</div>
            <div className="abouttitledarkheaderright-copy">
              Interested in what we&#x27;re building? Email us or DM us on Instagram.
            </div>
          </div>
          <div className="getintouchright">
            <div className="contactsubheader">Email</div>
            <div className="contactnames">
              <a href="mailto:membership@seasons.nyc?subject=Hello" className="link-10">
                membership@seasons.nyc
              </a>
            </div>
            <div className="contactsubheader2">Instagram</div>
            <div className="contactnames2">
              <a href="https://www.instagram.com/seasons.ny/" className="link-9">
                seasons.ny
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footersection">
        <div className="footercontainer">
          <Link href="/terms-of-service">
            <a className="subheaderlink">Terms of Service</a>
          </Link>
          <a href="privacy-policy.html" className="subheaderlink">
            Privacy Policy
          </a>
          <a href="https://www.instagram.com/seasons.ny" className="subheaderlink">
            Instagram
          </a>
          <div className="footerlinkright">© 2019 Seasons. All Rights Reserved.</div>
        </div>
      </div>
    </body>
  </>
)

export default about
