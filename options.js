const fullOptions = {
  type: 'line',
  // animation: {
  //   duration: 1000,
  //   easing: 'easeOutQueart',
  // },
  labels: ['2014', '2015', '2016', '2017', '2018', '2019'],
  layout: {
    padding: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5,
    }
  },
  legend: {
    display: true,
    position: 'top',
    fullWidth: true,
    reverse: true,
  },
  title: {
    display: true,
    position: 'top',
    fontSize: 12,
    fontFamily: 'Arial',
    fontColor: '#666',
    fontStyle: 'bold',
    paddinng: 10,
    lineHeight: 1.2,
    text: 'Patkers Annualy'
  },
  tooltips: {
    enabled: true,
    mode: 'nearest',
    intersect: true,
    position: 'average',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    titleFontFamily: 'Arial',
    titleFontSize: 12,
    titleFontStyle: 'bold',
    titleFontColor: '#fff',
    titleSpacing: 2,
    titleMarginBottom: 6,
    bodyFontFamily: 'Arial',
    bodyFontSize: 12,
    bodyFontStyle: 'normal',
    bodyFontColor: '#fff',
    bodySpacing: 2,
    footerFontFamily: 'Arial',
    footerFontSize: 12,
    footerFontStyle: 'bold',
    footerFontColor: '#fff',
    footerSpacing: 2,
    footerMarginTop: 6,
    xPadding: 6,
    yPadding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    multiKeyBackground: '#fff',
    displayColors: true,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0,
  },
  elements: {
    radius: 3,
    pointStyle: 'circle',
    rotation: 0,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .1)',
    hitRadius: 1,
    hoverRadius: 4,
    hoverBorderWidth: 1,
  },
  scales: {
    yAxes: [{
      // type: 'linear',
      display: true,
      // position: 'left'
    }],
    xAxes: [{
      // type: 'linear',
      display: true,
      // position: 'left'
    }]
  }
}

const fullDatasetOptions = {
  line: {
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderCapStyle: 'butt',
    borderColor: 'rgba(0, 0, 0, .1)',
    borderJoinStyle: 'miter',
    borderWidth: 3,
    cubicInterpolationMode: '',
    fill: true,
    label: '',
    lineTension: .4,
    pointBackgroundColor: 'rgba(0, 0, 0, .1)',
    pointBorderColor: 'rgba(0, 0, 0, .1)',
    pointBorderWidth: 1,
    pointBorderRadius: 1,
    pointHoverBackgroundColor: undefined,
    pointHoverBorderColor: undefined,
    pointHoverBorderWidth: 1,
    pointHoverRadius: 4,
    pointRadius: 3,
    pointRotation: 0,
    pointStyle: 'circle',
    showLine: true,
    spanGaps: true,
    steppedLine: false,
  }
}
