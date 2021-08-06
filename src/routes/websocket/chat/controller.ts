class ControllerMessage {
  handler(
    message: string,
    logged: any
  ) {

    let error;

    if (typeof logged === "undefined") {

      return error = {
        status: false,
        error: "Not logged"
      }
    }

    if (typeof message === "undefined" || message.length === 0) {
      return error = {
        status: false,
        error: "Invalid message"
      }
    }

    if (message.length > 200) {
      return error = {
        status: false,
        error: "Message too long"
      }
    }
    return error
  }

}

export default new ControllerMessage()
