const formateDate = (date, format, locale) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = date.getDate()
  return format
    .replace(/\bYYYY\b/, year.toString())
    .replace(/\bMM\b/, month.toString().padStart(2, '0'))
    .replace(/\DD\b/, day.toString().padStart(2, '0'))
}

module.exports = formateDate