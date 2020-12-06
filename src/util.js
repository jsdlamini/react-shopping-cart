export default function formartCurrency(num) {
  return "$" + Number(parseFloat(num).toFixed(1)).toLocaleString() + " ";
}
