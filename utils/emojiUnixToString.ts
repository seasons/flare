export const emojiUnixToString = (emoji: string[]) => {
  const parsedString = emoji?.map((e) => parseInt(e, 16))

  return parsedString?.length > 0 ? String.fromCodePoint(...parsedString) : ""
}
