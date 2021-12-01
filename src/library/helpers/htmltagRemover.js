export default class htmltagRemover {
  static removeHtmlTags (input) {
    const htmlRegex = /(<([^>]+)>)/ig
    var removeHtmlAfter = input.replace(htmlRegex, '')
    // const spcaceRegex = /\r?\n|\r/g
    // var removeSpaceAfter = removeHtmlAfter.replace(spcaceRegex, '')
    return removeHtmlAfter
  }
}
