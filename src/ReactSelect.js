import React, { Component } from 'react';
import {Line} from 'react-chartjs-2'; 

class ReactSelect extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      chartDataLight: {
        labels: ['1', '3', '5','7','9','11','13','15','17','19','21','23'],
        datasets:[{
                  label:'Interior',
                  data: [
                          0,
                          0,
                          0,
                          2000,
                          3000,
                          3000,
                          3000,
                          3000,
                          3000,
                          3000,
                          2000,
                          0          
                        ],
                        borderColor: '#6f02ab',
                        backgroundColor: 'transparent'
          
                  },
                  {
                    label: 'Exterior',
                    data: [
                          300,
                          700,
                          1100,
                          1600,
                          1900,
                          2200,
                          2200,
                          1900,
                          1500,
                          1000,
                          700,
                          200
                          ],
                          borderColor: 'blue',
                        backgroundColor: 'transparent'
                  },
                  {
                    label: 'Regulacion',
                    data: [
                          0,
                          0,
                          0,
                          500,
                          0,
                          0,
                          0,
                          3000,
                          100,
                          0,
                          1700,
                          0
                    ],
                    borderColor: '#f50010',
                    backgroundColor: '#f0414c'
                  }
                ]
      },
// aca empiezo con el grafico de temperaturas
  chartDataTemp: {
  labels: ['1', '3', '5','7','9','11','13','15','17','19','21','23'],
  datasets:[{
            label:'Interior',
            data: [
                    24,
                    24,
                    24,
                    24,
                    22,
                    22,
                    22,
                    22,
                    22,
                    22,
                    24,
                    24          
                  ],
                  borderColor: '#03b3ff',
                  backgroundColor: 'transparent'
    
            },
            {
              label: 'Exterior',
              data: [
                    19,
                    20,
                    23,
                    25,
                    26,
                    28,
                    32,
                    29,
                    26,
                    24,
                    22,
                    20
                    ],
                    borderColor: '#029952',
                  backgroundColor: 'transparent'
            },
            {
              label: 'Regulacion',
              data: [
                      5,
                4,
                0,
                -1,
                0,
                -6,
                0,
                -8,
                -4,
                0,
                2,
                4
              ],
              borderColor: '#f50010',
              backgroundColor: '#f0414c'
            }
          ]
},

chartDataPres: {
  labels: ['1', '3', '5','7','9','11','13','15','17','19','21','23'],
  datasets:[{
            label:'Presencia',
            data: [
                    100,
                    100,
                    100,
                    70,
                    0,
                    100,
                    20,
                    100,
                    100,
                    0,
                    100,
                    100          
                  ],
                  borderColor: 'green',
                  backgroundColor: 'transparent'
    
            },
            {
              label: 'Ventana',
              data: [
                    0,
                    0,
                    100,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                    ],
                    borderColor: 'blue',
                  backgroundColor: 'transparent'
            },
            {
              label: 'Persiana',
              data: [
                    0,
                    0,
                    0,
                    100,
                    0,
                    100,
                    0,
                    0,
                    100,
                    100,
                    100,
                    0
              ],
              borderColor: '#f50010',
              backgroundColor: 'transparent'
            }
          ]
},






    }
  }

  render() {
      return ( 
     
        <div className="chart">

          <Line
            data={this.state.chartDataLight}
            options={{
              
              title:{
                display:true,
                text:'Regulacion Iluminacion'
              },
              legend:{
                display: true,
                position: 'top'
              }
            }}
            />

          <Line
            data={this.state.chartDataTemp}
            options={{
              
              title:{
                display:true,
                text:'Regulacion Temperatura'
              },
              legend:{
                display: true,
                position: 'top'
              }
            }}
            />

<Line
            data={this.state.chartDataPres}
            options={{
              
              title:{
                display:true,
                text:'Otras Variables'
              },
              legend:{
                display: true,
                position: 'top'
              }
            }}
            />

        </div>
        
     
     
     )
  }

}

export default ReactSelect;