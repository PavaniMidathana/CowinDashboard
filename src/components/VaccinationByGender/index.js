// Write your code here
import './index.css'

import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {data} = props
  console.log(data)

  return (
    <div className="cowin-dashboard-vaccination-byGender-container">
      <h1 className="cowin-dashboard-vaccination-byGender-heading">
        Vaccination by gender
      </h1>

      <PieChart width={1000} height={400}>
        <Pie
          cx="50%"
          cy="40%"
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
