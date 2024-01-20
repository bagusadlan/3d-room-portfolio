export function convertNodeToSpans(node) {
  let nodes = []
  
  for (let element of node) {
    // element.style.overflow = 'hidden'
    element.innerHTML = element.innerText
      .split('')
      .map((char) => {
        if (char === ' ') return `<span>&nbsp;</span>`
        return `<span class='animatedis animateall'>${char}</span>`
      })
      .join('')

      nodes.push.element
  }

  return nodes
}

export function giveClassNameToSpans(node) {
  let nodes = []
  
  for (let element of node) {
    // element.style.overflow = 'hidden'
    element.innerHTML = element.innerText
      .split('')
      .map((char) => {
        if (char === ' ') return `<span>&nbsp;</span>`
        return `<span class='animate-second animateall'>${char}</span>`
      })
      .join('')

      nodes.push.element
  }

  return nodes
}
