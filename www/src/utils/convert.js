export default function numberToPersian(input) {

  if (input == null || input == undefined) return null

  var parts = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون', 'کوادریلیون', 'کویینتیلیون', 'سکستیلیون'];
  var numbers = {
    0: ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
    1: ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
    2: ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
    two: ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'],
    zero: 'صفر',
  };
  var delimiter = ' و ';

  return convert(String(input));

  function convert(input) {
    var string = input;

    string = string.split('')
      .reverse()
      .join('')
      .replace(/\d{3}(?=\d)/g, '$&,')
      .split('')
      .reverse()
      .join('')
      .split(',')
      .map(function(separated) {return Array(4 - separated.length).join('0') + separated});

    var result = [];
    for (var iThree = 0; iThree < string.length; iThree++) {
      var three = string[iThree];
      var resultThree = [];

      for (var index = 0; index < three.length; index++) {
        var digit = three[index];
        if (index === 1 && digit === '1') {
          resultThree.push(numbers.two[three[2]]);
        } else if ((index !== 2 || three[1] !== '1') && numbers[index][digit] !== '') {
          resultThree.push(numbers[index][digit]);
        }
      }

      resultThree = resultThree.join(delimiter);
      result.push(resultThree + ' ' + parts[string.length - iThree - 1]);
    }

    result = result.filter(function(part) { return part.trim() !== ''; }).join(delimiter).trim();

    if (result === '') {
      result = numbers.zero;
    }

    return result;
  }
}
