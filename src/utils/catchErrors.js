import Router from 'next/router'

function catchErrors(error, displayError) {
  let errorMsg

  if (error.response) {
    // The request was made and the server responded with a status code that is not in the range of 2xx
    errorMsg = error.response.data

    console.error('Error response', errorMsg)
  } else if (error.request) {
    // The request was madem but no response was received
    errorMsg = error.response
    console.error('Error request', errorMsg)

    // For Cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message
    }
  } else {
    errorMsg = error.message
    console.error('Error message', errorMsg)
  }

  if (errorMsg === 'Please login') {
    Router.push('/login')
  }

  displayError(errorMsg)
}

export default catchErrors
