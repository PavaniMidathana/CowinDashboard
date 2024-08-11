// Write your code here
import './index.css'

import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {data} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="cowin-dashboard-vaccination-coverage-container">
      <h1 className="cowin-dashboard-vaccination-coverage-heading">
        Vaccination Coverage
      </h1>

      <BarChart data={data} width={1000} height={300} margin={{top: 5}}>
        <XAxis dataKey="vaccineDate" tick={{stroke: 'grey', strokeWidth: 1}} />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{stroke: 'grey', strokeWidth: 1}}
        />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" />
        <Bar dataKey="dose2" name="DOse 2" fill="#f54394" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
