import _track, { Track as _Track, TrackingInfo, useTracking as _useTracking, TrackingProp } from "react-tracking"
import { PageViewEvent } from "./schema"
import * as Schema from "./schema"
import { setupAnalytics } from "./setupAnalytics"
export { Schema }

let analytics = null

declare const window: any

if (typeof window !== "undefined") {
  setupAnalytics()
  analytics = window?.analytics
}

/**
 * Useful notes:
 *  * At the bottom of this file there is an example of how to test track'd code.
 */
export interface Track<P = any, S = null, T extends Schema.Global = Schema.Event> extends _Track<T, P, S> {} // tslint:disable-line:no-empty-interface

/**
 * A typed tracking-info alias of the default react-tracking `track` function.
 *
 * Use this when you don’t use a callback function to generate the tracking-info and only need the global schema.
 *
 * @example
 *
 *      ```ts
 *      import { track } from "lib/utils/track"
 *
 *      @track()
 *      class brand extends React.Component<{}, null> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track({ action: "Follow brand" })
 *        handleFollow() {
 *          // ...
 *        }
 *      }
 *      ```
 */
export const track: Track = _track

/**
 * A typed page view decorator for the top level component for your screen. This is the
 * function you must use at the root of your component tree, otherwise your track calls
 * will do nothing.
 *
 * @example
 *
 *      ```ts
 *      import { screenTrack, useTracking, Schema } from "lib/utils/track"
 *
 *      interface Props extends ViewProperties {
 *        // [...]
 *      }
 *
 *      screenTrack<Props>(props => ({
 *        name: Schema.PageNames.HomePage,
 *        properties: {
 *          path: "/",
 *        },
 *      }))(props => {
 *        const tracking = useTracking()
 *        return <Button onPress={() => {
 *          tracking.trackEvent({
 *            actionName: Schema.ActionNames.ViewAllBrandsTapped,
 *            actionType: Schema.ActionTypes.Tap,
 *          })
 *        }} />
 *      })
 *
 */

export function screenTrack<P>(trackingInfo?: TrackingInfo<PageViewEvent, P, null>) {
  return _track(trackingInfo as any, {
    dispatch: (data) => {
      data.anonymousId = analytics?.user?.().anonymousId?.()
      if (process.env.ENVIRONMENT !== "production") {
        console.log("[Event tracked]", JSON.stringify(data, null, 2))
      }
      if (data.actionName) {
        return analytics?.track(data.screen, data)
      } else {
        return analytics?.page(data)
      }
    },
    dispatchOnMount: true,
  })
}

export const useTracking: () => TrackingProp<TrackingInfo<Schema.Event, null, null>> = _useTracking