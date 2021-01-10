import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class LineBar extends Component {
    getOption = () => {
        return {
            grid: {
                zlevel: 0,
                x: 50,
                x2: 50,
                y: 30,
                y2: 30,
                borderWidth: 0,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(0,0,0,0)',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            color: ['#3c4ccf', '#02a499'],
            legend: {
                data: ['Tienda Las Condes', 'Tienda Providencia'],
                textStyle: {
                    color: ['#74788d']
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#74788d"
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Ventas',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} mil'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#74788d"
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'Tienda Las Condes',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2]
                },
                {
                    name: 'Tienda Providencia',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2]
                }
            ],
            textStyle: {
                color: ['#74788d']
            }
        };
    };
    render() {
        return (
            <React.Fragment>
                <ReactEcharts style={{ height: "350px" }} option={this.getOption()} />
            </React.Fragment>
        );
    }
}
export default LineBar;
