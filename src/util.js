export default function formartCurrency(num) {
  return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
}
