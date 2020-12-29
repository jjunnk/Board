import moment from 'moment'

export default (time)=>{
const bt = moment(time)
const ct = moment()
const r = ct.diff(bt, 'hours')
return r < 12
// moment 를 사용해서 시간차 구하기. 12시간 이하 => 새 글로 인식
// moment().diff(Moment|String|Number|Date|Array, String);
}