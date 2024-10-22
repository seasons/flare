import Router from "next/router"
import NProgress from "nprogress"
import React from "react"

interface RouterProgressProps {
  color: string
  height?: string
  startPosition: number
  stopDelayMs: number
  options?: {}
}

export class RouterProgress extends React.Component<RouterProgressProps> {
  static defaultProps = {
    color: "#000",
    startPosition: 0.3,
    stopDelayMs: 200,
    height: 3,
  }

  timer = null

  routeChangeStart = () => {
    NProgress.set(this.props.startPosition)
    NProgress.start()
  }

  routeChangeEnd = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      NProgress.done(true)
    }, this.props.stopDelayMs)
  }

  render() {
    const { color, height } = this.props

    return (
      <style jsx global>{`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: ${color};
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: ${height}px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          opacity: 1;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }
        #nprogress .spinner {
          display: "block";
          position: fixed;
          z-index: 1031;
          bottom: 15px;
          left: 15px;
        }
        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;
          border: solid 2px transparent;
          border-top-color: ${color};
          border-left-color: ${color};
          border-radius: 50%;
          -webkit-animation: nprogresss-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }
        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }
        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }
        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    )
  }

  componentDidMount() {
    const { options } = this.props

    if (options) {
      NProgress.configure(options)
    }

    Router.events.on("routeChangeStart", this.routeChangeStart)
    Router.events.on("routeChangeComplete", this.routeChangeEnd)
    Router.events.on("routeChangeError", this.routeChangeEnd)
  }
}
