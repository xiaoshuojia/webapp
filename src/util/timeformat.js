
// export default function() {
// export default = () => {
export const getCurrentAchiveTime = () => {
  var t3 = new Date();
  var month  = t3.getMonth();
  var year  = t3.getFullYear();
  month += 1;
  var t4 = year + '-' + month + '-01';
  var t5 = new Date(t4);
  return  t5.getTime();   // 返回当前月份第一天的零点时间。
}

export const getNextArchiveTime = (time) => {
  var t3 = new Date(time);
  var month  = t3.getMonth();
  var year  = t3.getFullYear();
  month += 2;
  if (month > 12) {
    month -= 12;
    year += 1;
  }
  var t4 = year + '-' + month + '-01';
  var t5 = new Date(t4);
  return  t5.getTime();   
}
