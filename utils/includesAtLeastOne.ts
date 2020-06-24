export function IncludesAtLeastOne(containerArray: string[], checkArray: string[]): boolean {
  return checkArray.reduce(function OrIncludesItem(acc: boolean, item: string): boolean {
    return acc || containerArray.includes(item)
  }, false)
}
