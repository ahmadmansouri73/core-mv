export const regex = {
  digit_or_float: /(^\d*$)|(^\d*\d[.]\d\d*$)/,
  digit: /^\d*$/,
  float: /^\d*\d[.][0-9]\d*$/,
  phone: /09(0[1-2]|1[0-9]|3[0-9]|2[0-1])-?[0-9]{3}-?[0-9]{4}/,
  call_number:/^0\d{2}\d{8}$/
}
