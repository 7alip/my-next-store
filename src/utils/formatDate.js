export default function formatDate(date) {
  return new Date(date).toLocaleDateString('us-en')
}
