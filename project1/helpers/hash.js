// Easy hashCode function for element keys
export const hashCode = (
  s = Date.now().toString().split('').reverse().join(''),
  max = 5
) =>
  Math.abs(
    s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
  )
    .toString()
    .slice(0, max);
