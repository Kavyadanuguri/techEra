import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const stages = {
  progress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {fetchedData: [], stageValue: stages.progress}

  componentDidMount() {
    this.getCourse()
  }

  getCourse = async () => {
    this.setState({stageValue: stages.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({fetchedData: updatedData, stageValue: stages.success})
    } else {
      this.setState({stageValue: stages.failure})
    }
  }

  renderSuccessView = () => {
    const {fetchedData} = this.state
    const {id, name, imageUrl, description} = fetchedData
    return (
      <div className="course-container">
        <div key={id} className="course-container2">
          <img className="course-img1" src={imageUrl} alt={name} />
          <div className="course-container3">
            <h1>{name}</h1>
            <p className="course-p1">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  onRetry = () => {
    this.getCourse()
  }

  renderFailureView = () => (
    <div className="course-fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="course-fail-h1">Oops! Something Went Wrong</h1>
      <p className="course-fail-p">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.onRetry} className="course-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderProgressView = () => (
    <div className="course-fail-container" data-testid="loader">
      <Loader type="ThreeDots" color=" #334155" height={50} width={50} />
    </div>
  )

  renderExactStage = () => {
    const {stageValue} = this.state
    switch (stageValue) {
      case stages.success:
        return this.renderSuccessView()
      case stages.failure:
        return this.renderFailureView()
      case stages.progress:
        return this.renderProgressView()
      default:
        return null
    }
  }

  render() {
    const {stageValue} = this.state
    console.log(stageValue)

    return this.renderExactStage()
  }
}

export default CourseItemDetails
