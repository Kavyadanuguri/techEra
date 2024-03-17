import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import './index.css'

const stages = {
  progress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {fetchedData: [], stageValue: stages.progress}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({stageValue: stages.progress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({fetchedData: updatedData, stageValue: stages.success})
    } else {
      this.setState({stageValue: stages.failure})
    }
  }

  onRetry = () => {
    this.getData()
  }

  renderSuccessView = () => {
    const {fetchedData} = this.state
    return (
      <div className="home-bg-container">
        <h1 className="home-heading1">Courses</h1>
        <ul className="home-ul-container">
          {fetchedData.map(each => (
            <li key={each.id} className="home-list-container">
              <Link className="home-link" to={`/courses/${each.id}`}>
                <img src={each.logoUrl} alt={each.name} />
                <p className="home-p">{each.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="home-fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="home-fail-h1">Oops! Something Went Wrong</h1>
      <p className="home-fail-p">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.onRetry} className="home-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderProgressView = () => (
    <div className="home-fail-container" data-testid="loader">
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

export default Home
