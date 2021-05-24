const logger = (store: any) => (next: any) => (action: any) => {
  console.log("Action: ", action)
  next(action)
}


export default logger