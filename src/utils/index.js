
export function setPath (type, header) {
  let path
  if (type === 'personal') {
    path= '/story'
  } else {
    path= '/story'
  }

  if (!header) {
    path=type+'info'
  }

  return path
}
