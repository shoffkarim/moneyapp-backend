const formateDate = require('./formateDate')
const getCard = (id, type,  cards) => {
  const itemsCardTo = type === 'accounts' ? cards.accounts : cards.expenses

  const cardTo = itemsCardTo.find((cardsItem) => cardsItem.id === id)

  return cardTo
}

const handleData = (cards, data ) => {
  if (data && cards) {

    const groupedData = {}

    for (const item of data) {
      const date = formateDate(new Date(item.date), 'MM-DD-YYYY')
      if(date in groupedData) {
        groupedData[date].push(item)
      } else {
        groupedData[date] = [item]
      }
    }
    const arrayOfGroups = Object.values(groupedData)

    const newArr = arrayOfGroups.map((array) => {
      const counted = array.reduce((acc, item) => {
        const returnObject = {
          ...acc,
          date: new Date(item.date),
          description: {
            title: 'Total',
            subTitle: Number(acc.description?.subTitle || 0) + Number(item.value),
          },
        }

        return returnObject
      },{})

      return counted
    })


    const newData = arrayOfGroups.map((array) => {
      return array.map((item) => {
        const card = getCard(item.idTo, item.typeTo, cards)
        return {
          id: item.id,
          title: card?.name,
          backgroundColor: card?.color,
          value: item.value
        }
      })
    })

    const handled = newArr.map((obj, index) => {
      return {
        ...obj,
        items: newData[index]
      }
    })

    return handled
  }
}

module.exports = handleData