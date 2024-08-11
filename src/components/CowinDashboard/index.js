// Write your code here
import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    covidVaccinationData: {},
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiURL = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiURL)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      console.log(updatedData)

      this.setState({
        apiStatus: apiStatusConstants.success,
        covidVaccinationData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getLoadingView = () => (
    <div data-testid="loader" className="cowin-dashboard-loading-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  getFailureView = () => (
    <div className="cowin-dashboard-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="cowin-dashboard-failure-icon"
      />
      <h1 className="cowin-dashboard-failure-heading">Something went wrong</h1>
    </div>
  )

  getSuccessView = () => {
    const {covidVaccinationData} = this.state

    return (
      <div className="cowin-dashboard-success-container">
        <VaccinationCoverage data={covidVaccinationData.last7DaysVaccination} />
        <VaccinationByGender data={covidVaccinationData.vaccinationByGender} />
        <VaccinationByAge data={covidVaccinationData.vaccinationByAge} />
      </div>
    )
  }

  getStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.getLoadingView()
      case apiStatusConstants.success:
        return this.getSuccessView()
      case apiStatusConstants.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-bg-container">
        <div className="cowin-dashboard-icon-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="cowin-dashboard-icon"
          />
          <h1 className="cowin-dashboard-icon-text">Co-WIN</h1>
        </div>
        <h1 className="cowin-dashboard-heading">CoWIN Vaccination in India</h1>
        {this.getStatusView()}
      </div>
    )
  }
}

export default CowinDashboard
