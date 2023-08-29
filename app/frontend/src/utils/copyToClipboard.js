export function copyToClipboard(linkText) {
  let dummy = document.createElement('input');
  let link = linkText;
  document.body.appendChild(dummy);
  dummy.value = link;
  dummy.select();
  dummy.setSelectionRange(0,99999);
  navigator.clipboard.writeText(dummy.value);
  document.body.removeChild(dummy);
}
