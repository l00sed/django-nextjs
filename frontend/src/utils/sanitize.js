export default function sanitize(string) {
  var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
  var tagOrComment = new RegExp(
      '<(?:'
      // Comment body.
      + '!--(?:(?:-*[^->])*--+|-?)'
      // Special "raw text" elements whose content should be elided.
      + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
      + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
      // Regular name
      + '|/?[a-z]'
      + tagBody
      + ')>',
    'gi'
  );
  var oldHtml;
  do {
    oldHtml = string;
    // Remove script and style tags, sanitize HTML
    string = string.replace(tagOrComment, '');
  } while (string !== oldHtml);
  return string.replace(/</g, '&lt;');
}
