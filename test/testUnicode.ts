let unicodeToReadableWord = (sourceStr: string) => {
  let reg = new RegExp("\\\\U\\+([0-9 A-F]{1,5})","g")
  let readableWord = sourceStr.replace(reg,(x,x2) => {
    return unescape(`%u${x2.toLowerCase()}`)
  })
  console.log(readableWord)
  return readableWord
}



unicodeToReadableWord("A5 73087 80037770 2006010100 506 13105.410000 \\U+516D\\U+73AF\\U+8DEF 1  \\U+5317\\U+4EAC\\U+5E02\\U+6D77\\U+6DC0\\U+533A\\U+6E29\\U+6CC9\\U+9547\\U+9AD8\\U+91CC\\U+638C\\U+6751\\U+4E2D   20     0.000000 0.000000 0.000000 0.000000 0.000000   20060304 20060305   20060305    0.000000 0.000000    8029001 5060000  20130104  0 1425 0 0 0    IV-4-6-35(3)           0    0        082900100506000000  0 0.000000 0 0.000000 0.000000 0.000000  0.000000 0.000000  2073.167585 516.586943 082900100506000000")

