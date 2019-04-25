import moment from 'moment'
function formateDate() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

export default {
  formateDate
}