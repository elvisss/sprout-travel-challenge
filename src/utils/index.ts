const numToTime = (num: number): string => {
  const hours = Math.floor(num / 60)
  const minutes = num % 60
  return `${hours}h${minutes > 9 ? minutes : '0' + minutes}min`
}

export {
	numToTime
}
