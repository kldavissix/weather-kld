export const titleCase = (input) => {
  return String(input)
    .split(" ")
    .map((word) => {
      if (!word.length) return ""
      return word[0].toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(" ")
}
