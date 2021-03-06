import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AssignModal(props) {
  const { name, description } = props.data
  const [formText, setFormText] = useState('')
  const [plagPercent, setPlagPercent] = useState(null)
  const [uniquePercent, setUniquePercent] = useState(null)
  const [submitDisabled, setSubmitDisabled] = useState(false)

  console.log('USER AssignCard', props.user)

  const plagCheck = async (text) => {
    let formData = new FormData()
    formData.append('key', process.env.REACT_APP_PLAG_API)
    console.log('KEY', process.env.REACT_APP_PLAG_API)
    formData.append('data', text)

    try {
      // const response = { data: null }
      // response.data = {
      //   "isQueriesFinished": "false",
      //   "sources": [
      //       {
      //           "link": "https://www.slideshare.net/NakulPatel/book-summary-reverse-innovation-document",
      //           "count": 5,
      //           "percent": 71
      //       }
      //   ],
      //   "totalQueries": 8,
      //   "plagPercent": 100,
      //   "paraphrasePercent": 25,
      //   "uniquePercent": 0,
      //   "excludeURL": null,
      //   "details": [
      //       {
      //           "query": "As of 2009, there were three wireless chip technologies commonly used in mice —27 MHz, 2.",
      //           "version": 3,
      //           "unique": "false",
      //           "display": {
      //               "url": "https://iveybusinessjournal.com/publication/reverse-innovation-and-the-emerging-market-growth-imperative/",
      //               "des": "As of 2009, there were three wireless chip technologies commonly used in mice —27 MHz, 2.4 GHz, and Bluetooth. Around these technologies, Logitech had built a good, better, best product lineup. Consumers that chose the 27 MHz chip got a stripped-down mouse. But those that upgraded to 2.4..."
      //           },
      //           "paraphrase": "false"
      //       }
      //   ]
      // };
      const response = await axios.post(
        'https://www.prepostseo.com/apis/checkPlag',
        formData,
        {
          headers: { 'content-type': 'multipart/form-data' },
        }
      )
      console.log('PLAG-CHECK res', response.data)
      setSubmitDisabled(true)
      setPlagPercent(response.data.plagPercent)
      setUniquePercent(response.data.uniquePercent)

      // Badges
      if (props.progress === 0) {
        props.updateBadge('badge1')
        toast.dark('🦄 Badge Unlocked: 1st Assignment')
      }
      if (props.progress === 5) {
        props.updateBadge('badge2')
        toast.dark("🚀 Badge Unlocked: It's a 6")
      }
      if (response.data.plagPercent === 0 && props.plagBadge === false) {
        props.updateBadge('badge3')
        toast.dark('🥁 Badge Unlocked: No Plagiarism')
      }
      props.updateProgress()

      return response.data
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const submitForm = (event) => {
    event.preventDefault()
    console.log('SUBMIT')
    plagCheck(formText)
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='assign-desc'>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
        <div className='assign-submit-form'>
          {submitDisabled ? (
            ''
          ) : (
            <Form onSubmit={submitForm}>
              <Form.Group controlId='exampleForm.ControlTextarea1'>
                <Form.Label className=''>Submit Funsignment</Form.Label>
                <Form.Control
                  className='custom-input'
                  as='textarea'
                  rows={3}
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  disabled={submitDisabled}
                  required={true}
                />
                <br></br>
                <Button
                  variant='primary'
                  type='submit'
                  disabled={submitDisabled}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          )}
          {submitDisabled && plagPercent !== null ? (
            <div className='assign-complete'>Funsignment Complete!</div>
          ) : (
            ''
          )}
          {plagPercent !== null ? (
            <>
              <div className='percent-red'>
                <b>{plagPercent}%</b> plagiarized
              </div>
              <div className='percent-green'>
                <b>{uniquePercent}%</b> unique
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      <ToastContainer
        position='bottom-center'
        autoClose={15000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    courses: Object.values(state.courses),
    assignments: Object.values(state.assignments),
    auth: state.auth,
    user: state.user,
  }
}

export default connect(mapStateToProps, {})(AssignModal)
