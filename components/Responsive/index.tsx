import { createMedia } from "@artsy/fresnel"

// TODO: We need this to be 0-based, whereas currently in palette xs is defined
//       as 767. We should move this up to palette, but we need to give the
//       migration path for users of the current Responsive component some
//       serious thought.
const newThemeBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1025,
  xl: 1200,
}

const ReactionMedia = createMedia({
  breakpoints: newThemeBreakpoints,
  interactions: {
    hover: "(pointer: coarse), (-moz-touch-enabled: 1)",
    notHover: "not all and (pointer: coarse), not all and (-moz-touch-enabled: 1)",
  },
})

export const Media = ReactionMedia.Media
export const MediaContextProvider = ReactionMedia.MediaContextProvider
export const createMediaStyle = ReactionMedia.createMediaStyle
export const SortedBreakpoints = ReactionMedia.SortedBreakpoints
export const findBreakpointsForWidths = ReactionMedia.findBreakpointsForWidths
export const findBreakpointAtWidth = ReactionMedia.findBreakpointAtWidth
export const valuesWithBreakpointProps = ReactionMedia.valuesWithBreakpointProps

// TODO: Simplify this hideous typing.
export type MatchingMediaQueries = Array<"hover" | "notHover" | typeof SortedBreakpoints[0]>
