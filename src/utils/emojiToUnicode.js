export default function (emoji) {
  var backStr = '';
  if (emoji && emoji.length > 0) {
    for (var char of emoji) {
      var index = char.codePointAt(0);
      if (index > 65535) {
        var h = '\\u' + (Math.floor((index - 0x10000) / 0x400) + 0xD800).toString(16);
        var c = '\\u' + ((index - 0x10000) % 0x400 + 0xDC00).toString(16);
        backStr = backStr + h + c;
      } else {
        backStr = backStr + char;
      };
    };
    // console.log(backStr);
  };
  return backStr;
};
