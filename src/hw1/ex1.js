function reverseString(str) {
  return str.split('').reverse().join('');
}

process.stdin.on('data', (data) => {
  const parsedData = data.toString().trim();
  const revertedParsedData = reverseString(parsedData);
  process.stdout.write(revertedParsedData + '\n');
  process.stdout.write('----------' + '\n');
});
